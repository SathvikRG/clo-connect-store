import { configureStore } from '@reduxjs/toolkit'
import storeReducer from './slices/storeSlice'
import filterReducer from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    store: storeReducer,
    filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['store/fetchStoreItems/fulfilled'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
