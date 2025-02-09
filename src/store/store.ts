import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import mapReducer from './slices/mapSlice';

export const store = configureStore({
  reducer: {
    map: mapReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
