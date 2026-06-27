import { LogOut } from 'lucide-react';
import { useState } from 'react';

export default function UserAccountPreview({ email, onLogout }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const displayName = email ? email.split('@')[0] : 'User';

  const handleLogout = () => {
    onLogout();
    setShowConfirm(false);
  };

  return (
    <>
      <div className="px-4 py-3 border-t border-gray-200 hover:bg-gray-50 flex items-center gap-3 flex-shrink-0 transition-colors">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg select-none">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0 leading-tight">
          <p className="text-[14px] font-medium text-gray-800 truncate">{displayName}</p>
          <p className="text-[12px] text-gray-500">ReadmeForge User</p>
        </div>
        <button
          onClick={() => setShowConfirm(true)}
          className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          title="Sign out"
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-4">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign out?</h3>
              <p className="text-gray-600 text-sm mb-6">
                If you log out, your saved work for{' '}
                <span className="font-medium text-gray-800">{email}</span> will be erased. When you
                sign in again with this email, you'll start fresh.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-6 py-2.5 text-sm! font-medium text-gray-700! bg-gray-100! rounded-xl hover:bg-gray-200! transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 text-sm! font-medium text-white! bg-red-600! rounded-xl hover:bg-red-700! transition-colors"
                >
                  Yes, sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
