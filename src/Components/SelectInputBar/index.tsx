import { useEffect } from 'react';
import './selectInputBar.scss';

export interface SelectOption {
    text: string,
    value: string
}

export interface SelectInputBarProps {
    options: SelectOption[],
    value: string,
    setValue: (s: string) => void
}

const SelectInputBar = ({
    options,
    setValue
}: SelectInputBarProps) => {

    useEffect(() => {
        if (options.length > 1) setValue(options[0].value);
    }, [options]);

    return (
        <div className="select-input-bar">
            <select onChange={(e) => setValue(e.target.value)}>
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