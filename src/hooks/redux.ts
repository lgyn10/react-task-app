// useSelector, useDispatch 는 ts에서 hooks로 만들어 사용하는 것이 편하다.

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

// 아래 두 함수는 커스텀 훅..?
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();

// const dispatch = useDispatch();
// const logger = useTypedSelector((state) => state.logger);
// 타입스크립트가 추론하지 못할 경우, 개발자가 직접 타입을 지정해야 한다. (annotate)

// store 객체를 이용해서 타입을 가져올 수 있다.

// 제네릭 관련
// interface Obj<T> {
//   name: T;
// }

// interface State {
//   state: {
//     data: string;
//     loding: boolean;
//   };
// }

// const obj: Obj<State> = {
//   name: {
//     state: {
//       data: 'data',
//       loding: true,
//     },
//   },
// };
