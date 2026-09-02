import './App.css'
import Board from './components/Board/Board';
import CreateBoardForm from './components/CreateBoardForm/CreateBoardForm';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { session } = useAuth();

  return (
    <>
    <h1>{session?.board ?? 'Board'}</h1>
    {
      session
      ? <Board />
      : <CreateBoardForm />
    }
    </>
  );
};

export default App;
