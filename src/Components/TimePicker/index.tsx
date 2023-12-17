import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import '@progress/kendo-theme-default/dist/default-main-dark.scss';
import './timePicker.scss';
import { useEffect } from 'react';

/***
 * KendoReact Documentation
 * https://www.telerik.com/kendo-react-ui/components/dateinputs/datetimepicker/
 */

export interface TimePickerProps {
    value: Date|null,
    setValue: (d: Date) => void
}

const getNextHourTimestamp = () => {
    const date = new Date().getTime();
    const rest = new Date().getTime() % 3600000;
    return date - rest + (3600000 * ((rest > 1800000) ? 2 : 1));
};

const TimePicker = ({
    value, setValue
}: TimePickerProps) => {
    const defaultDate = new Date(getNextHourTimestamp());

    useEffect(() => {
        setValue(defaultDate);
    }, []);

    return (
        <div className="time-picker-bar">
            <DateTimePicker
                steps={{
                    minute: 60,
                    second: 60
                }}
                format="yyyy-MM-dd hh:mm a"
                size="large"
                fillMode="outline"
                rounded="large"
                value={value}
                onChange={(e) => setValue(e.value || defaultDate)}
            />
        </div>
    );
};

export default TimePicker;