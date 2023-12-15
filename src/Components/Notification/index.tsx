import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';
import { ReactComponent as Cancel } from '../../assets/images/icon/cancel.svg';
import './notification.scss';

type NotificationProps = {
    handleCloseNotifications: () => void;
};

const Notification = (props: NotificationProps) => {
    const { user } = useContext(GlobDataContext);
    const [notifications, setNotifications] = useState<Array<JSX.Element>>([]);

    useEffect(() => {
        const userId = user.data ? user.data.id : 2;
        axios({
            method: 'GET',
            url: 'https://admin.chillmonkey.tw/v1/users/' + userId + '/messages'
        }).then((res) => {
            const newNotifications = [];
            const notifications = res.data;
            const n = notifications.length;
            for (let i = 0; i < n; i++) {
                newNotifications.push(
                    <div
                        className="notification-item"
                        key={i}
                    >
                        {notifications[i].message}
                    </div>
                );
            }

            setNotifications(newNotifications);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className="notification">
            <div className="notification-cancel">
                <Cancel onClick={props.handleCloseNotifications}/>
            </div>
            <div className="notification-space1"/>
            {notifications}
        </div>
    );
};

export default Notification;