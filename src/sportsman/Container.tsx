import { useState } from 'react';
import * as pages from '../pages';
import Header from './Header';
import Body from './Body';
import Menu from './Menu';
import Notifications from './Notifications';
import './container.scss';

type ContainerProps = {
    handleLogout: () => void;
};

const Container = (props: ContainerProps) => {
    const [shouldShowMenu, setShouldShowMenu] = useState(false);
    const [shouldShowNotifications, setShouldShowNotifications] = useState(false);
    const [page, setPage] = useState(pages.SPORTSMAN_HOME);

    const handleShowMenu = () => {
        setShouldShowMenu(true);
        setShouldShowNotifications(false);
    };

    const handleCloseMenu = () => {
        setShouldShowMenu(false);
    };

    const handleShowMap = () => {
        setShouldShowMenu(false);
        setShouldShowNotifications(false);
        setPage(pages.SPORTSMAN_MAP);
    };

    const handleShowNotifications = () => {
        setShouldShowMenu(false);
        setShouldShowNotifications(true);
    };

    const handleCloseNotifications = () => {
        setShouldShowNotifications(false);
    };

    const handleShowHomePage = () => {
        setShouldShowMenu(false);
        setPage(pages.SPORTSMAN_HOME);
    };

    const handleReserveNow = () => {
        setShouldShowMenu(false);
        setPage(pages.SPORTSMAN_RESERVE_NOW);
    };

    const handleShowReservationRecords = () => {
        setShouldShowMenu(false);
        setPage(pages.SPORTSMAN_RESERVATION_RECORDS);
    };

    const handleShowCourtInformation = () => {
        setShouldShowMenu(false);
        setPage(pages.SPORTSMAN_COURT_INFORMATION);
    };

    const handleSignIn = () => {
        setShouldShowMenu(false);
        setPage(pages.SPORTSMAN_SIGN_IN);
    };

    return (
        <div className="container">
            <div className="container-header">
                <Header
                    handleShowMenu={handleShowMenu}
                    handleShowMap={handleShowMap}
                    handleShowNotifications={handleShowNotifications}
                />
            </div>
            <div className="container-body">
                <Body page={page}/>
            </div>
            {
                shouldShowMenu ?
                    <div className="container-menu">
                        <Menu
                            handleCloseMenu={handleCloseMenu}
                            handleShowHomePage={handleShowHomePage}
                            handleReserveNow={handleReserveNow}
                            handleShowReservationRecords={handleShowReservationRecords}
                            handleShowCourtInformation={handleShowCourtInformation}
                            handleSignIn={handleSignIn}
                            handleLogout={props.handleLogout}
                        />
                    </div>
                    :
                    <div/>
            }
            {
                shouldShowNotifications ?
                    <div className="container-notifications">
                        <Notifications handleCloseNotifications={handleCloseNotifications}/>
                    </div>
                    :
                    <div/>
            }
        </div>
    );
};

export default Container;
