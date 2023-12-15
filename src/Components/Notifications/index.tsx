import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';
import { ReactComponent as Cancel } from '../../assets/images/icon/cancel.svg';
import './notifications.scss';

type NotificationsProps = {
    handleCloseNotifications: () => void;
};

const Notifications = (props: NotificationsProps) => {
    const { user } = useContext(GlobDataContext);
    const [notificationItems, setNotificationItems] = useState<Array<JSX.Element>>([]);

    useEffect(() => {
        const userId = user.data ? user.data.id : 2;
        axios({
            method: 'GET',
            url: 'https://admin.chillmonkey.tw/v1/users/' + userId.toString() + '/messages'
        }).then((res) => {
            const notificationItems = [];
            const notifications = res.data;
            const n = notifications.length;
            for (let i = 0; i < n; i++) {
                notificationItems.push(
                    <div
                        className="notifications-notification-item"
                        key={i}
                    >
                        {notifications[i].message}
                    </div>
                );
            }

            setNotificationItems(notificationItems);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className="notifications">
            <div className="notifications-cancel">
                <Cancel onClick={props.handleCloseNotifications}/>
            </div>
            <div className="notifications-space1"/>
            {notificationItems}
        </div>
    );
};

export default Notifications;