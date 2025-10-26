import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Skeleton,
  Stack,
} from '@mui/material'

import { type StoreItem, PricingOption } from '../types/index'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'

interface ContentGridProps {
  items: StoreItem[];
  isLoading: boolean;
}

const ContentGrid: React.FC<ContentGridProps> = ({ items, isLoading }) => {
  const { ref, isLoading: infiniteLoading, hasMore } = useInfiniteScroll();
  
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',           // Below 480px: 1 column
      sm: 'repeat(2, 1fr)', // Below 768px: 2 columns
      md: 'repeat(3, 1fr)', // Below 1200px: 3 columns
      lg: 'repeat(4, 1fr)', // Default: 4 columns
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
          <Card key={index} sx={{ bgcolor: 'transparent', width: '100%', maxWidth: 300, aspectRatio: '3/4', boxShadow: 'none' }}>
            <Skeleton variant="rectangular" sx={{ height: '75%' }} />
            <CardContent sx={{ height: '25%', p: 2, bgcolor: 'transparent' }}>
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={16} sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Skeleton variant="rectangular" height={24} width={60} />
              </Box>
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
              bgcolor: 'transparent',
              width: '100%',
              maxWidth: 400,
              aspectRatio: '3/4',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 2,
              },
              transition: 'box-shadow 0.3s',
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: '75%', objectFit: 'cover', bgcolor: 'transparent' }}
              image={item.imagePath}
              alt={item.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
              }}
            />
            <CardContent sx={{ height: '25%', bgcolor: '#1a1a1a', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="h6" color="text.primary" noWrap sx={{ fontSize: '0.9rem', fontWeight: 'normal', flex: 1 }}>
                  {item.title}
                </Typography>
                <Typography 
                  variant="h6" 
                  color="text.primary" 
                  sx={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold',
                    ml: 1,
                  }}
                >
                  {getPricingDisplay(item)}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" noWrap sx={{ fontSize: '0.8rem' }}>
                {item.creator}
              </Typography>
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
