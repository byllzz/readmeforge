import { LogOut } from 'lucide-react';

export default function UserAccountPreview({ email, onLogout }) {
  const displayName = email ? email.split('@')[0] : 'User';
  return (
    <div className="px-4 py-3 border-t border-gray-200 hover:bg-gray-50 flex items-center gap-3 flex-shrink-0 transition-colors">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg select-none">
        {displayName.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0 leading-tight">
        <p className="text-[14px] font-medium text-gray-800 truncate">{displayName}</p>
        <p className="text-[12px] text-gray-500">Free plan</p>
      </div>
      <button
        onClick={() => {
          onLogout();
          // confirm popup need to be added...
        }}
        className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        title="Sign out"
      >
        <LogOut size={18} />
      </button>
    </div>
  );
}
