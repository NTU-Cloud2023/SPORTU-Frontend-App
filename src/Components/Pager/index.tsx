import { useContext, useEffect, useState } from 'react';
import Menu from '../../Components/Menu';
import Notifications from '../../Components/Notifications';
import Header from '../../Components/Header';
import Body from '../Body';
import './pager.scss';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';
import { useNavigate } from 'react-router-dom';

type PagerProps = {
    page: PageName;
};

const Pager = (props: PagerProps) => {
    const [shouldShowMenu, setShouldShowMenu] = useState(false);
    const [shouldShowNotifications, setShouldShowNotifications] = useState(false);

    const handleShowMenu = () => {
        setShouldShowNotifications(false);
        setShouldShowMenu(true);
    };

    const handleCloseMenu = () => {
        setShouldShowMenu(false);
    };

    const handleShowNotifications = () => {
        setShouldShowMenu(false);
        setShouldShowNotifications(true);
    };

    const handleCloseNotifications = () => {
        setShouldShowNotifications(false);
    };

    const {
        user,
        fetchUser,
        fetchNotifications,
        alerts
    } = useContext(GlobDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.success === false || !user.data?.id) {
            const local_account = localStorage.getItem('SPORTU_USER_ACCOUNT');
            if (local_account !== null) {
                fetchUser(local_account).catch(() => {
                    localStorage.removeItem('SPORTU_USER_ACCOUNT');
                    navigate('/login');
                });
            } else {
                navigate('/login');
            }
        }
    }, []);

    useEffect(() => {
        if (user.success && user.data?.id) {
            fetchNotifications(user.data.id);

            const interval = setInterval(() => {
                if (user.data?.id) {
                    fetchNotifications(user.data.id);
                }
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [user]);

    useEffect(() => {
        if (alerts.length > 0) {
            const prev = localStorage.getItem('alerted') || 0;
            const current = new Date().getTime();
            if (+prev > current) return;

            localStorage.setItem('alerted', (current  + 60000 * 5).toString());

            let msg = '';
            alerts.forEach((alt) => {
                msg += `--------------------
${alt.message}`;
            });
            alert(`提醒您
您有 ${alerts.length} 則重要訊息
${msg}
            `);
        }
    }, [alerts]);

    return (
        <div className="pager">
            <Header
                handleShowMenu={handleShowMenu}
                handleShowNotifications={handleShowNotifications}
            />
            <div className="pager-wrapper">
                <Body page={props.page} />
            </div>
            {
                shouldShowMenu ?
                    <Menu handleCloseMenu={handleCloseMenu} />
                    :
                    <div/>
            }
            {
                shouldShowNotifications ?
                    <Notifications handleCloseNotifications={handleCloseNotifications} />
                    :
                    <div/>
            }
        </div>
    );
};

export default Pager;