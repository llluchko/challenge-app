import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TState = {
  pinColor: string;
};

const initialState: TState = {
  pinColor: 'blue', // Default color
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPinColor: (state, action: PayloadAction<string>) => {
      state.pinColor = action.payload;
      AsyncStorage.setItem('pinColor', action.payload);
    },
    loadPinColor: (state, action: PayloadAction<string>) => {
      state.pinColor = action.payload;
    },
  },
});

export const { setPinColor, loadPinColor } = settingsSlice.actions;
export default settingsSlice.reducer;
