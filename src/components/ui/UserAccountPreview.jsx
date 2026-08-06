import { LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { FaGithub } from "react-icons/fa";

function getAvatarUrl(seed) {
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
    seed || "readmeforge",
  )}&backgroundColor=f5f4ef`;
}

function Avatar({ seed, fallbackInitial, fallbackColor, size }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="rounded-full flex items-center justify-center text-white font-bold select-none shrink-0"
        style={{
          width: size,
          height: size,
          background: fallbackColor,
          fontSize: size * 0.45,
        }}
      >
        {fallbackInitial}
      </div>
    );
  }

  return (
    <img
      src={getAvatarUrl(seed)}
      alt="Account avatar"
      onError={() => setErrored(true)}
      className="rounded-full shrink-0 object-cover bg-gray-100"
      style={{ width: size, height: size }}
    />
  );
}

/**
 * Account preview + identity switcher. The "restart tour" button used to
 * live here — it's been moved to the center panel's top bar (next to
 * Reset) so both workspace-level actions sit together in one place.
 */
export default function UserAccountPreview({
  userName,
  userEmail,
  onLogout,
  minimized = false,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const displayName = userName || "Guest";
  const displayEmail = userEmail || "";

  const getAvatarColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 50%)`;
  };

  const avatarColor = getAvatarColor(displayName);
  const initial = displayName.charAt(0).toUpperCase();
  const avatarSeed = displayEmail || displayName;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (minimized) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-9 h-9 relative left-3 bottom-1 rounded-full flex items-center justify-center select-none hover:ring-2 hover:ring-gray-300 transition-all"
          title="Account options"
        >
          <Avatar
            seed={avatarSeed}
            fallbackInitial={initial}
            fallbackColor={avatarColor}
            size={36}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute left-8 bottom-full mb-2 mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[220px] animate-in fade-in slide-in-from-left-2 duration-200">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Avatar
                  seed={avatarSeed}
                  fallbackInitial={initial}
                  fallbackColor={avatarColor}
                  size={40}
                />
                <div className="flex-1 min-w-0 leading-tight">
                  <p className="text-[14px] font-medium text-gray-800 truncate">
                    {displayName}
                  </p>
                  <p className="text-[11.5px] text-gray-500 truncate">
                    {displayEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <a
                  href="https://github.com/byllzz/readmeforge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  title="View on GitHub"
                >
                  <FaGithub size={18} />
                </a>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Log out"
                  >
                    <LogOut size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 py-3 border-t border-gray-200 hover:bg-gray-50 flex items-center gap-3 flex-shrink-0 transition-colors">
      <Avatar
        seed={avatarSeed}
        fallbackInitial={initial}
        fallbackColor={avatarColor}
        size={40}
      />
      <div className="flex-1 min-w-0 leading-tight">
        <p className="text-[14px] font-medium text-gray-800 truncate">
          {displayName}
        </p>
        <p className="text-[12px] text-gray-500 truncate">{displayEmail}</p>
      </div>
      <div className="flex items-center gap-1">
        <a
          href="https://github.com/byllzz/readmeforge"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          title="View on GitHub"
        >
          <FaGithub size={18} />
        </a>
        {onLogout && (
          <button
            onClick={onLogout}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Log out"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
