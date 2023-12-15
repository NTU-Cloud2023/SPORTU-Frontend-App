import { FieldAPIResponse } from '../../API/APIInterface';
import './appointmentListItem.scss';


const AppointmentListItem = ({
    field,
    timestamp,
    addCalendarIcon,
    deleteIcon
}:{
    field: FieldAPIResponse,
    timestamp: number,
    addCalendarIcon: boolean,
    deleteIcon: boolean
}) => {
    return (
        <div className="appointment-list-item">
            <div className="name">
                {field.name}
                <br />
                {timestamp}
            </div>
            {
                addCalendarIcon ? (
                    <div className="icon add-calendar lg"></div>
                ) : ''
            }
            {
                deleteIcon ? (
                    <div className="icon delete lg"></div>
                ) : ''
            }
        </div>
    );
};

export default AppointmentListItem;