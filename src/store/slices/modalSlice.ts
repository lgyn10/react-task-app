import { createSlice } from '@reduxjs/toolkit';
import { ITask } from '../../types';

type TModalState = {
  boardId: string;
  listId: string;
  task: ITask;
};

const initialState: TModalState = {
  boardId: 'board-0',
  listId: 'list-0',
  task: {
    taskId: 'task-0',
    taskName: 'task 0',
    taskDescription: 'task description',
    taskOwner: 'lgyn10',
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  // reducers 안에는 action을 만들어주는 함수를 적어준다.
  reducers: {
    // 여기서 선언하는 함수는 Actions이다.
  },
});

export const modalReducer = modalSlice.reducer;
