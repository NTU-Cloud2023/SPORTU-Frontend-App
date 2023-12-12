import { useState } from 'react';
import Menu from '../../Components/Menu';
import Notification from '../../Components/Notification';
import Header from '../../Components/Header';
import Body from '../Body';
import './pager.scss';

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
                    <Notification handleCloseNotifications={handleCloseNotifications} />
                    :
                    <div/>
            }
        </div>
    );
};

export default Pager;