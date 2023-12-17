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
        fetchUser
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