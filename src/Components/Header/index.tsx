import { ReactComponent as MenuBar } from '../../assets/images/icon/menu-bar.svg';
import { ReactComponent as Bell } from '../../assets/images/icon/bell.svg';
import './header.scss';

const Header = () => {
    return (
        <div className="header">
            <div className="header-menu-bar">
                <MenuBar />
            </div>
            <div className="header-bell">
                <Bell />
            </div>
            <div
                className="header-map"
            >
                地圖
            </div>
        </div>
    );
};

export default Header;