import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBoard } from '../../types';

type TBoardState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

type TAddBoardAction = {
  board: IBoard;
};

type TDeleteListAction = {
  boardId: string;
  listId: string;
};

const initialState: TBoardState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-1',
      boardName: '첫 번째 게시물',
      lists: [
        {
          listId: 'list-1',
          listName: '학습 내용',
          tasks: [
            {
              taskId: 'task-1',
              taskName: 'LMS 강의 듣기',
              taskDescription: '데브 코스 강의',
              taskOwner: 'lgyn10',
            },
            {
              taskId: 'task-2',
              taskName: '리액트 스터디 준비',
              taskDescription: '면접 질문 준비',
              taskOwner: 'lgyn10',
            },
          ],
        },
        {
          listId: 'list-2',
          listName: '프로젝트 할 일',
          tasks: [
            {
              taskId: 'task-3',
              taskName: '리드미 작성',
              taskDescription: '기획 반영한 readme.md 작성',
              taskOwner: 'lgyn10',
            },
            {
              taskId: 'task-4',
              taskName: '크롬 API 테스트',
              taskDescription: '북마크 가져오는지 확인',
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
    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? { ...board, lists: board.lists.filter((list) => list.listId !== payload.listId) }
          : board
      );
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
  },
});
export const { addBoard, deleteList, setModalActive } = boardSlice.actions;
export const boardsReducer = boardSlice.reducer;
