import './App.css'
import Modal from './components/Modal/Modal';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { session } = useAuth();

  return (
    <>
    {
      session
      ? <h1>Board</h1>
      : <Modal><button>Need auth</button></Modal>
    }
    </>
  );
};

export default App;
