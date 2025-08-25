
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-lg font-bold text-white">
            📄 Resume Maker
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Sign In</button>
            <button className="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">Sign Up</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
