import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TState = {
  filters: {
    connectorTypes: string[];
    connectorStatuses: string[];
  };
};

const initialState: TState = {
  filters: {
    connectorTypes: [],
    connectorStatuses: [],
  },
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<TState['filters']>) {
      state.filters = action.payload;
    },
  },
});

export const { setFilters } = mapSlice.actions;
export default mapSlice.reducer;
