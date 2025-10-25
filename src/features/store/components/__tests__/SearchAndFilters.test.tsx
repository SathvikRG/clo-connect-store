import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import SearchAndFilters from '../SearchAndFilters'
import storeReducer from '../../../../store/slices/storeSlice'
import filterReducer from '../../../../store/slices/filterSlice'
import { PricingOption, SortOption } from '../../../../types/index'

// Mock store for testing
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

describe('SearchAndFilters', () => {
  const defaultState = {
    filters: {
      pricingOptions: [],
      keyword: '',
      sortBy: SortOption.ITEM_NAME,
      priceRange: [0, 999],
    },
    store: {
      items: [],
      filteredItems: [],
      ui: { isLoading: false, hasMore: true, currentPage: 1 },
      error: null,
    },
  }

  it('renders all filter elements', () => {
    renderWithProvider(<SearchAndFilters />, defaultState)
    
    expect(screen.getByPlaceholderText("Find the Items you're lookng for")).toBeInTheDocument()
    expect(screen.getByText('Paid')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('View Only')).toBeInTheDocument()
    expect(screen.getByText('Sort by:')).toBeInTheDocument()
    expect(screen.getByText('RESET')).toBeInTheDocument()
  })

  it('handles keyword search input', () => {
    renderWithProvider(<SearchAndFilters />, defaultState)
    
    const searchInput = screen.getByPlaceholderText("Find the Items you're lookng for")
    fireEvent.change(searchInput, { target: { value: 'test keyword' } })
    
    expect(searchInput).toHaveValue('test keyword')
  })

  it('handles pricing option toggles', () => {
    renderWithProvider(<SearchAndFilters />, defaultState)
    
    const paidCheckbox = screen.getByLabelText('Paid')
    const freeCheckbox = screen.getByLabelText('Free')
    
    fireEvent.click(paidCheckbox)
    expect(paidCheckbox).toBeChecked()
    
    fireEvent.click(freeCheckbox)
    expect(freeCheckbox).toBeChecked()
    
    fireEvent.click(paidCheckbox)
    expect(paidCheckbox).not.toBeChecked()
  })

  it('handles sort dropdown change', () => {
    renderWithProvider(<SearchAndFilters />, defaultState)
    
    const sortSelect = screen.getByDisplayValue('Item Name')
    fireEvent.change(sortSelect, { target: { value: SortOption.HIGHER_PRICE } })
    
    expect(sortSelect).toHaveValue(SortOption.HIGHER_PRICE)
  })

  it('shows price range slider when Paid option is selected', () => {
    const stateWithPaidSelected = {
      ...defaultState,
      filters: {
        ...defaultState.filters,
        pricingOptions: [PricingOption.PAID],
      },
    }
    
    renderWithProvider(<SearchAndFilters />, stateWithPaidSelected)
    
    expect(screen.getByText(/Price Range:/)).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('handles price range slider change', () => {
    const stateWithPaidSelected = {
      ...defaultState,
      filters: {
        ...defaultState.filters,
        pricingOptions: [PricingOption.PAID],
        priceRange: [0, 500], // Set initial range
      },
    }
    
    renderWithProvider(<SearchAndFilters />, stateWithPaidSelected)
    
    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '500' } })
    
    // The slider should update its value
    expect(slider).toHaveValue('500')
  })

  it('handles reset button click', () => {
    const stateWithFilters = {
      ...defaultState,
      filters: {
        pricingOptions: [PricingOption.PAID, PricingOption.FREE],
        keyword: 'test',
        sortBy: SortOption.HIGHER_PRICE,
        priceRange: [100, 500],
      },
    }
    
    renderWithProvider(<SearchAndFilters />, stateWithFilters)
    
    const resetButton = screen.getAllByText('RESET')[0]
    fireEvent.click(resetButton)
    
    // After reset, all filters should be back to default
    expect(screen.getByDisplayValue('Item Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Find the Items you're lookng for")).toHaveValue('')
  })

  it('displays correct pricing option labels', () => {
    renderWithProvider(<SearchAndFilters />, defaultState)
    
    expect(screen.getByText('Paid')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('View Only')).toBeInTheDocument()
  })

  it('displays correct sort options', () => {
    renderWithProvider(<SearchAndFilters />, defaultState)
    
    const sortSelect = screen.getByDisplayValue('Item Name')
    expect(sortSelect).toBeInTheDocument()
    
    // Check if all sort options are available
    fireEvent.click(sortSelect)
    expect(screen.getByText('Item Name')).toBeInTheDocument()
    expect(screen.getByText('Higher Price')).toBeInTheDocument()
    expect(screen.getByText('Lower Price')).toBeInTheDocument()
  })
})
