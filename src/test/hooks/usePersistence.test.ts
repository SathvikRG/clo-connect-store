import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { vi } from 'vitest'
import React from 'react'
import { usePersistence } from '../../hooks/usePersistence'
import storeReducer from '../../store/slices/storeSlice'
import filterReducer from '../../store/slices/filterSlice'
import { PricingOption, SortOption } from '../../types/index'

const mockReplaceState = vi.fn()
Object.defineProperty(window, 'history', {
  value: {
    replaceState: mockReplaceState,
  },
  writable: true,
})
const mockLocation = {
  href: 'http://localhost:3000',
  search: '',
}
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      store: storeReducer,
      filters: filterReducer,
    },
    preloadedState: initialState,
  })
}

const renderHookWithProvider = (hook: () => unknown, initialState = {}) => {
  const store = createMockStore(initialState)
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(Provider, { store }, children)
  }
  return renderHook(hook, { wrapper })
}

describe('usePersistence', () => {
  const originalLocation = window.location
  
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocation.href = 'http://localhost:3000'
    mockLocation.search = ''
  })

  afterEach(() => {
    window.location = originalLocation
  })

  it('provides saveToURL function', () => {
    const { result } = renderHookWithProvider(usePersistence)
    
    expect(typeof result.current.saveToURL).toBe('function')
  })

  it('saves pricing options to URL', () => {
    const { result } = renderHookWithProvider(usePersistence)
    
    act(() => {
      result.current.saveToURL(
        [PricingOption.PAID, PricingOption.FREE],
        '',
        SortOption.ITEM_NAME,
        [0, 999]
      )
    })
    
    expect(mockReplaceState).toHaveBeenCalledWith(
      {},
      '',
      expect.stringContaining('pricing=%5B0%2C1%5D')
    )
  })

  it('saves keyword to URL', () => {
    const { result } = renderHookWithProvider(usePersistence)
    
    act(() => {
      result.current.saveToURL(
        [],
        'test keyword',
        SortOption.ITEM_NAME,
        [0, 999]
      )
    })
    
    expect(mockReplaceState).toHaveBeenCalledWith(
      {},
      '',
      expect.stringContaining('keyword=test+keyword')
    )
  })

  it('saves sort option to URL when not default', () => {
    const { result } = renderHookWithProvider(usePersistence)
    
    act(() => {
      result.current.saveToURL(
        [],
        '',
        SortOption.HIGHER_PRICE,
        [0, 999]
      )
    })
    
    expect(mockReplaceState).toHaveBeenCalledWith(
      {},
      '',
      expect.stringContaining('sortBy=higherPrice')
    )
  })

  it('saves price range to URL when not default', () => {
    const { result } = renderHookWithProvider(usePersistence)
    
    act(() => {
      result.current.saveToURL(
        [],
        '',
        SortOption.ITEM_NAME,
        [100, 500]
      )
    })
    
    expect(mockReplaceState).toHaveBeenCalledWith(
      {},
      '',
      expect.stringContaining('priceMin=100')
    )
    expect(mockReplaceState).toHaveBeenCalledWith(
      {},
      '',
      expect.stringContaining('priceMax=500')
    )
  })

  it('removes default values from URL', () => {
    const { result } = renderHookWithProvider(usePersistence)
    
    act(() => {
      result.current.saveToURL(
        [],
        '',
        SortOption.ITEM_NAME,
        [0, 999]
      )
    })
    
    expect(mockReplaceState).toHaveBeenCalledWith(
      {},
      '',
      'http://localhost:3000/'
    )
  })

  it('combines multiple parameters in URL', () => {
    const { result } = renderHookWithProvider(usePersistence)
    
    act(() => {
      result.current.saveToURL(
        [PricingOption.PAID],
        'test',
        SortOption.LOWER_PRICE,
        [50, 200]
      )
    })
    
    const callArgs = mockReplaceState.mock.calls[0]
    const url = callArgs[2]
    
    expect(url).toContain('pricing=')
    expect(url).toContain('keyword=test')
    expect(url).toContain('sortBy=lowerPrice')
    expect(url).toContain('priceMin=50')
    expect(url).toContain('priceMax=200')
  })

  it('handles empty pricing options', () => {
    const { result } = renderHookWithProvider(usePersistence)
    
    act(() => {
      result.current.saveToURL(
        [],
        'test',
        SortOption.ITEM_NAME,
        [0, 999]
      )
    })
    
    expect(mockReplaceState).toHaveBeenCalledWith(
      {},
      '',
      expect.stringContaining('keyword=test')
    )
  })

  it('handles empty keyword', () => {
    const { result } = renderHookWithProvider(usePersistence)
    
    act(() => {
      result.current.saveToURL(
        [PricingOption.PAID],
        '',
        SortOption.ITEM_NAME,
        [0, 999]
      )
    })
    
    expect(mockReplaceState).toHaveBeenCalledWith(
      {},
      '',
      expect.stringContaining('pricing=')
    )
  })

  describe('URL parsing on mount', () => {
    it('loads pricing options from URL (line 17-19)', () => {
      mockLocation.search = '?pricing=["0","1"]'
      
      const store = createMockStore({})
      const wrapper = ({ children }: { children: React.ReactNode }) => {
        return React.createElement(Provider, { store }, children)
      }
      
      renderHook(() => usePersistence(), { wrapper })
      
      // The pricing options should be loaded
      const state = store.getState()
      expect(state.filters.pricingOptions).toBeDefined()
    })

    it('handles invalid JSON in pricing param (line 17-21)', () => {
      mockLocation.search = '?pricing=invalid-json'
      
      const store = createMockStore({})
      const wrapper = ({ children }: { children: React.ReactNode }) => {
        return React.createElement(Provider, { store }, children)
      }
      
      renderHook(() => usePersistence(), { wrapper })
      
      // Should handle the error gracefully
      expect(mockLocation.search).toBe('?pricing=invalid-json')
    })

    it('loads keyword from URL (line 28)', () => {
      mockLocation.search = '?keyword=test+search'
      
      const store = createMockStore({})
      const wrapper = ({ children }: { children: React.ReactNode }) => {
        return React.createElement(Provider, { store }, children)
      }
      
      renderHook(() => usePersistence(), { wrapper })
      
      // The keyword should be loaded
      const state = store.getState()
      expect(state.filters.keyword).toBe('test search')
    })

    it('loads sortBy from URL (line 34)', () => {
      mockLocation.search = '?sortBy=higherPrice'
      
      const store = createMockStore({})
      const wrapper = ({ children }: { children: React.ReactNode }) => {
        return React.createElement(Provider, { store }, children)
      }
      
      renderHook(() => usePersistence(), { wrapper })
      
      // The sortBy should be loaded
      const state = store.getState()
      expect(state.filters.sortBy).toBe('higherPrice')
    })

    it('loads price range from URL (line 41-45)', () => {
      mockLocation.search = '?priceMin=100&priceMax=500'
      
      const store = createMockStore({})
      const wrapper = ({ children }: { children: React.ReactNode }) => {
        return React.createElement(Provider, { store }, children)
      }
      
      renderHook(() => usePersistence(), { wrapper })
      
      // The price range should be loaded
      const state = store.getState()
      expect(state.filters.priceRange).toEqual([100, 500])
    })

    it('handles invalid price range (NaN) (line 44-45)', () => {
      mockLocation.search = '?priceMin=invalid&priceMax=500'
      
      const store = createMockStore({})
      const wrapper = ({ children }: { children: React.ReactNode }) => {
        return React.createElement(Provider, { store }, children)
      }
      
      renderHook(() => usePersistence(), { wrapper })
      
      const state = store.getState()
      expect(state.filters.priceRange).toEqual([0, 999])
    })

    it('handles price range parsing error (line 48)', () => {
      const originalParseInt = global.parseInt
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      global.parseInt = vi.fn(() => {
        throw new Error('Parse error')
      })
      
      mockLocation.search = '?priceMin=100&priceMax=500'
      
      const store = createMockStore({})
      const wrapper = ({ children }: { children: React.ReactNode }) => {
        return React.createElement(Provider, { store }, children)
      }
      
      renderHook(() => usePersistence(), { wrapper })
      
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to parse price range from URL:',
        expect.any(Error)
      )
      
      global.parseInt = originalParseInt
      consoleErrorSpy.mockRestore()
    })
  })
})
