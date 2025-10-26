import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import SearchAndFilters from '../../components/SearchAndFilters'
import storeReducer from '../../store/slices/storeSlice'
import filterReducer from '../../store/slices/filterSlice'
import { PricingOption, SortOption } from '../../types/index'

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
  const result = render(
    <Provider store={store}>
      {component}
    </Provider>
  )
  return result
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
    
    expect(screen.getByPlaceholderText("Find the Items you're looking for")).toBeInTheDocument()
    expect(screen.getByText('Paid')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('View Only')).toBeInTheDocument()
    expect(screen.getByText('Sort by')).toBeInTheDocument()
    expect(screen.getByText('RESET')).toBeInTheDocument()
  })

  it('handles keyword search input', () => {
    renderWithProvider(<SearchAndFilters />, defaultState)
    
    const searchInput = screen.getByPlaceholderText("Find the Items you're looking for")
    fireEvent.change(searchInput, { target: { value: 'test keyword' } })
    
    expect(searchInput).toHaveValue('test keyword')
  })

  it('handles pricing option toggles', () => {
    renderWithProvider(<SearchAndFilters />, defaultState)
    
    const paidCheckbox = screen.getByLabelText('Paid')
    const freeCheckbox = screen.getByLabelText('Free')
    const viewOnlyCheckbox = screen.getByLabelText('View Only')
    
    fireEvent.click(paidCheckbox)
    expect(paidCheckbox).toBeChecked()
    
    fireEvent.click(freeCheckbox)
    expect(freeCheckbox).toBeChecked()
    
    fireEvent.click(viewOnlyCheckbox)
    expect(viewOnlyCheckbox).toBeChecked()
    
    fireEvent.click(paidCheckbox)
    expect(paidCheckbox).not.toBeChecked()
  })

  it('handles sort dropdown change', () => {
    const { container } = renderWithProvider(<SearchAndFilters />, defaultState)
    
    const sortSelect = container.querySelector('.MuiSelect-root') as HTMLSelectElement
    expect(sortSelect).toBeInTheDocument()
    
    // Get the native input and change its value
    const nativeInput = sortSelect.querySelector('.MuiSelect-nativeInput')
    if (nativeInput && nativeInput instanceof HTMLInputElement) {
      fireEvent.change(nativeInput, { target: { value: SortOption.HIGHER_PRICE } })
      expect(nativeInput.value).toBe(SortOption.HIGHER_PRICE)
    }
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
    
    expect(screen.getAllByText('$0')[0]).toBeInTheDocument()
    expect(screen.getAllByText('$999')[0]).toBeInTheDocument()
    expect(screen.getAllByRole('slider').length).toBeGreaterThan(0)
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
    
    const slider = screen.getAllByRole('slider')[0]
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
    
    // After reset, keyword should be empty
    expect(screen.getByPlaceholderText("Find the Items you're looking for")).toHaveValue('')
  })

  it('displays correct pricing option labels', () => {
    renderWithProvider(<SearchAndFilters />, defaultState)
    
    expect(screen.getByText('Paid')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('View Only')).toBeInTheDocument()
  })

  it('displays correct sort options', () => {
    const { container } = renderWithProvider(<SearchAndFilters />, defaultState)
    
    const sortSelect = container.querySelector('.MuiSelect-root')
    expect(sortSelect).toBeInTheDocument()
    
    // Verify the displayed text shows "Item Name"
    expect(screen.getByText('Item Name')).toBeInTheDocument()
  })
})
