import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import '@progress/kendo-theme-default/dist/default-main-dark.scss';
import './timePicker.scss';
import { useEffect } from 'react';
import { getPrevHourTimestamp } from '../../utils';

/***
 * KendoReact Documentation
 * https://www.telerik.com/kendo-react-ui/components/dateinputs/datetimepicker/
 */

export interface TimePickerProps {
    value: Date|null,
    setValue: (d: Date) => void
}

const TimePicker = ({
    value, setValue
}: TimePickerProps) => {
    const defaultDate = new Date(getPrevHourTimestamp());

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