import { useState } from "react";
import Input from "../UI/Input/Input";

const CreateBoardForm = () => {

    const [name, setName] = useState('');
    const [board, setBoard] = useState('');

    const handleSubmit = () => {
        const trimmedName = name.trim();
        const trimmedBoard = board.trim();

        if (trimmedName === '' || trimmedBoard === '') return;

        //rework
    };

    return (
        <div>
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
            <button onClick={handleSubmit}>Login</button>
        </div>
    );
};

export default CreateBoardForm;
