import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer/reducer';

const store = configureStore({
  reducer: reducer, // reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// useAppSelector 또는 useTypedSelector으로 명시

// store.getState();
// 위 코드를 사용하면 store의 데이터를 가져올 수 있다.

export default store;
