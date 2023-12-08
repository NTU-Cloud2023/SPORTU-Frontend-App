import { useState } from 'react';
import Header from '../../Components/Header';
import Book from '../Book';
import FieldList from '../FieldList';
import Menu from '../../Components/Menu';
import './home.scss';
import Notification from '../../Components/Notification';

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
                    <div className="home-menu">
                        <Menu
                            handleCloseMenu={handleCloseMenu} 
                        />
                    </div>
                    :
                    <div/>
            }
            {
                shouldShowNotifications ?
                    <div className="home-notification">
                        <Notification
                            handleCloseNotifications={handleCloseNotifications}
                        />
                    </div>
                    :
                    <div/>
            }
            <div className="home-header">
                <Header
                    handleShowMenu={handleShowMenu}
                    handleShowNotifications={handleShowNotifications}
                />
            </div>
            <Book />
            <FieldList />
        </div>
    );
};

export default Home;