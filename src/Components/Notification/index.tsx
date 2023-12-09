import { ReactComponent as Cancel } from '../../assets/images/icon/cancel.svg';
import './notification.scss';

type NotificationProps = {
    handleCloseNotifications: () => void;
};

const Notification = (props: NotificationProps) => {
    return (
        <div className="notification">
            <div className="notification-cancel">
                <Cancel onClick={props.handleCloseNotifications}/>
            </div>
            <div className="notification-space1"/>
            <div className="notification-item">
                <div>
                    [即將開始] 台大體育館 - 羽球 1AF2<br/>
                    2023-10-14 11:00-15:00
                </div>
            </div>
        </div>
    );
};

export default Notification;