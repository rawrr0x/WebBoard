import cl from './Modal.module.css';

interface ModalProps {
    children: React.ReactNode,
    onClose?: () => void,
}

const Modal = ({ children, onClose }: ModalProps) => {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose?.();
    };

    return (
        <div className={cl.modal} onClick={handleBackdropClick}>
            <div className={cl.modal_content} role="dialog" aria-modal="true">{children}</div>
        </div>
    );
};

export default Modal;
