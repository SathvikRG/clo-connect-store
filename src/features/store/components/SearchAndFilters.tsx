import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../../store';
import { togglePricingOption, resetFilters, setKeyword, setSortBy, setPriceRange } from '../../../store/slices/filterSlice';
import { PricingOption, SortOption } from '../../../types/index';

const SearchAndFilters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pricingOptions, keyword, sortBy, priceRange } = useSelector((state: RootState) => state.filters);

  const handlePricingToggle = (option: PricingOption) => {
    dispatch(togglePricingOption(option));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as SortOption));
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newRange: [number, number] = [Math.min(priceRange[0], value), Math.max(priceRange[1], value)];
    dispatch(setPriceRange(newRange));
  };

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
            value={keyword}
            onChange={handleKeywordChange}
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
              <input 
                type="checkbox" 
                className="mr-2 accent-accent-green"
                checked={pricingOptions.includes(PricingOption.PAID)}
                onChange={() => handlePricingToggle(PricingOption.PAID)}
              />
              <span className="text-gray-300">Paid</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2 accent-accent-green"
                checked={pricingOptions.includes(PricingOption.FREE)}
                onChange={() => handlePricingToggle(PricingOption.FREE)}
              />
              <span className="text-gray-300">Free</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2 accent-accent-green"
                checked={pricingOptions.includes(PricingOption.VIEW_ONLY)}
                onChange={() => handlePricingToggle(PricingOption.VIEW_ONLY)}
              />
              <span className="text-gray-300">View Only</span>
            </label>
          </div>
        </div>
        
        {/* Pricing Slider - Only show when Paid option is selected */}
        {pricingOptions.includes(PricingOption.PAID) && (
          <div className="mb-4">
            <label className="text-sm text-white mb-2 block">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">$0</span>
              <input
                type="range"
                min="0"
                max="999"
                value={priceRange[1]}
                onChange={handlePriceRangeChange}
                className="flex-1 accent-accent-green"
              />
              <span className="text-gray-300 text-sm">$999+</span>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <label className="text-accent-green text-sm">Sort by:</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-dark-bg border border-gray-600 rounded px-3 py-1 text-white text-sm focus:outline-none focus:border-accent-green"
            >
              <option value={SortOption.ITEM_NAME}>Item Name</option>
              <option value={SortOption.HIGHER_PRICE}>Higher Price</option>
              <option value={SortOption.LOWER_PRICE}>Lower Price</option>
            </select>
          </div>
          <button 
            onClick={handleReset}
            className="text-gray-400 hover:text-white transition-colors"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
