import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { type AppDispatch, type RootState } from '../../../store';
import { togglePricingOption, resetFilters, setKeyword, setSortBy, setPriceRange } from '../../../store/slices/filterSlice';
import { PricingOption, SortOption } from '../../../types/index';

const SearchAndFilters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pricingOptions, keyword, sortBy, priceRange } = useSelector((state: RootState) => state.filters);

  const handlePricingToggle = (option: PricingOption) => {
    dispatch(togglePricingOption(option));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as SortOption));
  };

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    const value = newValue as number;
    const newRange: [number, number] = [priceRange[0], value];
    dispatch(setPriceRange(newRange));
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: 2,
        p: 3,
      }}
    >
      <Typography variant="h6" color="text.primary" gutterBottom>
        Find the Items you're looking for
      </Typography>
      
      {/* Search Bar */}
      <Stack spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Find the Items you're looking for"
          value={keyword}
          onChange={handleKeywordChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="caption" color="primary">
            Keyword search
          </Typography>
        </Box>
      </Stack>

      {/* Contents Filter */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: 'primary.main',
              borderRadius: '50%',
            }}
          />
          <Typography variant="subtitle1" color="text.primary">
            Contents Filter
          </Typography>
        </Stack>
        
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
              Pricing Option
            </Typography>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pricingOptions.includes(PricingOption.PAID)}
                    onChange={() => handlePricingToggle(PricingOption.PAID)}
                  />
                }
                label="Paid"
                sx={{ color: 'text.primary' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pricingOptions.includes(PricingOption.FREE)}
                    onChange={() => handlePricingToggle(PricingOption.FREE)}
                  />
                }
                label="Free"
                sx={{ color: 'text.primary' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pricingOptions.includes(PricingOption.VIEW_ONLY)}
                    onChange={() => handlePricingToggle(PricingOption.VIEW_ONLY)}
                  />
                }
                label="View Only"
                sx={{ color: 'text.primary' }}
              />
            </Stack>
          </Box>
          
          {/* Pricing Slider - Only show when Paid option is selected */}
          {pricingOptions.includes(PricingOption.PAID) && (
            <Box>
              <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </Typography>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={priceRange[1]}
                  onChange={handlePriceRangeChange}
                  min={0}
                  max={999}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `$${value}`}
                  sx={{
                    color: 'primary.main',
                  }}
                />
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    $0
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    $999+
                  </Typography>
                </Stack>
              </Box>
            </Box>
          )}
          
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" color="primary">
                Sort by:
              </Typography>
              <Select
                value={sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
                size="small"
                sx={{ minWidth: 120 }}
              >
                <MenuItem value={SortOption.ITEM_NAME}>Item Name</MenuItem>
                <MenuItem value={SortOption.HIGHER_PRICE}>Higher Price</MenuItem>
                <MenuItem value={SortOption.LOWER_PRICE}>Lower Price</MenuItem>
              </Select>
            </Stack>
            <Button
              onClick={handleReset}
              variant="text"
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              RESET
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SearchAndFilters;
