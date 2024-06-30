import clsx from 'clsx';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React, { FC, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { GoSignIn, GoSignOut } from 'react-icons/go';
import { app } from '../../firebase';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { setUser } from '../../store/slices/userSlice';
import { addButton, addSection, boardItem, boardItemActive, container, title } from './BoardList.css';
import SideForm from './SideForm/SideForm';

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TBoardListProps> = ({ activeBoardId, setActiveBoardId }) => {
  // 구조분해할당
  const { boardArray } = useTypedSelector((state) => state.boards);
  // 대안 : const boards = useTypedSelector((state) => state.boards.boardArray);
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
    // setTimeout(() => {
    //   inputRef.current?.focus();
    // }, 0);
  };

  // 로그인 관련
  const user = useTypedSelector((state) => state.user.email);
  const [isLogin, setIsLogin] = useState(user);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useTypedDispatch();
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log(userCredential);
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
          })
        );
        setIsLogin(userCredential.user.email!);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleLogout = () => {};

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
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}
        {isLogin ? (
          <GoSignOut className={addButton} onClick={handleLogout} />
        ) : (
          <GoSignIn className={addButton} onClick={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default BoardList;
