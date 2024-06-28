import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBoard, IList, ITask } from '../../types';

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

type TAddListAction = {
  boardId: string;
  list: IList;
};

type TAddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

type TDeleteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};

type TDeleteBoardAction = {
  boardId: string;
};

type TSortAction = {
  boardIdx: number;
  droppableIdStart: string;
  droppableIdEnd: string;
  droppableIndexStart: number;
  droppableIndexEnd: number;
  draggableId: string;
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
    //! Board 관련 액션
    addBoard: (state, { payload }: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board);
      // state.boardArray = [...state.boardArray, payload.board]; // OK
      // redux 툴킷 내부에서 immer라는 불변성 관리 라이브러리를 사용하기 때문에 push 메서드 사용이 안전
    },
    deleteBoard: (state, { payload }: PayloadAction<TDeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter((board) => board.boardId !== payload.boardId);
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
    //! List 관련 액션
    addList: (state, { payload }: PayloadAction<TAddListAction>) => {
      //| lists: board.lists.push(payload.list)?????????????????????????????????????
      // js든, redux toolkit이든 push 메서드의 리턴값은 배열의 새로운 길이
      state.boardArray.map(
        (board) => (board.boardId === payload.boardId ? { ...board, lists: board.lists.push(payload.list) } : board)
        // board.boardId === payload.boardId ? { ...board, lists: [...board.lists, payload.list] } : board
      );
    },
    deleteList: (state, { payload }: PayloadAction<TDeleteListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? { ...board, lists: board.lists.filter((list) => list.listId !== payload.listId) }
          : board
      );
    },
    //! Task 관련 액션
    addTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                //| tasks: list.tasks.push(payload.task)?????????????????????????????
                list.listId === payload.listId ? { ...list, tasks: list.tasks.push(payload.task) } : list
              ),
            }
          : board
      );
    },
    updateTask: (state, { payload }: PayloadAction<TAddTaskAction>) => {
      state.boardArray = state.boardArray.map((board) => {
        return board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) => {
                return list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.map((task) => {
                        return task.taskId === payload.task.taskId ? payload.task : task;
                      }),
                    }
                  : list;
              }),
            }
          : board;
      });
    },
    deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
      state.boardArray = state.boardArray.map((board) => {
        return board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.filter((task) => task.taskId !== payload.taskId),
                    }
                  : list
              ),
            }
          : board;
      });
    },
    //! DragAndDrop 기능 위한 함수
    sort: (state, { payload }: PayloadAction<TSortAction>) => {
      // 1. same list
      if (payload.droppableIdStart === payload.droppableIdEnd) {
        // 맨 뒤에 !를 붙임으로 list는 존재함을 명시 :  non-null assertion operator
        const list = state.boardArray[payload.boardIdx].lists.find((list) => list.listId === payload.droppableIdStart)!;
        // 변경시키는 요소를 배열에서 지워주고, 그 요소를 리턴값으로 받는다.
        const [draggingElement] = list.tasks.splice(payload.droppableIndexStart, 1);
        list.tasks = [
          ...list.tasks.slice(0, payload.droppableIndexEnd),
          draggingElement,
          ...list.tasks.slice(payload.droppableIndexEnd),
        ];
        return;
      }
      // 2. other list
      if (payload.droppableIdStart !== payload.droppableIdEnd) {
        // 옮길 요소를 가지고 있는 리스트
        const startList = state.boardArray[payload.boardIdx].lists.find(
          (list) => list.listId === payload.droppableIdStart
        )!; // ! : non-null assertion operator
        const [draggingElement] = startList.tasks.splice(payload.droppableIndexStart, 1);
        // 옮겨질 요소를 가질 리스트
        const endList = state.boardArray[payload.boardIdx].lists.find(
          (list) => list.listId === payload.droppableIdEnd
        )!; // ! : non-null assertion operator
        endList.tasks = [
          ...endList.tasks.slice(0, payload.droppableIndexEnd),
          draggingElement,
          ...endList.tasks.slice(payload.droppableIndexEnd),
        ];
        return;
      }
    },
  },
});
export const { addBoard, deleteList, setModalActive, addList, addTask, updateTask, deleteTask, deleteBoard, sort } =
  boardSlice.actions;
export const boardsReducer = boardSlice.reducer;
