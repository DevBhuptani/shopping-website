import { cookieKeys } from '@/utils/constants/constants';
import { getDecryptedCookie } from '@/utils/functions/commonFunctions';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: getDecryptedCookie(cookieKeys.cookieUser) || {
    email: '',
    name: '',
    userId: '',
    role: '',
    token: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoginData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserLoginData } = userSlice.actions;

export default userSlice.reducer;
