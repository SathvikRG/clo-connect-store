import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../store';
import { setPricingOptions, setKeyword } from '../store/slices/filterSlice';
import { PricingOption } from '../types/index';

export const usePersistence = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Load state from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Load pricing options from URL
    const pricingParam = urlParams.get('pricing');
    if (pricingParam) {
      try {
        const pricingOptions = JSON.parse(pricingParam) as PricingOption[];
        dispatch(setPricingOptions(pricingOptions));
      } catch (error) {
        console.error('Failed to parse pricing options from URL:', error);
      }
    }
    
    // Load keyword from URL
    const keywordParam = urlParams.get('keyword');
    if (keywordParam) {
      dispatch(setKeyword(keywordParam));
    }
  }, [dispatch]);

  // Save state to URL when filters change
  const saveToURL = (pricingOptions: PricingOption[], keyword: string) => {
    const url = new URL(window.location.href);
    
    // Update pricing options
    if (pricingOptions.length > 0) {
      url.searchParams.set('pricing', JSON.stringify(pricingOptions));
    } else {
      url.searchParams.delete('pricing');
    }
    
    // Update keyword
    if (keyword.trim()) {
      url.searchParams.set('keyword', keyword.trim());
    } else {
      url.searchParams.delete('keyword');
    }
    
    // Update URL without page reload
    window.history.replaceState({}, '', url.toString());
  };

  return { saveToURL };
};
