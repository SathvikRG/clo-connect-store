import { describe, it, expect, beforeEach } from 'vitest'
import filterReducer, {
  togglePricingOption,
  setKeyword,
  setSortBy,
  setPriceRange,
  resetFilters,
} from '../../store/slices/filterSlice'
import { PricingOption, SortOption } from '../../types/index'

describe('filterSlice', () => {
  const initialState = {
    pricingOptions: [],
    keyword: '',
    priceRange: [0, 999],
    sortBy: SortOption.ITEM_NAME,
  }

  beforeEach(() => {
    // Reset state before each test
  })

  describe('togglePricingOption', () => {
    it('adds pricing option when not present', () => {
      const action = togglePricingOption(PricingOption.PAID)
      const newState = filterReducer(initialState, action)
      
      expect(newState.pricingOptions).toContain(PricingOption.PAID)
    })

    it('removes pricing option when already present', () => {
      const stateWithPaid = {
        ...initialState,
        pricingOptions: [PricingOption.PAID],
      }
      
      const action = togglePricingOption(PricingOption.PAID)
      const newState = filterReducer(stateWithPaid, action)
      
      expect(newState.pricingOptions).not.toContain(PricingOption.PAID)
    })

    it('handles multiple pricing options', () => {
      const stateWithMultiple = {
        ...initialState,
        pricingOptions: [PricingOption.PAID, PricingOption.FREE],
      }
      
      const action = togglePricingOption(PricingOption.VIEW_ONLY)
      const newState = filterReducer(stateWithMultiple, action)
      
      expect(newState.pricingOptions).toContain(PricingOption.PAID)
      expect(newState.pricingOptions).toContain(PricingOption.FREE)
      expect(newState.pricingOptions).toContain(PricingOption.VIEW_ONLY)
    })
  })

  describe('setKeyword', () => {
    it('sets keyword correctly', () => {
      const action = setKeyword('test keyword')
      const newState = filterReducer(initialState, action)
      
      expect(newState.keyword).toBe('test keyword')
    })

    it('handles empty keyword', () => {
      const action = setKeyword('')
      const newState = filterReducer(initialState, action)
      
      expect(newState.keyword).toBe('')
    })

    it('handles special characters in keyword', () => {
      const action = setKeyword('test@#$%^&*()')
      const newState = filterReducer(initialState, action)
      
      expect(newState.keyword).toBe('test@#$%^&*()')
    })
  })

  describe('setSortBy', () => {
    it('sets sort by item name', () => {
      const action = setSortBy(SortOption.ITEM_NAME)
      const newState = filterReducer(initialState, action)
      
      expect(newState.sortBy).toBe(SortOption.ITEM_NAME)
    })

    it('sets sort by higher price', () => {
      const action = setSortBy(SortOption.HIGHER_PRICE)
      const newState = filterReducer(initialState, action)
      
      expect(newState.sortBy).toBe(SortOption.HIGHER_PRICE)
    })

    it('sets sort by lower price', () => {
      const action = setSortBy(SortOption.LOWER_PRICE)
      const newState = filterReducer(initialState, action)
      
      expect(newState.sortBy).toBe(SortOption.LOWER_PRICE)
    })
  })

  describe('setPriceRange', () => {
    it('sets price range correctly', () => {
      const action = setPriceRange([100, 500])
      const newState = filterReducer(initialState, action)
      
      expect(newState.priceRange).toEqual([100, 500])
    })

    it('handles edge case values', () => {
      const action = setPriceRange([0, 999])
      const newState = filterReducer(initialState, action)
      
      expect(newState.priceRange).toEqual([0, 999])
    })

    it('handles same min and max values', () => {
      const action = setPriceRange([250, 250])
      const newState = filterReducer(initialState, action)
      
      expect(newState.priceRange).toEqual([250, 250])
    })
  })

  describe('resetFilters', () => {
    it('resets all filters to default state', () => {
      const stateWithFilters = {
        pricingOptions: [PricingOption.PAID, PricingOption.FREE],
        keyword: 'test keyword',
        priceRange: [100, 500],
        sortBy: SortOption.HIGHER_PRICE,
      }
      
      const action = resetFilters()
      const newState = filterReducer(stateWithFilters, action)
      
      expect(newState.pricingOptions).toEqual([])
      expect(newState.keyword).toBe('')
      expect(newState.priceRange).toEqual([0, 999])
      expect(newState.sortBy).toBe(SortOption.ITEM_NAME)
    })

    it('resets from empty state', () => {
      const action = resetFilters()
      const newState = filterReducer(initialState, action)
      
      expect(newState.pricingOptions).toEqual([])
      expect(newState.keyword).toBe('')
      expect(newState.priceRange).toEqual([0, 999])
      expect(newState.sortBy).toBe(SortOption.ITEM_NAME)
    })
  })

  describe('initial state', () => {
    it('has correct default values', () => {
      expect(initialState.pricingOptions).toEqual([])
      expect(initialState.keyword).toBe('')
      expect(initialState.priceRange).toEqual([0, 999])
      expect(initialState.sortBy).toBe(SortOption.ITEM_NAME)
    })
  })

  describe('state immutability', () => {
    it('does not mutate original state', () => {
      const originalState = { ...initialState }
      const action = setKeyword('test')
      const newState = filterReducer(originalState, action)
      
      expect(originalState).not.toBe(newState)
      expect(originalState.keyword).toBe('')
      expect(newState.keyword).toBe('test')
    })

    it('creates new arrays for pricing options', () => {
      const stateWithOptions = {
        ...initialState,
        pricingOptions: [PricingOption.PAID],
      }
      
      const action = togglePricingOption(PricingOption.FREE)
      const newState = filterReducer(stateWithOptions, action)
      
      expect(stateWithOptions.pricingOptions).not.toBe(newState.pricingOptions)
      expect(newState.pricingOptions).toContain(PricingOption.PAID)
      expect(newState.pricingOptions).toContain(PricingOption.FREE)
    })
  })
})
