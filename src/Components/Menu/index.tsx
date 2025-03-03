import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Cancel } from '../../assets/images/icon/cancel.svg';
import './menu.scss';
import { useContext } from 'react';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';

type MenuProps = {
    handleCloseMenu: () => void;
};

const Menu = (props: MenuProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { doLogout } = useContext(GlobDataContext);
    const handleShowHomePage = () => {
        navigate('/home');
    };

    const handleBookNow = () => {
        navigate('/book');
    };

    const handleShowAppointmentRecords = () => {
        navigate('/appointments');
    };

    const handleShowFieldList = () => {
        navigate('/field-list');
    };

    const handleCheckIn = () => {
        navigate('/check-in');
    };

    const handleLogout = () => {
        doLogout();
        navigate('/login');
    };

    return (
        <div className="menu">
            <div className="menu-cancel">
                <Cancel onClick={props.handleCloseMenu}/>
            </div>
            <div className="menu-space1" />
            <button
                className={`menu-show-home-page ${location.pathname === '/home' ? 'active' : ''}`}
                onClick={handleShowHomePage}
            >
                回首頁
            </button>
            <button
                className={`menu-book-now ${location.pathname === '/book' ? 'active' : ''}`}
                onClick={handleBookNow}
            >
                立即預約
            </button>
            <button
                className={`menu-show-appointment-records ${location.pathname === '/appointments' ? 'active' : ''}`}
                onClick={handleShowAppointmentRecords}
            >
                我的配對
            </button>
            <button
                className={`menu-show-field-list ${location.pathname === '/field-list' ? 'active' : ''}`}
                onClick={handleShowFieldList}
            >
                球場資訊
            </button>
            <button
                className={`menu-check-in ${location.pathname === '/check-in' ? 'active' : ''}`}
                onClick={handleCheckIn}
            >
                報到
            </button>
            <button
                className="menu-logout"
                onClick={handleLogout}
            >
                登出
            </button>
        </div>
    );
};

export default Menu;