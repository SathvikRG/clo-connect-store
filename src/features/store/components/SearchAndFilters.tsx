import React from 'react';

const SearchAndFilters: React.FC = () => {
  return (
    <div className="bg-dark-panel border border-accent-green rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-300 mb-4">
        Find the Items you're looking for
      </h2>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Find the Items you're lookng for"
            className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-accent-green"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Contents Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <div className="w-3 h-3 bg-accent-green rounded-full mr-2"></div>
          <h3 className="text-md font-medium text-white">Contents Filter</h3>
        </div>
        
        <div className="mb-4">
          <label className="text-sm text-gray-300 mb-2 block">Pricing Option</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-accent-green" />
              <span className="text-gray-300">Paid</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-accent-green" />
              <span className="text-gray-300">Free</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-accent-green" />
              <span className="text-gray-300">View Only</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="text-gray-400 hover:text-white transition-colors">
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
