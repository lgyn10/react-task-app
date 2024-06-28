import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { container, description, title } from './Task.css';

type TTaskProps = {
  taskId: string;
  taskName: string;
  taskDescription: string;
  boardId: string;
  index: number;
};

const Task: FC<TTaskProps> = ({ taskId, taskName, taskDescription, boardId, index }) => {
  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={container}>
          <div className={title}>{taskName}</div>
          <div className={description}>{taskDescription}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
