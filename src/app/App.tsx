import { useAuthStore, LoginForm } from '../features/auth';
import { Board } from '../features/board';

const App = () => {
  const userName = useAuthStore((s) => s.userName);
  const boardId = useAuthStore((s) => s.boardId);
  const logout = useAuthStore((s) => s.logout);

  if (!userName || !boardId) {
    return <LoginForm />;
  }

  return <Board boardId={boardId} userName={userName} onLeave={logout} />;
};

export default App;
