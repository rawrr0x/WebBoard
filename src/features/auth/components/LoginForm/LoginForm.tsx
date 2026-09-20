import { useState, type FormEvent } from 'react';
import { useAuthStore } from '../../store/authStore';
import Button from '../../../../shared/components/Button/Button';
import Input from '../../../../shared/components/Input/Input';
import cl from './LoginForm.module.css';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [boardId, setBoardId] = useState('');
  const login = useAuthStore((s) => s.login);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userName.trim() && boardId.trim()) {
      login(userName.trim(), boardId.trim());
    }
  };

  return (
    <div className={cl.wrapper}>
      <form className={cl.form} onSubmit={handleSubmit}>
        <h2 className={cl.title}>Join Board</h2>
        <Input
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          placeholder="Board ID"
          value={boardId}
          onChange={(e) => setBoardId(e.target.value)}
        />
        <Button type="submit">Enter</Button>
      </form>
    </div>
  );
};

export default LoginForm;
