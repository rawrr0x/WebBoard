import { useState } from "react";
import Input from "../UI/Input/Input";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../Modal/Modal";

const CreateBoardForm = () => {
    const { login } = useAuth();

    const [name, setName] = useState('');
    const [board, setBoard] = useState('');

    const handleSubmit = () => {
        const trimmedName = name.trim();
        const trimmedBoard = board.trim();

        if (trimmedName === '' || trimmedBoard === '') return;

        login({
            userName: trimmedName,
            board: trimmedBoard,
        });
    };

    return (
        <Modal>
            <Input 
                placeholder="Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input 
                placeholder="Board name..."
                value={board}
                onChange={(e) => setBoard(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                style={{
                    minWidth: '80px',
                    minHeight: '27px',
                    borderRadius: '12px',
                    outline: 'none',
                    border: 'none',
                    backgroundColor: '#fff',
                    color: '#363636ff',
                    boxShadow: '0 0 8px #7b7b7b',
                }}
            >
                Login
            </button>
        </Modal>
    );
};

export default CreateBoardForm;
