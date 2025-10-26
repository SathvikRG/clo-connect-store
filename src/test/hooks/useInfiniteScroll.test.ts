import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { vi } from 'vitest'
import React from 'react'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import storeReducer from '../../store/slices/storeSlice'
import filterReducer from '../../store/slices/filterSlice'
import { useInView } from 'react-intersection-observer'

// Mock react-intersection-observer
vi.mock('react-intersection-observer', () => {
  return {
    useInView: vi.fn(() => ({
      ref: null,
      inView: false,
    })),
  }
})

// Mock the store actions
vi.mock('../../../store/slices/storeSlice', async () => {
  const actual = await vi.importActual('../../../store/slices/storeSlice')
  return {
    ...actual,
    fetchStoreItems: vi.fn(),
  }
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

describe('useInfiniteScroll', () => {
  const defaultState = {
    filters: {
      pricingOptions: [],
      keyword: '',
      sortBy: 'itemName' as const,
      priceRange: [0, 999],
    },
    store: {
      items: [],
      filteredItems: [],
      ui: { isLoading: false, hasMore: true, currentPage: 1 },
      error: null,
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns correct initial values', () => {
    const { result } = renderHookWithProvider(useInfiniteScroll, defaultState)
    
    expect(result.current.ref).toBeNull()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.hasMore).toBe(true)
  })

  it('returns loading state from store', () => {
    const stateWithLoading = {
      ...defaultState,
      store: {
        ...defaultState.store,
        ui: { ...defaultState.store.ui, isLoading: true },
      },
    }
    
    const { result } = renderHookWithProvider(useInfiniteScroll, stateWithLoading)
    
    expect(result.current.isLoading).toBe(true)
  })

  it('returns hasMore state from store', () => {
    const stateWithoutHasMore = {
      ...defaultState,
      store: {
        ...defaultState.store,
        ui: { ...defaultState.store.ui, hasMore: false },
      },
    }
    
    const { result } = renderHookWithProvider(useInfiniteScroll, stateWithoutHasMore)
    
    expect(result.current.hasMore).toBe(false)
  })

  it('dispatches fetchStoreItems when inView is true and conditions are met', () => {
    // Set up inView to return true
    vi.mocked(useInView).mockReturnValueOnce({
      ref: null,
      inView: true,
    })
    
    const { result } = renderHookWithProvider(useInfiniteScroll, defaultState)
    
    // When inView is true, it triggers dispatch which sets isLoading to true
    expect(result.current.ref).toBeNull()
    expect(result.current.isLoading).toBe(true)
    expect(result.current.hasMore).toBe(true)
  })

  it('handles different inView states', () => {
    const { result } = renderHookWithProvider(useInfiniteScroll, defaultState)
    
    expect(result.current.ref).toBeNull()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.hasMore).toBe(true)
  })
})
