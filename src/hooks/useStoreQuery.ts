import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { storeApi } from '../services/api';
import { type FetchStoreItemsParams } from '../types/index';

// React Query hooks for API state management
export const useStoreItems = (params?: FetchStoreItemsParams) => {
  return useQuery({
    queryKey: ['storeItems', params],
    queryFn: () => storeApi.fetchStoreItems(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Infinite query for pagination
export const useInfiniteStoreItems = (limit: number = 20) => {
  return useInfiniteQuery({
    queryKey: ['storeItems', 'infinite'],
    queryFn: ({ pageParam = 1 }) => 
      storeApi.fetchStoreItemsPaginated(pageParam, limit),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};
