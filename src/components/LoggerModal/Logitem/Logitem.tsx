import { FC } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { ILogItem } from '../../../types';
import { author, date, logItemWrap, message } from './LogItem.css';

type TLogItemProps = {
  logItem: ILogItem;
};

const LogItem: FC<TLogItemProps> = ({ logItem }) => {
  const timeOffset = new Date(Date.now() - Number(logItem.logTimeStamp));
  console.log(timeOffset);
  console.log(timeOffset.getMinutes());
  console.log(timeOffset.getSeconds());

  const showOffsetTime = `
  ${timeOffset.getMinutes() > 0 ? `${timeOffset.getMinutes()}m` : ``}
  ${timeOffset.getSeconds() > 0 ? `${timeOffset.getSeconds()}s ago` : ``}
  ${timeOffset.getSeconds() === 0 ? `just now` : ''}
  `;

  return (
    <div className={logItemWrap}>
      <div className={author}>
        <BsFillPersonFill />
        {logItem.logAuthor}
      </div>
      <div className={message}>{logItem.logMessage}</div>
      <div className={date}>{showOffsetTime}</div>
    </div>
  );
};

export default LogItem;
