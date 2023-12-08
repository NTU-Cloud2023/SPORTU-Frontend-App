import { ReactComponent as MenuBar } from '../../assets/images/icon/menu-bar.svg';
import { ReactComponent as Bell } from '../../assets/images/icon/bell.svg';
import { Link } from 'react-router-dom';
import './header.scss';

type HeaderProps = {
    handleShowMenu: () => void;
    handleShowNotifications: () => void;
};

const Header = (props: HeaderProps) => {
    return (
        <div className="header">
            <div className="header-menu-bar">
                <MenuBar onClick={props.handleShowMenu} />
            </div>
            <div className="header-bell">
                <Bell onClick={props.handleShowNotifications} />
            </div>
            <div className="header-map">
                <Link to="/field-map">地圖</Link>
            </div>
        </div>
    );
};

export default Header;