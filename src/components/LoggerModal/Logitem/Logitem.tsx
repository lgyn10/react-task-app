import React, { FC } from 'react';
import { ILogItem } from '../../../types';
import { BsFillPersonFill } from 'react-icons/bs';

type TLogItemProps = {
  logItem: ILogItem;
};

const Logitem: FC<TLogItemProps> = ({ logItem }) => {
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
    <div>
      <div>
        <BsFillPersonFill />
        {logItem.logAuthor}
      </div>
      <div>{logItem.logMessage}</div>
      <div>{showOffsetTime}</div>
    </div>
  );
};

export default Logitem;
