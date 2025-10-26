import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { vi } from 'vitest'
import ContentGrid from '../ContentGrid'
import storeReducer from '../../../../store/slices/storeSlice'
import filterReducer from '../../../../store/slices/filterSlice'
import { type StoreItem, PricingOption } from '../../../../types/index'

// Mock the useInfiniteScroll hook
vi.mock('../../../../hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: vi.fn(() => ({
    ref: null,
    isLoading: false,
    hasMore: true,
  })),
}))

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      store: storeReducer,
      filters: filterReducer,
    },
    preloadedState: initialState,
  })
}

const renderWithProvider = (component: React.ReactElement, initialState = {}) => {
  const store = createMockStore(initialState)
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}

const mockItems: StoreItem[] = [
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

describe('ContentGrid', () => {
  const defaultState = {
    filters: {
      pricingOptions: [],
      keyword: '',
      sortBy: 'itemName' as const,
      priceRange: [0, 999],
    },
    store: {
      items: mockItems,
      filteredItems: mockItems,
      ui: { isLoading: false, hasMore: true, currentPage: 1 },
      error: null,
    },
  }

  it('renders loading skeleton when isLoading is true', () => {
    renderWithProvider(<ContentGrid items={[]} isLoading={true} />, defaultState)
    
    expect(screen.getByText('Contents List')).toBeInTheDocument()
    // Check for skeleton elements by looking for animate-pulse class
    const skeletonElements = screen.getAllByText('', { selector: '.animate-pulse' })
    expect(skeletonElements.length).toBeGreaterThan(0)
  })

  it('renders items in grid layout', () => {
    renderWithProvider(<ContentGrid items={mockItems} isLoading={false} />, defaultState)
    
    expect(screen.getByText('Contents List')).toBeInTheDocument()
    expect(screen.getByText('Amazing Outfit')).toBeInTheDocument()
    expect(screen.getByText('Free Design')).toBeInTheDocument()
    expect(screen.getByText('View Only Item')).toBeInTheDocument()
  })

  it('displays correct pricing information', () => {
    renderWithProvider(<ContentGrid items={mockItems} isLoading={false} />, defaultState)
    
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('FREE')).toBeInTheDocument()
    expect(screen.getByText('View Only')).toBeInTheDocument()
  })

  it('displays creator names', () => {
    renderWithProvider(<ContentGrid items={mockItems} isLoading={false} />, defaultState)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument()
  })

  it('handles image loading errors gracefully', () => {
    const itemsWithInvalidImages = [
      {
        ...mockItems[0],
        imagePath: 'invalid-url',
      },
    ]
    
    renderWithProvider(<ContentGrid items={itemsWithInvalidImages} isLoading={false} />, defaultState)
    
    const images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute('src', 'invalid-url')
  })

  it('renders empty state when no items', () => {
    renderWithProvider(<ContentGrid items={[]} isLoading={false} />, defaultState)
    
    expect(screen.getByText('Contents List')).toBeInTheDocument()
    // Should not show any item content
    expect(screen.queryByText('Amazing Outfit')).not.toBeInTheDocument()
  })

  it('applies correct CSS classes for responsive grid', () => {
    renderWithProvider(<ContentGrid items={mockItems} isLoading={false} />, defaultState)
    
    // Find the grid container by looking for the grid class
    const gridContainer = document.querySelector('.grid')
    expect(gridContainer).toBeInTheDocument()
    if (gridContainer) {
      expect(gridContainer).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4')
    }
  })

  it('shows loading more indicator when hasMore is true', () => {
    const stateWithHasMore = {
      ...defaultState,
      store: {
        ...defaultState.store,
        ui: { ...defaultState.store.ui, hasMore: true },
      },
    }
    
    renderWithProvider(<ContentGrid items={mockItems} isLoading={false} />, stateWithHasMore)
    
    expect(screen.getByText('Scroll down to load more')).toBeInTheDocument()
  })

  it('shows end of results when hasMore is false', async () => {
    // Mock the useInfiniteScroll hook to return hasMore: false
    const { useInfiniteScroll } = await import('../../../../hooks/useInfiniteScroll')
    vi.mocked(useInfiniteScroll).mockReturnValue({
      ref: null,
      isLoading: false,
      hasMore: false,
    })
    
    renderWithProvider(<ContentGrid items={mockItems} isLoading={false} />, defaultState)
    
    // The component should show "No more items to load" when hasMore is false
    expect(screen.getByText('No more items to load')).toBeInTheDocument()
  })
})
