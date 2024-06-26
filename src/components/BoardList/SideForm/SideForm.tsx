import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { icon, input, sideForm } from './SideForm.css';
import { useTypedDispatch } from '../../../hooks/redux';
import { addBoard } from '../../../store/slices/boardsSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';

type TSideFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // inputRef: React.RefObject<HTMLInputElement>;
};

const SideForm: FC<TSideFormProps> = ({ setIsFormOpen }) => {
  const [inputText, setInputText] = useState('');
  const [iconScale, setIconScale] = useState(0);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    setIconScale(1);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleOnBlur = () => {
    setIsFormOpen(false);
  };

  const handleClick = () => {
    if (inputText) {
      dispatch(
        addBoard({
          board: {
            boardId: uuidv4(),
            boardName: inputText,
            lists: [],
          },
        })
      );
      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `게시판 등록 : ${inputText}`,
          logAuthor: 'lgyn10',
          logTimeStamp: String(Date.now()),
        })
      );
    }
  };

  return (
    <div className={sideForm}>
      <input
        className={input}
        autoFocus
        type='text'
        placeholder='새로운 게시판 등록하기'
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      <FiCheckCircle
        className={icon}
        style={{
          transform: `scale(${iconScale})`,
          transition: `transtorm 0,2 ease-in-out`,
        }}
        onMouseDown={handleClick}
      />
    </div>
  );
};

export default SideForm;
