import './modalWindow.css';

import { ChangeEvent, ReactNode, useState } from "react"

export interface ModalWindowProps {
    title: string
    buttonText: string
    show: boolean,
    id?: string,
    name?: string
    handleClose: () => void
    handleAction: (name: string, id: string) => void
    children?: ReactNode;
}

export const Modal: React.FC<ModalWindowProps> = (
    { show, buttonText, title, handleClose, handleAction, id, name, children }
) => {
    const [inputValue, setInput] = useState<string | undefined>(name);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleClick = () => {
        if (inputValue && id) {
            handleAction(inputValue, id);
            handleClose();
        }
    };

    return (
        <div className={`modal ${show ? "show" : ""}`} onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={handleClose}>
                    &times;
                </span>
                <h2>{title}</h2>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                />
                {children}
                {id && (
                    <button onClick={handleClick}>{buttonText}</button>
                )}
            </div>
        </div>
    );
}