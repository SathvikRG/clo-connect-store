import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Skeleton,
  Stack,
} from '@mui/material';
import { type StoreItem } from '../../../types/index';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';

interface ContentGridProps {
  items: StoreItem[];
  isLoading: boolean;
}

const ContentGrid: React.FC<ContentGridProps> = ({ items, isLoading }) => {
  const { ref, isLoading: infiniteLoading, hasMore } = useInfiniteScroll();
  
  const getPricingDisplay = (item: StoreItem) => {
    switch (item.pricingOption) {
      case 0: // PAID
        return `$${item.price.toFixed(2)}`;
      case 1: // FREE
        return 'FREE';
      case 2: // VIEW_ONLY
        return 'View Only';
      default:
        return 'View Only';
    }
  };

  if (isLoading) {
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
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: 'primary.main',
              borderRadius: '50%',
            }}
          />
          <Typography variant="h6" color="text.primary">
            Contents List
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ bgcolor: 'background.default' }}>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
                  <Skeleton variant="rectangular" height={32} width={80} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

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
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            bgcolor: 'primary.main',
            borderRadius: '50%',
          }}
        />
        <Typography variant="h6" color="text.primary">
          Contents List
        </Typography>
      </Stack>
      
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={`${item.id}-${index}`}>
            <Card 
              sx={{ 
                bgcolor: 'background.default',
                '&:hover': {
                  boxShadow: 4,
                },
                transition: 'box-shadow 0.3s',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.imagePath}
                alt={item.title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
              <CardContent>
                <Typography variant="h6" color="text.primary" noWrap gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 2 }}>
                  {item.creator}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Chip
                    label={getPricingDisplay(item)}
                    size="small"
                    sx={{
                      bgcolor: 'grey.600',
                      color: 'white',
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <Box ref={ref} sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          {infiniteLoading ? (
            <Stack direction="row" alignItems="center" spacing={2}>
              <CircularProgress size={24} color="primary" />
              <Typography variant="body2" color="text.secondary">
                Loading more items...
              </Typography>
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Scroll down to load more
            </Typography>
          )}
        </Box>
      )}
      
      {/* End of results */}
      {!hasMore && items.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            No more items to load
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ContentGrid;
