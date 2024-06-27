import React, { ChangeEvent, useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { deleteTask, setModalActive, updateTask } from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 } from 'uuid';

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
    <>
      <div>
        <div>
          {/* {modalData.task.taskName}와 차이는? */}
          <div>{editingState.task.taskName}</div>

          <FiXCircle onClick={handleCloseButton} />
          <div>제목</div>
          <input type='text' value={modalData.task.taskName} onChange={handleNameChange} />
          <div>설명</div>
          <input type='text' value={modalData.task.taskDescription} onChange={handleDescriptionChange} />
          <div>생성한 사람</div>
          <input type='text' value={modalData.task.taskOwner} onChange={handleAuthorChange} />
          <div>
            <button onClick={handleUpdate}>할 일 수정하기</button>
            <button onClick={handleDelete}>할 일 삭제하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
