import { createSlice } from '@reduxjs/toolkit';

interface SeriesState {
  series: any[];
  needUpdate: boolean;
}
const initialState: SeriesState = {
  series: [],
  needUpdate: true
};
export const seriesSlice = createSlice({
  name: 'series',
  initialState,
  reducers: {
    receiveAllSeries: (state, { payload }) => {
      state.series = payload;
    },
    updateSeries: (state, { payload }) => {
      state.needUpdate = payload;
    }
  }
});

export const { receiveAllSeries,updateSeries } = seriesSlice.actions;
export default seriesSlice.reducer;
