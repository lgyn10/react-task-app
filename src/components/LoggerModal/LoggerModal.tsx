import React, { FC } from 'react';
import { useTypedSelector } from '../../hooks/redux';
import { FiXCircle } from 'react-icons/fi';
import Logitem from './Logitem/Logitem';
import { body, closeButton, header, modalWindow, title, wrapper } from './LoggerModal.css';

type TLoggerModalProps = {
  setIsLoggerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoggerModal: FC<TLoggerModalProps> = ({ setIsLoggerOpen }) => {
  const logs = useTypedSelector((state) => state.logger.logArray);

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>활동 기록</div>
          <FiXCircle className={closeButton} onClick={() => setIsLoggerOpen(false)} />
        </div>
        <div className={body}>
          {logs.map((log) => {
            return <Logitem key={log.logId} logItem={log} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default LoggerModal;
