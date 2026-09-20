import type { Task, TaskStatus } from '../../../../shared/types/board';
import { socket } from '../../../../shared/lib/socket';
import cl from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  boardId: string;
}

const STATUSES: { value: TaskStatus; label: string }[] = [
  { value: 'toDo', label: 'To Do' },
  { value: 'inProgress', label: 'In Progress' },
  { value: 'inReview', label: 'In Review' },
  { value: 'done', label: 'Done' },
];

const TaskCard = ({ task, boardId }: TaskCardProps) => {
  const handleStatusChange = (newStatus: TaskStatus) => {
    socket.emit('task_update', { boardId, task: { ...task, status: newStatus } });
  };

  const handleDelete = () => {
    socket.emit('task_delete', { boardId, taskId: task.id });
  };

  return (
    <div className={cl.card}>
      <h4 className={cl.title}>{task.title}</h4>
      {task.description && <p className={cl.description}>{task.description}</p>}
      <div className={cl.actions}>
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
          className={cl.select}
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <button className={cl.deleteBtn} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
