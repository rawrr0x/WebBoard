import { useState, type FormEvent } from 'react';
import { socket } from '../../../../shared/lib/socket';
import type { TaskStatus } from '../../../../shared/types/board';
import Button from '../../../../shared/components/Button/Button';
import Input from '../../../../shared/components/Input/Input';
import cl from './TaskForm.module.css';

interface TaskFormProps {
  boardId: string;
  onClose?: () => void;
}

const TaskForm = ({ boardId, onClose }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('toDo');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    socket.emit('task_create', {
      boardId,
      task: { title: title.trim(), description: description.trim(), status },
    });

    setTitle('');
    setDescription('');
    setStatus('toDo');
    onClose?.();
  };

  return (
    <form className={cl.form} onSubmit={handleSubmit}>
      <h3 className={cl.title}>New Task</h3>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        className={cl.select}
      >
        <option value="toDo">To Do</option>
        <option value="inProgress">In Progress</option>
        <option value="inReview">In Review</option>
        <option value="done">Done</option>
      </select>
      <Button type="submit">Create</Button>
    </form>
  );
};

export default TaskForm;
