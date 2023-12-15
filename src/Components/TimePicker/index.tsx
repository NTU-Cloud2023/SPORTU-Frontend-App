import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import '@progress/kendo-theme-default/dist/default-main-dark.scss';
import './timePicker.scss';


export interface CusTimeRange {
    startTime: string,
    endTime: string
}

export interface TimePickerProps {
    value: CusTimeRange,
    setValue: (d: CusTimeRange) => void
}

const getNextHourTimestamp = () => {
    const date = new Date().getTime();
    const rest = new Date().getTime() % 3600000;
    return date - rest + (3600000 * ((rest > 1800000) ? 2 : 1));
};

const TimePicker = ({
    value, setValue
}: TimePickerProps) => {
    console.log(getNextHourTimestamp());

    return (
        <div className="time-picker-bar">
            <DateTimePicker
                steps={{
                    minute: 60,
                    second: 60
                }}
                size="large"
                fillMode="outline"
                rounded="large"
                defaultValue={new Date(getNextHourTimestamp())}
            />
        </div>
    );
};

export default TimePicker;