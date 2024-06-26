import React, { FC, useState } from 'react';
import { useTypedSelector } from '../../hooks/redux';
import SideForm from './SideForm/SideForm';
import { FiPlusCircle } from 'react-icons/fi';
import { addButton, addSection, boardItem, boardItemActive, container, title } from './BoardList.css';
import clsx from 'clsx';

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TBoardListProps> = ({ activeBoardId, setActiveBoardId }) => {
  // 구조분해할당
  const { boardArray } = useTypedSelector((state) => state.boards);
  // 대안 : const boards = useTypedSelector((state) => state.boards.boardArray);

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className={container}>
      <div className={title}>게시판:</div>
      {boardArray.map((board, idx) => {
        return (
          <div
            key={board.boardId}
            onClick={() => setActiveBoardId(boardArray[idx].boardId)}
            className={clsx(
              {
                [boardItemActive]: boardArray.findIndex((b) => b.boardId === activeBoardId) === idx,
              },
              {
                [boardItem]: boardArray.findIndex((b) => b.boardId === activeBoardId) !== idx,
              }
            )}
          >
            <div>{board.boardName}</div>
          </div>
        );
      })}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={() => setIsFormOpen(!isFormOpen)} />
        )}
      </div>
    </div>
  );
};

export default BoardList;
