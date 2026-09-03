import { useState } from 'react';
import Input from '../UI/Input/Input';
import cl from './CreateTaskForm.module.css';
import Button from '../UI/Button/Button';

const CreateTaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = () => {
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (trimmedTitle === '' || trimmedDescription === '') return;

        // emit task create

        setTitle('');
        setDescription('');
    };

    return (
        <div className={cl.create_task_form}>
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
