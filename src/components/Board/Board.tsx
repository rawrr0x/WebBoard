import { useCallback, useState } from 'react';
import { useBoard } from '../../hooks/useBoard';
import cl from './Board.module.css';
import Button from '../UI/Button/Button';
import Modal from '../Modal/Modal';

const Board = () => {
    const { tasks, onlineUsers } = useBoard();

    {/* rework */}
    const [createModal, setCreateModal] = useState(false);

    const close = useCallback(() => setCreateModal(false), []);
    {/* rework */}

    return (
        <div className={cl.board}>
            {/* rework */}
            { createModal && <Modal onClose={close}>Create</Modal>}
            {/* rework */}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                <Button onClick={() => setCreateModal(true)}>Create task</Button>
                <h2 style={{ color: 'black' }}>Online: {onlineUsers.length}</h2>
            </div>

            <div className={cl.status_block}>
                <div className={cl.tasks_block}>
                    <div className="title">To-Do</div>
                    <div className="body">
                        {
                            tasks.filter(task => task.status === 'toDo').map(task => <p>{task.title}</p>)
                        }
                    </div>
                </div>
                <div className={cl.tasks_block}>
                    <div className="title">In Progress</div>
                    <div className="body">
                        {
                            tasks.filter(task => task.status === 'inProgress').map(task => <p>{task.title}</p>)
                        }
                    </div>
                </div>
                <div className={cl.tasks_block}>
                    <div className="title">In Review</div>
                    <div className="body">
                        {
                            tasks.filter(task => task.status === 'inReview').map(task => <p>{task.title}</p>)
                        }
                    </div>
                </div>
                <div className={cl.tasks_block}>
                    <div className="title">Done</div>
                    <div className="body">
                        {
                            tasks.filter(task => task.status === 'done').map(task => <p>{task.title}</p>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Board;
