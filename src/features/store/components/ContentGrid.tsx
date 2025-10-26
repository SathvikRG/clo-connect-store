import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  CircularProgress,
  Skeleton,
  Stack,
} from '@mui/material'

import { type StoreItem, PricingOption } from '../../../types/index'
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll'

interface ContentGridProps {
  items: StoreItem[];
  isLoading: boolean;
}

const ContentGrid: React.FC<ContentGridProps> = ({ items, isLoading }) => {
  const { ref, isLoading: infiniteLoading, hasMore } = useInfiniteScroll();
  
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
      lg: 'repeat(5, 1fr)',
      xl: 'repeat(5, 1fr)',
    },
    gap: 3,
    justifyItems: 'center',
  };
  
  const getPricingDisplay = (item: StoreItem) => {
    switch (item.pricingOption) {
      case PricingOption.PAID:
        return `$${item.price.toFixed(2)}`;
      case PricingOption.FREE:
        return 'FREE';
      case PricingOption.VIEW_ONLY:
        return 'View Only'
      default:
        return 'View Only'
    }
  };

  if (isLoading) {
    return (
      <Box sx={gridStyles}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} sx={{ bgcolor: 'background.default', width: '100%', maxWidth: 300 }}>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={32} width={80} />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  return (
    <>
      <Box sx={gridStyles}>
        {items.map((item, index) => (
          <Card 
            key={`${item.id}-${index}`}
            sx={{ 
              bgcolor: 'background.default',
              width: '100%',
              maxWidth: 300,
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
        ))}
      </Box>
      
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
    </>
  );
};

export default ContentGrid
