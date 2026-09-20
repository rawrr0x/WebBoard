import { useEffect, type ReactNode } from 'react';
import cl from './Modal.module.css';

interface ModalProps {
    children: ReactNode,
    onClose: () => void,
}

const Modal = ({ children, onClose }: ModalProps) => {
    
    const close = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };

    useEffect(() => {
        window.addEventListener('keydown', close);

        return () => window.removeEventListener('keydown', close);
    }, []);

    return (
        <div className={cl.modal}>
            <div className={cl.modal_content}>{children}</div>
        </div>
    );
};

export default Modal;
