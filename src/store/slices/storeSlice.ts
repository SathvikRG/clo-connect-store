import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { type StoreItem, type UIState } from '../../types/index';
import { storeApi } from '../../services/api';

// Async thunk for fetching store items (like Pinia actions)
export const fetchStoreItems = createAsyncThunk(
  'store/fetchStoreItems',
  async (params?: { page?: number; limit?: number }) => {
    const { page = 1, limit = 20 } = params || {};
    const response = await storeApi.fetchStoreItemsPaginated(page, limit);
    return response;
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
      state.error = null;
    },
    
    // Update filtered items (called by filter slice)
    updateFilteredItems: (state, action: PayloadAction<StoreItem[]>) => {
      state.filteredItems = action.payload;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch store items
      .addCase(fetchStoreItems.pending, (state) => {
        state.ui.isLoading = true;
        state.error = null;
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
        } else {
          // Subsequent pages - append items and deduplicate
          const allItems = [...state.items, ...action.payload.items];
          const uniqueItems = allItems.filter((item, index, self) => 
            index === self.findIndex(t => t.id === item.id)
          );
          state.items = uniqueItems;
        }
        
        state.ui.currentPage += 1;
      })
      .addCase(fetchStoreItems.rejected, (state, action) => {
        state.ui.isLoading = false;
        state.error = action.error.message || 'Failed to fetch store items';
      });
  },
});

export const { resetStore, updateFilteredItems, clearError } = storeSlice.actions;
export default storeSlice.reducer;
