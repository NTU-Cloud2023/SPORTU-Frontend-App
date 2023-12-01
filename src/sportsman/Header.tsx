import './header.scss';

type HeaderProps = {
    handleShowMenu: () => void;
    handleShowMap: () => void;
    handleShowNotifications: () => void;
};

const Header = (props: HeaderProps) => {
    return (
        <div className="header">
            <img
                className="header-menu"
                src={require('../assets/images/menu.jpg')}
                alt="選單"
                onClick={props.handleShowMenu}
            />
            <img
                className="header-notification"
                src={require('../assets/images/notification.jpg')}
                alt="通知"
                onClick={props.handleShowNotifications}
            />
            <div
                className="header-map"
                onClick={props.handleShowMap}
            >
                地圖
            </div>
        </div>
    );
};

export default Header;
