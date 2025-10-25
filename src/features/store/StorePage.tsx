import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../store';
import { fetchStoreItems, filterItems } from '../../store/slices/storeSlice';
import { usePersistence } from '../../hooks/usePersistence';
import Header from './components/Header';
import SearchAndFilters from './components/SearchAndFilters';
import ContentGrid from './components/ContentGrid';

const StorePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredItems, ui } = useSelector((state: RootState) => state.store);
  const { pricingOptions, keyword, sortBy, priceRange } = useSelector((state: RootState) => state.filters);
  const { saveToURL } = usePersistence();

  // Debug: Log the filtered items
  console.log('StorePage: filteredItems length:', filteredItems.length);
  console.log('StorePage: filteredItems:', filteredItems);

  // Fetch initial data on component mount
  useEffect(() => {
    dispatch(fetchStoreItems({ page: 1, limit: 20 }));
  }, [dispatch]);

  // Filter items when filters change
  useEffect(() => {
    dispatch(filterItems({ pricingOptions, keyword, sortBy, priceRange }));
  }, [dispatch, pricingOptions, keyword, sortBy, priceRange]);

  // Save filters to URL when they change
  useEffect(() => {
    saveToURL(pricingOptions, keyword, sortBy, priceRange);
  }, [pricingOptions, keyword, sortBy, priceRange, saveToURL]);

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
        {/* Search and Filters Section */}
        <SearchAndFilters />
        
        {/* Content Grid */}
        <ContentGrid items={filteredItems} isLoading={ui.isLoading} />
      </div>
    </div>
  );
};

export default StorePage;
