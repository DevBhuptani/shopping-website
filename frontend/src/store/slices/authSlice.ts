import { cookieKeys } from '@/utils/constants/constants';
import { getDecryptedCookie, removedCookie } from '@/utils/functions/commonFunctions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthSlice {
  isAuth: boolean;
}

const handleCookie = () => {
  const data = getDecryptedCookie(cookieKeys.cookieUser);
  if (data?.token) {
    return true;
  }
  return false;
};

const initialState: AuthSlice = {
  isAuth: handleCookie(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<any>) => {
      state.isAuth = action.payload;
      if (!action.payload) {
				removedCookie(cookieKeys.cookieUser)
			}
    },
  },
});

export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
