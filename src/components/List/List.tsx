import React, { FC } from 'react';
import { IList, ITask } from '../../types';
import { GrSubtract } from 'react-icons/gr';
import Task from '../Task/Task';
import ActionButton from '../ActionButton/ActionButton';
import { useTypedDispatch } from '../../hooks/redux';
import { deleteList, setModalActive } from '../../store/slices/boardsSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../../store/slices/loggerSlice';
import { setModalData } from '../../store/slices/modalSlice';
import { deleteButton, header, listName, listWrapper } from './List.css';

type TListProps = {
  list: IList;
  boardId: string;
};

const List: FC<TListProps> = ({ list, boardId }) => {
  const dispatch = useTypedDispatch();

  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `리스트 삭제하기 : ${list.listName}`,
        logAuthor: 'lgyn10',
        logTimeStamp: String(Date.now()),
      })
    );
  };
  const handleTaskChange = (boardId: string, listId: string, taskId: string, task: ITask) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  return (
    <div className={listWrapper}>
      <div className={header}>
        <div className={listName}>{list.listName}</div>
        <GrSubtract className={deleteButton} onClick={() => handleListDelete(list.listId)} />
      </div>
      {list.tasks.map((task, idx) => (
        <div key={task.taskId} onClick={() => handleTaskChange(boardId, list.listId, task.taskId, task)}>
          <Task taskName={task.taskName} taskDescription={task.taskDescription} boardId={boardId} index={idx} />
        </div>
      ))}
      {/* 새로운 일 등록 버튼 */}
      <ActionButton boardId={boardId} listId={list.listId} />
    </div>
  );
};

export default List;
