import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box } from '@mui/material';
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Search and Filters Section */}
          <SearchAndFilters />
          
          {/* Content Grid */}
          <ContentGrid items={filteredItems} isLoading={ui.isLoading} />
        </Box>
      </Container>
    </Box>
  );
};

export default StorePage;
