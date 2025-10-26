import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from '../store'
import { setPricingOptions, setKeyword, setSortBy, setPriceRange } from '../store/slices/filterSlice'
import { PricingOption, SortOption } from '../types/index'

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
        console.error('Failed to parse pricing options from URL:', error)
      }
    }
    
    // Load keyword from URL
    const keywordParam = urlParams.get('keyword');
    if (keywordParam) {
      dispatch(setKeyword(keywordParam));
    }

    // Load sortBy from URL
    const sortByParam = urlParams.get('sortBy');
    if (sortByParam && Object.values(SortOption).includes(sortByParam as SortOption)) {
      dispatch(setSortBy(sortByParam as SortOption));
    }

    // Load price range from URL
    const priceMinParam = urlParams.get('priceMin');
    const priceMaxParam = urlParams.get('priceMax');
    if (priceMinParam && priceMaxParam) {
      try {
        const min = parseInt(priceMinParam);
        const max = parseInt(priceMaxParam);
        if (!isNaN(min) && !isNaN(max)) {
          dispatch(setPriceRange([min, max]));
        }
      } catch (error) {
        console.error('Failed to parse price range from URL:', error)
      }
    }
  }, [dispatch]);

  // Save state to URL when filters change
  const saveToURL = useCallback((
    pricingOptions: PricingOption[],
    keyword: string,
    sortBy: SortOption,
    priceRange: [number, number]
  ) => {
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

    // Update sortBy
    if (sortBy !== SortOption.ITEM_NAME) { // Only save if not default
      url.searchParams.set('sortBy', sortBy);
    } else {
      url.searchParams.delete('sortBy');
    }

    // Update price range
    if (priceRange[0] !== 0 || priceRange[1] !== 999) { // Only save if not default
      url.searchParams.set('priceMin', priceRange[0].toString());
      url.searchParams.set('priceMax', priceRange[1].toString());
    } else {
      url.searchParams.delete('priceMin');
      url.searchParams.delete('priceMax');
    }
    
    // Update URL without page reload
    window.history.replaceState({}, '', url.toString())
  }, []);

  return { saveToURL }
};
