import React, { useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { setModalActive } from '../../store/slices/boardsSlice';

const EditModal = () => {
  const editingState = useTypedSelector((state) => state.modal);
  const [modalData, setModalData] = useState(editingState);

  const dispatch = useTypedDispatch();

  const handleCloseButton = () => {
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
          <input type='text' value={modalData.task.taskName} />
          <div>설명</div>
          <input type='text' value={modalData.task.taskDescription} />
          <div>생성한 사람</div>
          <input type='text' value={modalData.task.taskOwner} />
          <div>
            <button>할 일 수정하기</button>
            <button>할 일 삭제하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
