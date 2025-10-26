import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { vi } from 'vitest'
import React from 'react'
import { usePersistence } from '../../hooks/usePersistence'
import storeReducer from '../store/slices/storeSlice'
import filterReducer from '../store/slices/filterSlice'
import { PricingOption, SortOption } from '../types/index'

// Mock window.history
const mockReplaceState = vi.fn()
Object.defineProperty(window, 'history', {
  value: {
    replaceState: mockReplaceState,
  },
  writable: true,
})

// Mock window.location
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
  beforeEach(() => {
    vi.clearAllMocks()
    mockLocation.href = 'http://localhost:3000'
    mockLocation.search = ''
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
})
