import type { Task, TaskStatus } from '../../../../shared/types/board';
import TaskCard from '../TaskCard/TaskCard';
import cl from './Column.module.css';

interface ColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  boardId: string;
}

const Column = ({ title, status, tasks, boardId }: ColumnProps) => {
  const filteredTasks = tasks.filter((t) => t.status === status);

  return (
    <div className={cl.column}>
      <h3 className={cl.title}>{title} ({filteredTasks.length})</h3>
      <div className={cl.taskList}>
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} boardId={boardId} />
        ))}
      </div>
    </div>
  );
};

export default Column;
