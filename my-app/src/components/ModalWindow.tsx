import './modalWindow.css';

import { ChangeEvent, useState } from "react"
import { ModalWindowProps } from '../models/ModalWindowProps';

export const Modal: React.FC<ModalWindowProps> = (
    { show, buttonText, title, handleClose, handleAction, id, name }
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
                <button onClick={handleClick}>{buttonText}</button>
            </div>
        </div>
    );
}
