import { useCallback, useState } from 'react';
import { useBoard } from '../../hooks/useBoard';
import cl from './Board.module.css';
import Button from '../UI/Button/Button';
import Modal from '../Modal/Modal';
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm';
import Task from '../Task/Task';

const Board = () => {
    const { tasks, onlineUsers } = useBoard();

    {/* rework */}
    const [createModal, setCreateModal] = useState(false);

    const close = useCallback(() => setCreateModal(false), []);
    {/* rework */}

    return (
        <div className={cl.board}>
            {/* rework */}
            { createModal && <Modal onClose={close}><CreateTaskForm /></Modal>}
            {/* rework */}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                <Button onClick={() => setCreateModal(true)}>Create task</Button>
                <h2 style={{ color: 'black' }}>Online: {onlineUsers.length}</h2>
            </div>

            <div className={cl.status_block}>
                <div className={cl.tasks_block}>
                    <div className="title">To-Do</div>
                    <div className={cl.tasks_block_body}>
                        {
                            tasks.filter(task => task.status === 'toDo').map(task => (
                                <Task title={task.title} description={task.description} createdAt={task.createdAt} />
                            ))
                        }
                    </div>
                </div>
                <div className={cl.tasks_block}>
                    <div className="title">In Progress</div>
                    <div className={cl.tasks_block_body}>
                        {
                            tasks.filter(task => task.status === 'inProgress').map(task => (
                                <Task title={task.title} description={task.description} createdAt={task.createdAt} />
                            ))
                        }
                    </div>
                </div>
                <div className={cl.tasks_block}>
                    <div className="title">In Review</div>
                    <div className={cl.tasks_block_body}>
                        {
                            tasks.filter(task => task.status === 'inReview').map(task => (
                                <Task title={task.title} description={task.description} createdAt={task.createdAt} />
                            ))
                        }
                    </div>
                </div>
                <div className={cl.tasks_block}>
                    <div className="title">Done</div>
                    <div className={cl.tasks_block_body}>
                        {
                            tasks.filter(task => task.status === 'done').map(task => (
                                <Task title={task.title} description={task.description} createdAt={task.createdAt} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Board;
