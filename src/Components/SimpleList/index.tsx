import { TimeSlotAPIResponse } from '../../API/APIInterface';
import { localDateTimeString } from '../../utils';
import './simpleList.scss';

export interface SimpleListProps {
    slot: TimeSlotAPIResponse
    onClick?: () => void
}

const SimpleList = ({ slot, onClick }: SimpleListProps) => {
    return (
        <div
            className="simple-list"
            onClick={onClick}
        >
            <div className="mr-auto">
                {localDateTimeString(+slot.timeslot * 1000)}
            </div>
            <div>
                目前人數 {slot.headcount}/{slot.capacity}
            </div>
        </div>
    );
};

export default SimpleList;