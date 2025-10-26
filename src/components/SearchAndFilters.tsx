import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Button,
  Stack,
  Slider,
  InputAdornment,
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

import { type AppDispatch, type RootState } from '../store'
import { togglePricingOption, resetFilters, setKeyword, setSortBy, setPriceRange } from '../store/slices/filterSlice'
import { PricingOption, SortOption } from '../types/index'

const SearchAndFilters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pricingOptions, keyword, sortBy, priceRange } = useSelector((state: RootState) => state.filters);

  const handlePricingToggle = (option: PricingOption) => {
    dispatch(togglePricingOption(option))
  };

  const handleReset = () => {
    dispatch(resetFilters())
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value))
  };

  const handlePriceRangeChange = (_: Event, newValue: number | number[]) => {
    const value = newValue as number[];
    const [min, max] = value;
    const newRange: [number, number] = [Math.min(min, max), Math.max(min, max)];
    dispatch(setPriceRange(newRange))
  };

  return (
    <Box>
      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Find the Items you're looking for"
        value={keyword}
        onChange={handleKeywordChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'primary' }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />

      {/* Filter Section with Dark Background */}
      <Box
        sx={{
          bgcolor: '#1a1a1a',
          border: '1px solid',
          borderColor: '#1a1a1a',
          borderRadius: 1,
          p: 1.5,
          mb: 2,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* Left side: Pricing Options and Slider */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="text.primary" fontWeight="bold">
              Pricing Option
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={pricingOptions.includes(PricingOption.PAID)}
                  onChange={() => handlePricingToggle(PricingOption.PAID)}
                  size="small"
                />
              }
              label="Paid"
              sx={{ color: 'text.primary', '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={pricingOptions.includes(PricingOption.FREE)}
                  onChange={() => handlePricingToggle(PricingOption.FREE)}
                  size="small"
                />
              }
              label="Free"
              sx={{ color: 'text.primary', '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={pricingOptions.includes(PricingOption.VIEW_ONLY)}
                  onChange={() => handlePricingToggle(PricingOption.VIEW_ONLY)}
                  size="small"
                />
              }
              label="View Only"
              sx={{ color: 'text.primary', '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
            />
            {/* Inline Price Slider */}
            {pricingOptions.includes(PricingOption.PAID) && (
              <Box sx={{ minWidth: 150 }}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                    $0
                  </Typography>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    min={0}
                    max={999}
                    size="small"
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `$${value}`}
                    disableSwap={false}
                    sx={{
                      color: '#87CEEB',
                      height: 3,
                      flex: 1,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                    $999
                  </Typography>
                </Stack>
              </Box>
            )}
          </Stack>

          {/* Right side: Reset Button */}
          <Button
            onClick={handleReset}
            variant="text"
            size="small"
            sx={{ 
              color: 'text.secondary',
              fontSize: '0.75rem',
              minWidth: 'auto',
              px: 1,
            }}
          >
            RESET
          </Button>
        </Stack>
      </Box>

      {/* Sort By Section - Outside the dark container */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ justifyContent: 'flex-end' }}>
        <Typography variant="caption" color="text.primary" fontWeight="bold">
          Sort by
        </Typography>
        <Select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
          variant="standard"
          disableUnderline={false}
          sx={{ 
            minWidth: 100,
            '& .MuiSelect-select': {
              color: 'text.primary',
              fontWeight: 'normal',
              fontSize: '0.75rem',
            },
            '& .MuiInput-underline:before': {
              borderBottomColor: '#666666',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#cccccc',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderBottomColor: '#888888',
            },
          }}
        >
          <MenuItem value={SortOption.ITEM_NAME} sx={{ fontSize: '0.75rem' }}>Item Name</MenuItem>
          <MenuItem value={SortOption.HIGHER_PRICE} sx={{ fontSize: '0.75rem' }}>Higher Price</MenuItem>
          <MenuItem value={SortOption.LOWER_PRICE} sx={{ fontSize: '0.75rem' }}>Lower Price</MenuItem>
        </Select>
      </Stack>
    </Box>
  );
};

export default SearchAndFilters
