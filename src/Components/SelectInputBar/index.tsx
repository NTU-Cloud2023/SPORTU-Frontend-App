import { Dispatch, SetStateAction, useEffect } from 'react';
import './selectInputBar.scss';

export interface SelectOption {
    text: string,
    value: string
}

export interface SelectInputBarProps {
    options: SelectOption[],
    setValue: Dispatch<SetStateAction<string>>,
    clearField?: () => void
}

const SelectInputBar = ({
    options,
    setValue,
    clearField=() => {}
}: SelectInputBarProps) => {

    useEffect(() => {
        if (options.length > 0) setValue(options[0].value);
        else setValue('');
    }, [options]);

    return (
        <div className="select-input-bar">
            <select
                onChange={(e) => {
                    setValue((v) => {
                        if (e.target.value !== v) {
                            clearField();
                            return(e.target.value);
                        }
                        return v;
                    });
                }}
            >
                {
                    options.map((opt, idx) => (
                        <option
                            value={opt.value}
                            key={`select_input_${idx}`}
                        >
                            {opt.text}
                        </option>
                    ))
                }
            </select>
            <div className="drop-down-arrow">
                <svg viewBox="0 0 30 30">
                    <g
                        fill="none"
                        strokeWidth="2"
                        stroke="#c3c3c3"
                    >

                        <path d="M2 8 L15 22 L28 8" />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default SelectInputBar;