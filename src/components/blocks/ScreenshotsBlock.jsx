import { useState, useRef, useEffect } from 'react';

export default function ScreenshotsBlock({ content, onChange }) {
  const items = content.items || [];
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [imagePreviews, setImagePreviews] = useState({});

  // Create preview URLs for existing items (restore from stored blob URLs)
  useEffect(() => {
    items.forEach((item, idx) => {
      if (item.url && item.url.startsWith('blob:') && !imagePreviews[idx]) {
        setImagePreviews(prev => ({ ...prev, [idx]: item.url }));
      }
    });
  }, [items]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(imagePreviews).forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  const update = (i, field, val) => {
    console.log(`[ScreenshotsBlock] update: index=${i}, field=${field}, value=`, val);
    const newItems = items.map((x, idx) => idx === i ? { ...x, [field]: val } : x);
    onChange({ items: newItems });
  };

  const add = () => {
    onChange({ items: [...items, { alt: '', url: '', caption: '', file: null }] });
  };

  const remove = (i) => {
    if (items[i].url && items[i].url.startsWith('blob:')) {
      URL.revokeObjectURL(items[i].url);
    }
    if (window.confirm('Remove this screenshot?')) {
      onChange({ items: items.filter((_, idx) => idx !== i) });
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

  const handleFileUpload = (i, file) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, WEBP, SVG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploadingIndex(i);

    // Create blob URL
    const blobUrl = URL.createObjectURL(file);
    console.log('[ScreenshotsBlock] Created blob URL:', blobUrl);

    // Store preview for immediate display
    setImagePreviews(prev => ({ ...prev, [i]: blobUrl }));

    // Update the item with the blob URL
    update(i, 'url', blobUrl);
    update(i, 'file', file);
    update(i, 'alt', file.name.replace(/\.[^/.]+$/, '') || 'Uploaded screenshot');

    setUploadingIndex(null);

    // Force a small delay to ensure state is updated
    setTimeout(() => {
      console.log('[ScreenshotsBlock] Upload complete, current items:', items);
    }, 100);
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

  const validateUrl = (url) => {
    return url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/') || url.startsWith('blob:'));
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const getImageSrc = (i, item) => {
    if (imagePreviews[i]) return imagePreviews[i];
    if (item.url && validateUrl(item.url)) return item.url;
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-[#ffd557] rounded-full"></div>
          <span className="text-xs font-mono font-semibold text-[#888] uppercase tracking-wider">
            Screenshots Gallery
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#555] bg-[#161616] px-2 py-0.5 rounded">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {items.length === 0 && (
        <div
          className="bg-[#0d0d0d] border-2 border-dashed border-[#2a2a2a] hover:border-[#ffd557] rounded-lg p-8 text-center transition-all duration-200 cursor-pointer group"
          onClick={() => triggerFileInput(-1)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) {
              add();
              setTimeout(() => handleFileUpload(0, file), 100);
            }
          }}
        >
          <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-200">📸</div>
          <div className="text-sm text-[#666] font-mono mb-2">No screenshots yet</div>
          <div className="text-[11px] text-[#444] mb-3">Click to upload or drag & drop images</div>
          <div className="flex items-center justify-center gap-2 text-[10px] text-[#555] font-mono">
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
            return (
              <div
                key={i}
                draggable
                onDragStart={(e) => handleDragStart(e, i)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, i)}
                className="group bg-[#0d0d0d] border border-[#2a2a2a] hover:border-[#3a3a3a] rounded-lg transition-all duration-200"
              >
                <div className="relative">
                  {uploadingIndex === i ? (
                    <div className="w-full h-48 flex items-center justify-center bg-[#161616] rounded-t-lg">
                      <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#ffd557] mb-2"></div>
                        <div className="text-xs text-[#666] font-mono">Uploading...</div>
                      </div>
                    </div>
                  ) : imageSrc ? (
                    <>
                      <img
                        src={imageSrc}
                        alt={item.alt || 'Screenshot preview'}
                        className="w-full h-48 object-cover rounded-t-lg"
                        onError={(e) => {
                          console.error('[ScreenshotsBlock] Image failed to load:', imageSrc);
                          e.target.style.display = 'none';
                          const errorDiv = e.target.parentElement?.querySelector('.preview-error');
                          if (errorDiv) errorDiv.style.display = 'flex';
                        }}
                      />
                      <div className="preview-error hidden w-full h-48 flex-col items-center justify-center bg-[#161616] rounded-t-lg">
                        <span className="text-3xl mb-2">🖼️</span>
                        <span className="text-xs text-[#666]">Failed to load image</span>
                        <button
                          onClick={() => triggerFileInput(i)}
                          className="mt-2 text-[10px] text-[#ffd557] hover:underline"
                        >
                          Upload again
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-48 flex flex-col items-center justify-center bg-[#161616] rounded-t-lg cursor-pointer hover:bg-[#1a1a1a] transition-colors"
                         onClick={() => triggerFileInput(i)}>
                      <span className="text-3xl mb-2">📤</span>
                      <span className="text-xs text-[#666] font-mono">Click to upload image</span>
                      <span className="text-[10px] text-[#444] mt-1">or drag & drop</span>
                    </div>
                  )}

                  {imageSrc && (
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => window.open(imageSrc, '_blank')}
                        className="p-1.5 bg-black/50 hover:bg-black/70 rounded backdrop-blur-sm transition-colors"
                        title="Open in new tab"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => triggerFileInput(i)}
                        className="p-1.5 bg-black/50 hover:bg-black/70 rounded backdrop-blur-sm transition-colors"
                        title="Replace image"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M23 4v6h-6" />
                          <path d="M1 20v-6h6" />
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
                          <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {item.file && (
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded px-2 py-0.5">
                      <span className="text-[9px] font-mono text-[#888]">
                        {formatFileSize(item.file.size)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="cursor-move opacity-50 group-hover:opacity-100 transition-opacity" title="Drag to reorder">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="12" r="1" />
                          <circle cx="9" cy="8" r="1" />
                          <circle cx="9" cy="16" r="1" />
                          <circle cx="15" cy="12" r="1" />
                          <circle cx="15" cy="8" r="1" />
                          <circle cx="15" cy="16" r="1" />
                        </svg>
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-[#ffd557] bg-[#ffd557]/10 px-2 py-0.5 rounded">
                        #{i + 1}
                      </span>
                      {imageSrc && (
                        <span className="text-[10px] font-mono text-green-500/70 bg-green-500/10 px-1.5 py-0.5 rounded">
                          ✓ image loaded
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => moveUp(i)}
                        disabled={i === 0}
                        className={`p-1 rounded transition-colors ${
                          i === 0 ? 'text-[#333] cursor-not-allowed' : 'text-[#666] hover:text-[#ffd557] hover:bg-[#1a1a1a]'
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
                          i === items.length - 1 ? 'text-[#333] cursor-not-allowed' : 'text-[#666] hover:text-[#ffd557] hover:bg-[#1a1a1a]'
                        }`}
                        title="Move down"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      <button
                        onClick={() => remove(i)}
                        className="p-1 rounded text-[#666] hover:text-[#ff5757] hover:bg-[#ff5757]/10 transition-colors"
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
                      className="flex-1 bg-[#161616] hover:bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#ffd557] rounded px-3 py-1.5 text-[11px] font-mono text-[#888] hover:text-[#ffd557] transition-all duration-200 flex items-center justify-center gap-2"
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
                        className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-3 py-1.5 text-[#e8e8e0] text-xs focus:outline-none focus:border-[#ffd557] transition-colors placeholder:text-[#444]"
                        value={item.url || ''}
                        onChange={e => update(i, 'url', e.target.value)}
                        placeholder="Or paste image URL"
                        onPaste={(e) => handlePaste(i, e)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#666] uppercase tracking-wider">Alt Text</label>
                    <input
                      className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-3 py-2 text-[#e8e8e0] text-sm focus:outline-none focus:border-[#ffd557] transition-colors placeholder:text-[#444]"
                      value={item.alt || ''}
                      onChange={e => update(i, 'alt', e.target.value)}
                      placeholder="Describe the screenshot for accessibility"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#666] uppercase tracking-wider">Caption (Optional)</label>
                    <textarea
                      className="w-full bg-[#161616] border border-[#2a2a2a] rounded px-3 py-2 text-[#e8e8e0] text-sm focus:outline-none focus:border-[#ffd557] transition-colors placeholder:text-[#444] resize-none"
                      value={item.caption || ''}
                      onChange={e => update(i, 'caption', e.target.value)}
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
        className="w-full border-2 border-dashed border-[#2a2a2a] hover:border-[#ffd557] bg-[#0d0d0d] hover:bg-[#161616] text-[#666] hover:text-[#ffd557] text-sm font-mono py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:rotate-90 transition-transform duration-200">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Screenshot
      </button>

      <div className="text-[10px] font-mono text-[#444] text-center px-2 py-1 bg-[#0d0d0d] rounded border border-[#1a1a1a] space-y-1">
        <div>💡 Tip: Drag screenshots to reorder • Click to upload images from device</div>
        <div className="text-[9px] text-[#3a3a3a]">📋 You can also paste images (Ctrl+V) or drag & drop files</div>
        <div className="text-[9px] text-[#ffd557]/70">🔗 Remote URLs work best for persistent previews</div>
      </div>
    </div>
  );
}
