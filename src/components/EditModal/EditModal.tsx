import React, { ChangeEvent, useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { deleteTask, setModalActive, updateTask } from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 } from 'uuid';
import {
  buttons,
  header,
  input,
  modalWindow,
  title,
  wrapper,
  updateButton,
  deleteButton,
  modalBackdrop,
  modalBackdropWrapper,
  closeButton,
} from './EditModal.css';

const EditModal = () => {
  const editingState = useTypedSelector((state) => state.modal);
  const [modalData, setModalData] = useState(editingState);

  const dispatch = useTypedDispatch();

  const handleCloseButton = () => {
    dispatch(setModalActive(false));
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModalData({ ...modalData, task: { ...modalData.task, taskName: e.target.value } });
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModalData({ ...modalData, task: { ...modalData.task, taskDescription: e.target.value } });
  };
  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModalData({ ...modalData, task: { ...modalData.task, taskOwner: e.target.value } });
  };
  const handleUpdate = () => {
    dispatch(
      updateTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        task: modalData.task,
      })
    );
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `할일 수정하기 : ${editingState.task.taskName}`,
        logAuthor: 'lgyn10',
        logTimeStamp: String(Date.now()),
      })
    );
    dispatch(setModalActive(false));
  };
  const handleDelete = () => {
    dispatch(
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: modalData.task.taskId,
      })
    );
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `할일 삭제하기 : ${editingState.task.taskName}`,
        logAuthor: 'lgyn10',
        logTimeStamp: String(Date.now()),
      })
    );
    dispatch(setModalActive(false));
  };

  return (
    <div className={wrapper}>
      <div className={modalBackdropWrapper}>
        <div className={modalBackdrop}></div>
        <div className={modalWindow}>
          <div className={header}>
            <div className={title}>{editingState.task.taskName}</div>
            <FiXCircle className={closeButton} onClick={handleCloseButton} />
          </div>
          <div className={title}>제목</div>
          <input className={input} type='text' value={modalData.task.taskName} onChange={handleNameChange} />
          <div className={title}>설명</div>
          <input
            className={input}
            type='text'
            value={modalData.task.taskDescription}
            onChange={handleDescriptionChange}
          />
          <div className={title}>생성한 사람</div>
          <input className={input} type='text' value={modalData.task.taskOwner} onChange={handleAuthorChange} />
          <div className={buttons}>
            <button className={updateButton} onClick={handleUpdate}>
              할 일 수정하기
            </button>
            <button className={deleteButton} onClick={handleDelete}>
              할 일 삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
