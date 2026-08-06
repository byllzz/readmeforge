import { useState, useEffect, useRef } from 'react';

// Client-side compression
const compressImage = (file, maxWidth = 800, quality = 0.6) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('Compression failed'));
          const reader2 = new FileReader();
          reader2.onload = (ev) => resolve(ev.target.result);
          reader2.onerror = () => reject(new Error('Read failed'));
          reader2.readAsDataURL(blob);
        }, 'image/jpeg', quality);
      };
      img.onerror = () => reject(new Error('Invalid image'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Read failed'));
    reader.readAsDataURL(file);
  });
};

async function uploadImage(dataUrl) {
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: dataUrl }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) {
    throw new Error(data.error || 'Upload failed');
  }
  return data.url;
}

export default function ScreenshotsBlock({ content, onChange }) {
  const items = content.items || [];
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  // <-- Use a Map to avoid stale index leaks
  const [localPreviews, setLocalPreviews] = useState(new Map());

  // Cleanup on unmount / items change
  useEffect(() => {
    const currentPreviews = localPreviews;
    return () => {
      for (const [key, url] of currentPreviews.entries()) {
        if (url && url.startsWith('blob:')) URL.revokeObjectURL(url);
      }
    };
  }, []);

  // Auto-prune stale index entries after reorder/delete
  useEffect(() => {
    setLocalPreviews(prev => {
      const next = new Map();
      const maxIndex = items.length - 1;
      for (const [key, value] of prev.entries()) {
        if (Number(key) <= maxIndex && items[Number(key)]?.url === '') {
          next.set(key, value);
        }
      }
      return next;
    });
  }, [items]);

  const update = (i, field, val) => {
    const newItems = items.map((x, idx) => (idx === i ? { ...x, [field]: val } : x));
    onChange({ items: newItems });
  };

  const add = () => {
    onChange({ items: [...items, { alt: '', url: '', caption: '' }] });
  };

  const remove = (i) => {
    if (window.confirm('Remove this screenshot?')) {
      onChange({ items: items.filter((_, idx) => idx !== i) });
      setLocalPreviews(prev => {
        const next = new Map(prev);
        next.delete(String(i));
        return next;
      });
    }
  };

  const moveUp = (i) => {
    if (i > 0) {
      const newItems = [...items];
      [newItems[i - 1], newItems[i]] = [newItems[i], newItems[i - 1]];
      onChange({ items: newItems });
    }
  };

  const moveDown = (i) => {
    if (i < items.length - 1) {
      const newItems = [...items];
      [newItems[i], newItems[i + 1]] = [newItems[i + 1], newItems[i]];
      onChange({ items: newItems });
    }
  };

  const handleDragStart = (e, i) => {
    setDraggedIndex(i);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    onChange({ items: newItems });
    setDraggedIndex(null);
  };

  const handleFileUpload = async (i, file) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a valid image file (JPEG, PNG, GIF, WEBP, SVG)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    setUploadingIndex(i);
    setUploadError(null);

    try {
      const compressedDataUrl = await compressImage(file, 800, 0.6);

      // Store in Map using index as key (auto-pruned on reorder/delete)
      setLocalPreviews(prev => new Map(prev).set(String(i), compressedDataUrl));

      const hostedUrl = await uploadImage(compressedDataUrl);

      const newItems = items.map((item, idx) =>
        idx === i
          ? {
              ...item,
              url: hostedUrl,
              alt: item.alt || file.name.replace(/\.[^/.]+$/, '') || 'Uploaded screenshot',
              fileSize: file.size,
            }
          : item,
      );
      onChange({ items: newItems });
      setLocalPreviews(prev => {
        const next = new Map(prev);
        next.delete(String(i));
        return next;
      });
    } catch (err) {
      setUploadError(
        err?.message?.includes('configured')
          ? 'Image hosting isn\u2019t set up for this deployment yet — ask the site owner to add an IMGBB_API_KEY.'
          : 'Upload failed. Your image was not saved — try again or paste a URL instead.',
      );
      setLocalPreviews(prev => {
        const next = new Map(prev);
        next.delete(String(i));
        return next;
      });
    } finally {
      setUploadingIndex(null);
    }
  };

  const triggerFileInput = (i) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/gif,image/webp,image/svg+xml';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) handleFileUpload(i, file);
    };
    input.click();
  };

  const handlePaste = async (i, e) => {
    const clipboardItems = e.clipboardData?.items;
    if (clipboardItems) {
      for (const item of clipboardItems) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) handleFileUpload(i, file);
          break;
        }
      }
    }
  };

  const validateUrl = (url) =>
    !!url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/'));

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const getImageSrc = (i, item) => {
    if (localPreviews.has(String(i))) return localPreviews.get(String(i));
    if (item.url && validateUrl(item.url)) return item.url;
    return null;
  };

  return (
    <div className="space-y-4">
      {uploadError && (
        <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-[11px] text-red-700 flex items-start gap-2">
          <span className="text-red-500 text-sm">⚠️</span>
          <p>{uploadError}</p>
        </div>
      )}

      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-amber-400 rounded-full" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Screenshots Gallery
          </span>
        </div>
        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {items.length === 0 && (
        <div
          className="bg-gray-50 border-2 border-dashed border-gray-200 hover:border-amber-400 rounded-lg p-8 text-center transition-all duration-200 cursor-pointer group"
          onClick={() => {
            add();
            setTimeout(() => triggerFileInput(items.length), 0);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
              add();
              setTimeout(() => handleFileUpload(items.length, file), 100);
            }
          }}
        >
          <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-200">📸</div>
          <div className="text-sm text-gray-500 mb-2">No screenshots yet</div>
          <div className="text-[11px] text-gray-400 mb-3">Click to upload or drag & drop images</div>
          <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
            <span>JPEG, PNG, GIF, WEBP</span>
            <span>•</span>
            <span>Max 5MB</span>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((item, i) => {
            const imageSrc = getImageSrc(i, item);
            const isUploading = uploadingIndex === i;
            return (
              <div
                key={i}
                draggable
                onDragStart={(e) => handleDragStart(e, i)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, i)}
                className="group bg-white border border-gray-200 hover:border-gray-300 rounded-lg transition-all duration-200"
              >
                <div className="relative">
                  {isUploading ? (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-t-lg">
                      <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mb-2" />
                        <div className="text-xs text-gray-500">Uploading...</div>
                      </div>
                    </div>
                  ) : imageSrc ? (
                    <>
                      <img
                        src={imageSrc}
                        alt={item.alt || 'Screenshot preview'}
                        className="w-full h-48 object-cover rounded-t-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const errorDiv = e.target.parentElement?.querySelector('.preview-error');
                          if (errorDiv) errorDiv.style.display = 'flex';
                        }}
                      />
                      <div className="preview-error hidden w-full h-48 flex-col items-center justify-center bg-gray-100 rounded-t-lg">
                        <span className="text-3xl mb-2">🖼️</span>
                        <span className="text-xs text-gray-500">Failed to load image</span>
                        <button
                          onClick={() => triggerFileInput(i)}
                          className="mt-2 text-[10px] text-amber-500! hover:underline!"
                        >
                          Upload again
                        </button>
                      </div>
                    </>
                  ) : (
                    <div
                      className="w-full h-48 flex flex-col items-center justify-center bg-gray-100 rounded-t-lg cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => triggerFileInput(i)}
                    >
                      <span className="text-3xl mb-2">📤</span>
                      <span className="text-xs text-gray-500">Click to upload image</span>
                      <span className="text-[10px] text-gray-400 mt-1">or drag & drop</span>
                    </div>
                  )}

                  {imageSrc && !isUploading && (
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => window.open(imageSrc, '_blank')}
                        className="p-1.5 bg-white/80! hover:bg-white! rounded shadow-sm transition-colors"
                        title="Open in new tab"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => triggerFileInput(i)}
                        className="p-1.5 bg-white/80! hover:bg-white! rounded shadow-sm transition-colors"
                        title="Replace image"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                          <path d="M23 4v6h-6" />
                          <path d="M1 20v-6h6" />
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
                          <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {item.fileSize && (
                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-0.5 shadow-sm">
                      <span className="text-[9px] text-gray-500">{formatFileSize(item.fileSize)}</span>
                    </div>
                  )}
                </div>

                <div className="p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="cursor-move text-gray-400 group-hover:text-gray-600 transition-colors" title="Drag to reorder">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="12" r="1" />
                          <circle cx="9" cy="8" r="1" />
                          <circle cx="9" cy="16" r="1" />
                          <circle cx="15" cy="12" r="1" />
                          <circle cx="15" cy="8" r="1" />
                          <circle cx="15" cy="16" r="1" />
                        </svg>
                      </div>
                      <span className="text-[11px] font-semibold text-amber-500 bg-amber-50 px-2 py-0.5 rounded">
                        #{i + 1}
                      </span>
                      {imageSrc && !isUploading && (
                        <span className="text-[10px] text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">
                          ✓ hosted
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => moveUp(i)}
                        disabled={i === 0}
                        className={`p-1 rounded transition-colors ${
                          i === 0 ? 'text-gray-300! cursor-not-allowed' : 'text-gray-500! hover:text-amber-500! hover:bg-gray-100!'
                        }`}
                        title="Move up"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="18 15 12 9 6 15" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveDown(i)}
                        disabled={i === items.length - 1}
                        className={`p-1 rounded transition-colors ${
                          i === items.length - 1 ? 'text-gray-300! cursor-not-allowed' : 'text-gray-500 hover:text-amber-500! hover:bg-gray-100!'
                        }`}
                        title="Move down"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      <button
                        onClick={() => remove(i)}
                        className="p-1 rounded text-gray-500! hover:text-red-500! hover:bg-red-50! transition-colors"
                        title="Remove"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => triggerFileInput(i)}
                      disabled={isUploading}
                      className="flex-1 bg-gray-100! hover:bg-gray-200! border! border-gray-200! hover:border-amber-400! rounded px-3 py-1.5 text-[11px] text-gray-600! hover:text-amber-600! transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      Upload from device
                    </button>
                    <div className="relative flex-1">
                      <input
                        className="w-full bg-white! border! border-gray-200! rounded px-3 py-1.5 text-gray-800! text-xs focus:outline-none focus:border-amber-400! transition-colors placeholder:text-gray-300"
                        value={item.url || ''}
                        onChange={(e) => update(i, 'url', e.target.value)}
                        placeholder="Or paste image URL"
                        onPaste={(e) => handlePaste(i, e)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wider">Alt Text</label>
                    <input
                      className="w-full bg-white! border! border-gray-200! rounded px-3 py-2 text-gray-800! text-sm focus:outline-none focus:border-amber-400! transition-colors placeholder:text-gray-300"
                      value={item.alt || ''}
                      onChange={(e) => update(i, 'alt', e.target.value)}
                      placeholder="Describe the screenshot for accessibility"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-wider">Caption (Optional)</label>
                    <textarea
                      className="w-full bg-white! border! border-gray-200! rounded px-3 py-2 text-gray-800! text-sm focus:outline-none focus:border-amber-400! transition-colors placeholder:text-gray-300 resize-none"
                      value={item.caption || ''}
                      onChange={(e) => update(i, 'caption', e.target.value)}
                      placeholder="Add a descriptive caption..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={add}
        className="w-full border-2! border-dashed border-gray-200! hover:border-amber-400! bg-gray-50! hover:bg-gray-100! text-gray-500! hover:text-amber-600! text-sm py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:rotate-90 transition-transform duration-200">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Screenshot
      </button>

      <div className="text-[10px] text-gray-400 text-center px-2 py-1 bg-gray-50 rounded border border-gray-100 space-y-1">
        <div>💡 Uploaded images are hosted automatically — no base64 ever lands in your README</div>
        <div className="text-[9px] text-gray-400">📋 You can also paste images (Ctrl+V) or drag & drop files</div>
      </div>
    </div>
  );
}
