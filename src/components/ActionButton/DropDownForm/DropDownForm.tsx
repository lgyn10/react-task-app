import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { useTypedDispatch } from '../../../hooks/redux';
import { addList, addTask } from '../../../store/slices/boardsSlice';
import { v4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';
import { button, buttons, close, input, listForm, taskForm } from './DropDownForm.css';

type TDropButtonProps = {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  // setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  boardId: string;
  listId: string;
  list?: boolean;
};

const DropDownForm: FC<TDropButtonProps> = ({ setIsFormOpen, list, boardId, listId }) => {
  const [text, setText] = useState('');
  const dispatch = useTypedDispatch();

  const FormPlaceHolder = list ? '리스트의 제목을 입력하세요.' : '할 일의 제목을 입력하세요.';
  const buttonTitle = list ? '리스트 추가하기' : '할 일 추가하기';

  const handleTextChagne = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleButtonClick = () => {
    if (text) {
      if (list) {
        dispatch(addList({ boardId, list: { listId: v4(), listName: text, tasks: [] } }));
        dispatch(
          addLog({
            logId: v4(),
            logMessage: `리스트 생성하기 : ${text}`,
            logAuthor: 'lgyn10',
            logTimeStamp: String(Date.now()),
          })
        );
      } else {
        dispatch(
          addTask({
            boardId,
            listId,
            task: {
              taskId: v4(),
              taskName: text,
              taskDescription: '',
              taskOwner: 'lgyn10',
            },
          })
        );
        dispatch(
          addLog({
            logId: v4(),
            logMessage: `할 일 생성하기 : ${text}`,
            logAuthor: 'lgyn10',
            logTimeStamp: String(Date.now()),
          })
        );
      }
    }
  };

  return (
    <div className={list ? listForm : taskForm}>
      <textarea
        className={input}
        value={text}
        autoFocus
        placeholder={FormPlaceHolder}
        onChange={handleTextChagne}
        onBlur={() => setIsFormOpen(false)}
      />
      <div className={buttons}>
        <button className={button} onMouseDown={handleButtonClick}>
          {buttonTitle}
        </button>
        <FiXCircle className={close} />
      </div>
    </div>
  );
};

export default DropDownForm;
