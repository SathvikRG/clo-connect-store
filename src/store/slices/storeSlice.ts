import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { type StoreItem, type UIState, PricingOption } from '../../types/index'
import { storeApi } from '../../services/api'

// Async thunk for fetching store items
export const fetchStoreItems = createAsyncThunk(
  'store/fetchStoreItems',
  async (params?: { page?: number; limit?: number }) => {
    const { page = 1, limit = 20 } = params || {};
    const response = await storeApi.fetchStoreItemsPaginated(page, limit);
    return response
  }
);

// Initial state
interface StoreState {
  items: StoreItem[];
  filteredItems: StoreItem[];
  ui: UIState;
  error: string | null;
}

const initialState: StoreState = {
  items: [],
  filteredItems: [],
  ui: {
    isLoading: false,
    hasMore: true,
    currentPage: 1,
  },
  error: null,
};

// Store slice
const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    // Reset store state
        resetStore: (state) => {
          state.items = [];
          state.filteredItems = [];
          state.ui = {
            isLoading: false,
            hasMore: true,
            currentPage: 1,
          };
          state.error = null
        },
    
    // Filter items based on pricing options, keyword, sort, and price range
    filterItems: (state, action: PayloadAction<{ pricingOptions: PricingOption[]; keyword: string; sortBy: string; priceRange: [number, number] }>) => {
      const { pricingOptions, keyword, sortBy, priceRange } = action.payload;
      
      let filtered = state.items;
      
      // Filter by pricing options
      if (pricingOptions.length > 0) {
        filtered = filtered.filter(item => {
          if (!pricingOptions.includes(item.pricingOption)) return false;
          
          // If PAID option is selected, also filter by price range
          if (item.pricingOption === PricingOption.PAID) {
            return item.price >= priceRange[0] && item.price <= priceRange[1];
          }
          
          return true
        });
      }
      
      // Filter by keyword (search in title and creator)
      if (keyword.trim()) {
        const searchTerm = keyword.toLowerCase().trim();
        filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(searchTerm) ||
          item.creator.toLowerCase().includes(searchTerm)
        );
      }
      
      // Sort items
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'itemName':
            return a.title.localeCompare(b.title);
          case 'higherPrice':
            return b.price - a.price;
          case 'lowerPrice':
            return a.price - b.price;
          default:
            return 0;
        }
      });
      
      state.filteredItems = filtered
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch store items
      .addCase(fetchStoreItems.pending, (state) => {
        state.ui.isLoading = true;
        state.error = null
      })
      .addCase(fetchStoreItems.fulfilled, (state, action) => {
        state.ui.isLoading = false;
        state.ui.hasMore = action.payload.hasMore;
        
        if (state.ui.currentPage === 1) {
          // First page - replace items and deduplicate
          const uniqueItems = action.payload.items.filter((item, index, self) => 
            index === self.findIndex(t => t.id === item.id)
          );
          state.items = uniqueItems;
          // Initialize filtered items with all items
          state.filteredItems = uniqueItems;
        } else {
          // Subsequent pages - append items and deduplicate
          const allItems = [...state.items, ...action.payload.items];
          const uniqueItems = allItems.filter((item, index, self) => 
            index === self.findIndex(t => t.id === item.id)
          );
          state.items = uniqueItems;
          // Update filtered items with new items
          state.filteredItems = uniqueItems;
        }
        
        state.ui.currentPage += 1
      })
      .addCase(fetchStoreItems.rejected, (state, action) => {
        state.ui.isLoading = false;
        state.error = action.error.message || 'Failed to fetch store items'
      });
  },
});

export const { resetStore, filterItems, clearError } = storeSlice.actions
export default storeSlice.reducer
