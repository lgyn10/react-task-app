import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ILogItem } from '../../types';

type loggerState = {
  logArray: ILogItem[];
};

const initialState: loggerState = {
  logArray: [],
};

const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    // 여기서 선언하는 함수는 Actions이다.
    addLog: (state, { payload }: PayloadAction<ILogItem>) => {
      state.logArray.push(payload);
    },
  },
});
export const { addLog } = loggerSlice.actions;
export const loggerReducer = loggerSlice.reducer;
