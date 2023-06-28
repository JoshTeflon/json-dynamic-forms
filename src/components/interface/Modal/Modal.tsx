import React, { ReactNode, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import classnames from 'classnames'
import Button from '../Button/Button'

interface ModalProps {
    isOpen: boolean
    children: ReactNode
    className?: string
    onClose?: () => void
    defaultClose?: boolean
}

const Modal: React.FC<ModalProps> = ({ isOpen = false, children, className, onClose, defaultClose = true }) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    
    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.focus();
        }
    }, [isOpen]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (onClose && event.key === 'Escape') {
            onClose();
        }

        const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (event.key === 'Tab' && focusableElements?.length) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (event.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    };

    return (
        <>
            {isOpen && createPortal(
                <dialog
                    ref={modalRef}
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    onKeyDown={handleKeyDown}
                    className='modal'
                >
                    <section className={classnames(className)}>
                        <div className='modal__container'>
                            {
                                defaultClose &&
                                <div className='modal__container--btn'>
                                    <Button
                                        variant='naked'
                                        onClick={onClose}
                                    >
                                        Close
                                    </Button>
                                </div>
                            }
                            { children }
                        </div>
                    </section>
                </dialog>,
                document.body
            )}
        </>
    )
}

export default Modal