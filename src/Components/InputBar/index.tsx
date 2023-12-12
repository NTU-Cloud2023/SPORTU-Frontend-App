import { Dispatch } from 'react';
import './inputBar.scss';

export interface InputBarProps {
    inputText: string,
    setInputText: Dispatch<string>,
    placeholder?: string
}

const InputBar = ({
    inputText, setInputText, placeholder=''
}: InputBarProps) => {
    return (
        <div className="input-bar">
            <input
                className="input"
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputBar;