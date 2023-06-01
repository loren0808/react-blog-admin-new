import { createSlice } from '@reduxjs/toolkit';

interface TagsState {
  tags: any[];
  needUpdate: boolean;
}
const initialState: TagsState = {
  tags: [],
  needUpdate: true
};
export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    receiveAllTags: (state, { payload }) => {
      state.tags = payload;
    },
    updateTags: (state, { payload }) => {
      state.needUpdate = payload;
    }
  }
});

export const { receiveAllTags, updateTags } = tagsSlice.actions;
export default tagsSlice.reducer;
