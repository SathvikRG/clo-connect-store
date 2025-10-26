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
    const value = newValue as number[];
    const [min, max] = value;
    const newRange: [number, number] = [Math.min(min, max), Math.max(min, max)];
    dispatch(setPriceRange(newRange));
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: '#666666',
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
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'primary' }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      {/* Filter Section */}
      <Box sx={{ mb: 3 }}>

        <Stack spacing={2}>
          <Box>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" color="text.primary">
                    Pricing Option
                  </Typography>
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
                  {/* Inline Price Slider */}
                  {pricingOptions.includes(PricingOption.PAID) && (
                    <Box sx={{ minWidth: 200 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="caption" color="text.secondary">
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
                            height: 4,
                            flex: 1,
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          $999
                        </Typography>
                      </Stack>
                    </Box>
                  )}
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
            </Box>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2" color="text.primary">
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
        </Stack>
      </Box>
    </Box>
  );
};

export default SearchAndFilters;
