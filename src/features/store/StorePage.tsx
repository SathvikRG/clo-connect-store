import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../store';
import { fetchStoreItems } from '../../store/slices/storeSlice';
import Header from './components/Header';
import SearchAndFilters from './components/SearchAndFilters';
import ContentGrid from './components/ContentGrid';

const StorePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, ui } = useSelector((state: RootState) => state.store);

  // Fetch initial data on component mount
  useEffect(() => {
    dispatch(fetchStoreItems({ page: 1, limit: 20 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Search and Filters Section */}
        <SearchAndFilters />
        
        {/* Content Grid */}
        <ContentGrid items={items} isLoading={ui.isLoading} />
      </div>
    </div>
  );
};

export default StorePage;
