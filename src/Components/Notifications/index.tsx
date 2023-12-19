import { useContext } from 'react';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';
import { ReactComponent as Cancel } from '../../assets/images/icon/cancel.svg';
import './notifications.scss';
import PillButton from '../PillButton';

type NotificationsProps = {
    handleCloseNotifications: () => void;
};

const Notifications = (props: NotificationsProps) => {
    const {
        hasNewMessage,
        notifications,
        readNotification
    } = useContext(GlobDataContext);

    const readAll = () => {
        notifications.forEach((ntf) => {
            if(ntf.viewed === 0) {
                readNotification(ntf.id);
            }
        });
    };

    return (
        <div className="notifications">
            <div className="notifications-cancel">
                {
                    hasNewMessage ? (
                        <div className="d-block mr-2">
                            <PillButton
                                text="全部已讀"
                                onClick={readAll}
                                type="none"
                            />
                        </div>
                    ) : ''
                }
                <Cancel onClick={props.handleCloseNotifications}/>
            </div>
            <div className="notifications-space1"/>
            {
                notifications.map((notification) => (
                    <div
                        className={`notifications-notification-item ${notification.viewed === 1 ? 'viewed' : 'new'}`}
                        key={notification.id}
                        onClick={
                            notification.viewed === 0
                                ? () => readNotification(notification.id)
                                : () => {}
                        }
                    >
                        {notification.message}
                    </div>
                ))
            }
        </div>
    );
};

export default Notifications;