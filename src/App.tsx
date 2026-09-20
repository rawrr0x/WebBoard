import { useState } from 'react';
import './App.css'
import { useAuth } from './hooks/useAuth';
import Modal from './components/Modal/Modal';
import LoginForm from './components/LoginForm/LoginForm';

const App = () => {
  const { session } = useAuth();

  const [modal, setModal] = useState(false);

  return (
    <>
    <h1>{session?.board ?? 'Real-Time Board'}</h1>
    { modal && <Modal onClose={() => setModal(false)}><LoginForm onLogin={() => setModal(false)}/></Modal> }
    <button onClick={() => setModal(true)}>Open</button>
    </>
  );
};

export default App;
