import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  token: string;
  refreshToken: string;
}
const initialState: UserState = {
  token: '',
  refreshToken: ''
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    receiveToken: (state, { payload: { token, refreshToken } }) => {
      return { token, refreshToken };
    },
    resetToken: (state) => {
      state.refreshToken = '';
    }
  }
});

export const { receiveToken, resetToken } = userSlice.actions;
export default userSlice.reducer;
