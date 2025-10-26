import { describe, it, expect, beforeEach, vi } from 'vitest'
import storeReducer, {
  fetchStoreItems,
  resetStore,
  filterItems,
  clearError,
} from '../../../store/slices/storeSlice'
import { PricingOption, SortOption } from '../../../types/index'

// Mock the API
vi.mock('../../../services/api', () => ({
  storeApi: {
    fetchStoreItemsPaginated: vi.fn(),
  },
}))

describe('storeSlice', () => {
  const initialState = {
    items: [],
    filteredItems: [],
    ui: {
      isLoading: false,
      hasMore: true,
      currentPage: 1,
    },
    error: null,
  }

  const mockItems = [
    {
      id: 'item-1',
      creator: 'John Doe',
      title: 'Amazing Outfit',
      pricingOption: PricingOption.PAID,
      imagePath: 'https://example.com/image1.jpg',
      price: 29.99,
    },
    {
      id: 'item-2',
      creator: 'Jane Smith',
      title: 'Free Design',
      pricingOption: PricingOption.FREE,
      imagePath: 'https://example.com/image2.jpg',
      price: 0,
    },
    {
      id: 'item-3',
      creator: 'Bob Wilson',
      title: 'View Only Item',
      pricingOption: PricingOption.VIEW_ONLY,
      imagePath: 'https://example.com/image3.jpg',
      price: 0,
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('has correct default values', () => {
      expect(initialState.items).toEqual([])
      expect(initialState.filteredItems).toEqual([])
      expect(initialState.ui.isLoading).toBe(false)
      expect(initialState.ui.hasMore).toBe(true)
      expect(initialState.ui.currentPage).toBe(1)
      expect(initialState.error).toBeNull()
    })
  })

  describe('resetStore', () => {
    it('resets store to initial state', () => {
      const stateWithData = {
        items: mockItems,
        filteredItems: mockItems,
        ui: {
          isLoading: true,
          hasMore: false,
          currentPage: 3,
        },
        error: 'Some error',
      }
      
      const action = resetStore()
      const newState = storeReducer(stateWithData, action)
      
      expect(newState).toEqual(initialState)
    })
  })

  describe('clearError', () => {
    it('clears error state', () => {
      const stateWithError = {
        ...initialState,
        error: 'Some error',
      }
      
      const action = clearError()
      const newState = storeReducer(stateWithError, action)
      
      expect(newState.error).toBeNull()
    })
  })

  describe('filterItems', () => {
    const stateWithItems = {
      ...initialState,
      items: mockItems,
      filteredItems: mockItems,
    }

    it('filters by pricing options', () => {
      const action = filterItems({
        pricingOptions: [PricingOption.PAID],
        keyword: '',
        sortBy: SortOption.ITEM_NAME,
        priceRange: [0, 999],
      })
      
      const newState = storeReducer(stateWithItems, action)
      
      expect(newState.filteredItems).toHaveLength(1)
      expect(newState.filteredItems[0].pricingOption).toBe(PricingOption.PAID)
    })

    it('filters by keyword', () => {
      const action = filterItems({
        pricingOptions: [],
        keyword: 'John',
        sortBy: SortOption.ITEM_NAME,
        priceRange: [0, 999],
      })
      
      const newState = storeReducer(stateWithItems, action)
      
      expect(newState.filteredItems).toHaveLength(1)
      expect(newState.filteredItems[0].creator).toBe('John Doe')
    })

    it('filters by keyword in title', () => {
      const action = filterItems({
        pricingOptions: [],
        keyword: 'Amazing',
        sortBy: SortOption.ITEM_NAME,
        priceRange: [0, 999],
      })
      
      const newState = storeReducer(stateWithItems, action)
      
      expect(newState.filteredItems).toHaveLength(1)
      expect(newState.filteredItems[0].title).toBe('Amazing Outfit')
    })

    it('combines pricing and keyword filters', () => {
      const action = filterItems({
        pricingOptions: [PricingOption.FREE],
        keyword: 'Jane',
        sortBy: SortOption.ITEM_NAME,
        priceRange: [0, 999],
      })
      
      const newState = storeReducer(stateWithItems, action)
      
      expect(newState.filteredItems).toHaveLength(1)
      expect(newState.filteredItems[0].pricingOption).toBe(PricingOption.FREE)
      expect(newState.filteredItems[0].creator).toBe('Jane Smith')
    })

    it('sorts by item name', () => {
      const action = filterItems({
        pricingOptions: [],
        keyword: '',
        sortBy: SortOption.ITEM_NAME,
        priceRange: [0, 999],
      })
      
      const newState = storeReducer(stateWithItems, action)
      
      expect(newState.filteredItems[0].title).toBe('Amazing Outfit')
      expect(newState.filteredItems[1].title).toBe('Free Design')
      expect(newState.filteredItems[2].title).toBe('View Only Item')
    })

    it('sorts by higher price', () => {
      const action = filterItems({
        pricingOptions: [],
        keyword: '',
        sortBy: SortOption.HIGHER_PRICE,
        priceRange: [0, 999],
      })
      
      const newState = storeReducer(stateWithItems, action)
      
      expect(newState.filteredItems[0].price).toBe(29.99)
      expect(newState.filteredItems[1].price).toBe(0)
      expect(newState.filteredItems[2].price).toBe(0)
    })

    it('sorts by lower price', () => {
      const action = filterItems({
        pricingOptions: [],
        keyword: '',
        sortBy: SortOption.LOWER_PRICE,
        priceRange: [0, 999],
      })
      
      const newState = storeReducer(stateWithItems, action)
      
      expect(newState.filteredItems[0].price).toBe(0)
      expect(newState.filteredItems[1].price).toBe(0)
      expect(newState.filteredItems[2].price).toBe(29.99)
    })

    it('filters by price range for paid items', () => {
      const action = filterItems({
        pricingOptions: [PricingOption.PAID],
        keyword: '',
        sortBy: SortOption.ITEM_NAME,
        priceRange: [20, 40],
      })
      
      const newState = storeReducer(stateWithItems, action)
      
      expect(newState.filteredItems).toHaveLength(1)
      expect(newState.filteredItems[0].price).toBe(29.99)
    })

    it('excludes paid items outside price range', () => {
      const action = filterItems({
        pricingOptions: [PricingOption.PAID],
        keyword: '',
        sortBy: SortOption.ITEM_NAME,
        priceRange: [50, 100],
      })
      
      const newState = storeReducer(stateWithItems, action)
      
      expect(newState.filteredItems).toHaveLength(0)
    })

    it('returns all items when no filters applied', () => {
      const action = filterItems({
        pricingOptions: [],
        keyword: '',
        sortBy: SortOption.ITEM_NAME,
        priceRange: [0, 999],
      })
      
      const newState = storeReducer(stateWithItems, action)
      
      expect(newState.filteredItems).toHaveLength(3)
    })
  })

  describe('fetchStoreItems async thunk', () => {
    it('handles pending state', () => {
      const action = { type: fetchStoreItems.pending.type }
      const newState = storeReducer(initialState, action)
      
      expect(newState.ui.isLoading).toBe(true)
      expect(newState.error).toBeNull()
    })

    it('handles fulfilled state with first page', () => {
      const action = {
        type: fetchStoreItems.fulfilled.type,
        payload: {
          items: mockItems,
          hasMore: true,
        },
      }
      
      const newState = storeReducer(initialState, action)
      
      expect(newState.items).toEqual(mockItems)
      expect(newState.filteredItems).toEqual(mockItems)
      expect(newState.ui.isLoading).toBe(false)
      expect(newState.ui.hasMore).toBe(true)
      expect(newState.ui.currentPage).toBe(2)
    })

    it('handles fulfilled state with subsequent pages', () => {
      const stateWithItems = {
        ...initialState,
        items: [mockItems[0]],
        filteredItems: [mockItems[0]],
        ui: {
          ...initialState.ui,
          currentPage: 2,
        },
      }
      
      const action = {
        type: fetchStoreItems.fulfilled.type,
        payload: {
          items: [mockItems[1], mockItems[2]],
          hasMore: false,
        },
      }
      
      const newState = storeReducer(stateWithItems, action)
      
      expect(newState.items).toEqual(mockItems)
      expect(newState.filteredItems).toEqual(mockItems)
      expect(newState.ui.isLoading).toBe(false)
      expect(newState.ui.hasMore).toBe(false)
      expect(newState.ui.currentPage).toBe(3)
    })

    it('handles rejected state', () => {
      const action = {
        type: fetchStoreItems.rejected.type,
        error: { message: 'Network error' },
      }
      
      const newState = storeReducer(initialState, action)
      
      expect(newState.ui.isLoading).toBe(false)
      expect(newState.error).toBe('Network error')
    })

    it('deduplicates items on fulfilled', () => {
      const stateWithItems = {
        ...initialState,
        items: [mockItems[0]],
        filteredItems: [mockItems[0]],
        ui: {
          ...initialState.ui,
          currentPage: 2,
        },
      }
      
      const action = {
        type: fetchStoreItems.fulfilled.type,
        payload: {
          items: [mockItems[0], mockItems[1]], // item-1 is duplicate
          hasMore: true,
        },
      }
      
      const newState = storeReducer(stateWithItems, action)
      
      expect(newState.items).toHaveLength(2)
      expect(newState.items[0].id).toBe('item-1')
      expect(newState.items[1].id).toBe('item-2')
    })
  })
})
