import React, { ChangeEvent, FC, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

type TSideFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement>;
};

const SideForm: FC<TSideFormProps> = ({ setIsFormOpen, inputRef }) => {
  const [inputText, setInputText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleOnBlur = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type='text'
        placeholder='새로운 게시판 등록하기'
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      <FiCheckCircle onClick={() => setIsFormOpen((prev) => !prev)} />
    </div>
  );
};

export default SideForm;
