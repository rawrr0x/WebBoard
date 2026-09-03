import cl from './Task.module.css';

interface TaskProps {
    title: string,
    description: string,
    createdAt: string,
}

const Task = ({ title, description, createdAt }: TaskProps) => {
    return (
        <div className={cl.task}>
            <div style={{ color: 'black', fontWeight: 'bold' }} className={cl.task_block}>{title}</div>
            <div style={{ border: '1px solid #717171', padding: '5px' }} className={cl.task_block}>{description}</div>
            <div style={{ padding: '5px' }} className={cl.task_block}>{createdAt}</div>
        </div>
    );
};

export default Task;
