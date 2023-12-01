import './notifications.scss';

type NotificationsProps = {
    handleCloseNotifications: () => void;
};

const Notifications = (props: NotificationsProps) => {
    return (
        <div className="notifications">
            <img
                className="notifications-close"
                src={require('../assets/images/close.jpg')}
                alt="關閉"
                onClick={props.handleCloseNotifications}
            />
            <div className="notifications-space1"/>
            <div className="notifications-item">
                <div>
                    [即將開始] 台大體育館 - 羽球 1AF2
                </div>
                <div>
                    2023-10-14 11:00-15:00
                </div>
            </div>
        </div>
    );
};

export default Notifications;
