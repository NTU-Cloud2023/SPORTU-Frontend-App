import { Dispatch } from 'react';
import './inputBar.scss';

export interface TimeRange {
    startTime: string,
    endTime: string
}

export interface InputBarProps {
    value: TimeRange,
    setValue: (d: TimeRange) => void
}

const TimePicker = ({
    value, setValue
}: InputBarProps) => {
    return (
        <div className="time-picker-bar">

        </div>
    );
};

export default TimePicker;