import './menu.scss';

type MenuProps = {
    handleCloseMenu: () => void;
    handleShowHomePage: () => void;
    handleReserveNow: () => void;
    handleShowReservationRecords: () => void;
    handleShowCourtInformation: () => void;
    handleSignIn: () => void;
    handleLogout: () => void;
};

const Menu = (props: MenuProps) => {
    return (
        <div className="menu">
            <img
                className="menu-close"
                src={require('../assets/images/close.jpg')}
                alt="關閉"
                onClick={props.handleCloseMenu}
            />
            <div className="menu-space1"/>
            <button
                className="menu-show-homepage"
                onClick={props.handleShowHomePage}
            >
                回首頁
            </button>
            <button
                className="menu-reserve-now"
                onClick={props.handleReserveNow}
            >
                立即預約
            </button>
            <button
                className="menu-reservation-records"
                onClick={props.handleShowReservationRecords}
            >
                我的預約
            </button>
            <button
                className="menu-court-information"
                onClick={props.handleShowCourtInformation}
            >
                球場資訊
            </button>
            <button
                className="menu-sign-in"
                onClick={props.handleSignIn}
            >
                報到
            </button>
            <button
                className="menu-log-out"
                onClick={props.handleLogout}
            >
                登出
            </button>
        </div>
    );
};

export default Menu;
