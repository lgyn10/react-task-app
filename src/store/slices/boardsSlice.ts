import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBoard } from '../../types';

type TBoardState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

type TAddBoardAction = {
  board: IBoard;
};

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫 번째 게시물',
      lists: [
        {
          listId: 'list-0',
          listName: 'List 1',
          tasks: [
            {
              taskId: 'task-0',
              taskName: 'Task 1',
              taskDescription: 'Description',
              taskOwner: 'lgyn10',
            },
            {
              taskId: 'task-1',
              taskName: 'Task 2',
              taskDescription: 'Description',
              taskOwner: 'lgyn10',
            },
          ],
        },
        {
          listId: 'list-1',
          listName: 'List 2',
          tasks: [
            {
              taskId: 'task-2',
              taskName: 'Task 3',
              taskDescription: 'Description',
              taskOwner: 'lgyn10',
            },
            {
              taskId: 'task-3',
              taskName: 'Task 4',
              taskDescription: 'Description',
              taskOwner: 'lgyn10',
            },
          ],
        },
      ],
    },
  ],
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    // 여기서 선언하는 함수는 Actions이다.
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board);
      // redux 툴킷 내부에서 immer라는 불변성 관리 라이브러리를 사용하기 때문에 push 메서드 사용이 안전
    },
  },
});
export const { addBoard } = boardSlice.actions;
export const boardsReducer = boardSlice.reducer;
