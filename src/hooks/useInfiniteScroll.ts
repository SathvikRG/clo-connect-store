import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../store';
import { fetchStoreItems } from '../store/slices/storeSlice';

export const useInfiniteScroll = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ui } = useSelector((state: RootState) => state.store);
  
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && !ui.isLoading && ui.hasMore) {
      dispatch(fetchStoreItems({ 
        page: ui.currentPage, 
        limit: 20 
      }));
    }
  }, [inView, ui.isLoading, ui.hasMore, ui.currentPage, dispatch]);

  return { ref, isLoading: ui.isLoading, hasMore: ui.hasMore };
};