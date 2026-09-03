import { useState } from 'react';
import Input from '../UI/Input/Input';
import cl from './CreateTaskForm.module.css';
import Button from '../UI/Button/Button';
import { useBoard } from '../../hooks/useBoard';

const CreateTaskForm = () => {
    const { sendTask } = useBoard();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = () => {
        sendTask(title, description);

        setTitle('');
        setDescription('');
    };

    return (
        <div className={cl.task_form}>
            <Input 
                placeholder='Title...'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Input 
                placeholder='Description...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={handleCreate}>Create</Button>
        </div>
    );
};

export default CreateTaskForm;
