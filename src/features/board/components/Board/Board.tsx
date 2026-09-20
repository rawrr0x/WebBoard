import { useState } from 'react';
import { useBoardStore } from '../../store/boardStore';
import { useSocket } from '../../hooks/useSocket';
import Column from '../Column/Column';
import TaskForm from '../TaskForm/TaskForm';
import Modal from '../../../../shared/components/Modal/Modal';
import Button from '../../../../shared/components/Button/Button';
import cl from './Board.module.css';

const COLUMNS = [
  { title: 'To Do', status: 'toDo' as const },
  { title: 'In Progress', status: 'inProgress' as const },
  { title: 'In Review', status: 'inReview' as const },
  { title: 'Done', status: 'done' as const },
];

interface BoardProps {
  boardId: string;
  userName: string;
  onLeave: () => void;
}

const Board = ({ boardId, userName, onLeave }: BoardProps) => {
  const tasks = useBoardStore((s) => s.tasks);
  const onlineUsers = useBoardStore((s) => s.onlineUsers);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useSocket(boardId, userName);

  return (
    <div className={cl.board}>
      <header className={cl.header}>
        <h1>Board #{boardId}</h1>
        <div className={cl.users}>
          Online: {onlineUsers.join(', ') || '—'}
        </div>
        <div className={cl.headerActions}>
          <Button onClick={() => setShowTaskForm(true)}>+ Add Task</Button>
          <Button onClick={onLeave}>Leave</Button>
        </div>
      </header>

      <div className={cl.columns}>
        {COLUMNS.map((col) => (
          <Column
            key={col.status}
            title={col.title}
            status={col.status}
            tasks={tasks}
            boardId={boardId}
          />
        ))}
      </div>

      {showTaskForm && (
        <Modal onClose={() => setShowTaskForm(false)}>
          <TaskForm boardId={boardId} onClose={() => setShowTaskForm(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Board;
