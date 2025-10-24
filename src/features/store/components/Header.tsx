import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-bg border-b border-dark-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-accent-blue">CONNECT</h1>
        </div>
        
        {/* Required Feature Button */}
        <div className="flex items-center">
          <button className="bg-accent-green text-dark-bg px-4 py-2 rounded font-medium hover:bg-green-400 transition-colors">
            REQUIRED FEATURE
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
