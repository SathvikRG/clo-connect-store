import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { PricingOption, type FilterState, SortOption } from '../../types/index';

// Initial state
const initialState: FilterState = {
  pricingOptions: [],
  keyword: '',
  priceRange: [0, 999],
  sortBy: SortOption.ITEM_NAME,
};

// Filter slice
const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Update pricing options filter
    setPricingOptions: (state, action: PayloadAction<PricingOption[]>) => {
      state.pricingOptions = action.payload;
    },
    
    // Toggle individual pricing option
    togglePricingOption: (state, action: PayloadAction<PricingOption>) => {
      const option = action.payload;
      const index = state.pricingOptions.indexOf(option);
      
      if (index > -1) {
        // Remove if already selected
        state.pricingOptions.splice(index, 1);
      } else {
        // Add if not selected
        state.pricingOptions.push(option);
      }
    },
    
    // Update keyword search
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    
    // Update price range
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    
    // Update sort option
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    
    // Reset all filters to default state
    resetFilters: (state) => {
      state.pricingOptions = [];
      state.keyword = '';
      state.priceRange = [0, 999];
      state.sortBy = SortOption.ITEM_NAME;
    },
  },
});

export const {
  setPricingOptions,
  togglePricingOption,
  setKeyword,
  setPriceRange,
  setSortBy,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
