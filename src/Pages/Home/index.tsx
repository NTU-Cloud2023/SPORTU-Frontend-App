import { useState } from 'react';
import Menu from '../../Components/Menu';
import Notification from '../../Components/Notification';
import Header from '../../Components/Header';
import Book from '../Book';
import FieldList from '../FieldList';
import './home.scss';

const Home = () => {
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
        <div className="home">
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

            <Header
                handleShowMenu={handleShowMenu}
                handleShowNotifications={handleShowNotifications}
            />
            <Book />
            <FieldList />
        </div>
    );
};

export default Home;