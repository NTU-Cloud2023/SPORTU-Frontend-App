import { format } from 'date-fns';
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
    const date = new Date(timestamp);
    const addToGoogleCalendar = () => {
        const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${field.name.replace(' ', '+')}&dates=${format(new Date(timestamp), 'yyyyMMdd\'T\'HHmmss\'Z\'')}&details=${encodeURIComponent(field.nav_url)}`;
        window.open(url, 'blank');
    };

    return (
        <div className="appointment-list-item">
            <div className="name">
                {field.name}
                <br />
                {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </div>
            {
                addCalendarIcon ? (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            addToGoogleCalendar();
                        }}
                        className="icon add-calendar lg"
                    >
                    </div>
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