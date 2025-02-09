import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../store/store';
import { loadPinColor } from '../store/slices/settingsSlice';

import React, { ReactNode } from 'react';

type LoadingContainerProps = {
  children: ReactNode;
};

const LoadingContainer = ({ children }: LoadingContainerProps) => {
  // Load the pin color from AsyncStorage
  // Possible improvement: Use redux-persist to automatically load the state from AsyncStorage
  AsyncStorage.getItem('pinColor').then((color) => {
    if (color) {
      store.dispatch(loadPinColor(color));
    }
  });
  return <>{children}</>;
};

export default LoadingContainer;
