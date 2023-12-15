import { useNavigate } from 'react-router-dom';
import { ReactComponent as Cancel } from '../../assets/images/icon/cancel.svg';
import './menu.scss';

type MenuProps = {
    handleCloseMenu: () => void;
};

const Menu = (props: MenuProps) => {
    const navigate = useNavigate();
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
        navigate('/login');
    };

    return (
        <div className="menu">
            <div className="menu-cancel">
                <Cancel onClick={props.handleCloseMenu}/>
            </div>
            <div className="menu-space1" />
            <button
                className="menu-show-home-page"
                onClick={handleShowHomePage}
            >
                回首頁
            </button>
            <button
                className="menu-book-now"
                onClick={handleBookNow}
            >
                立即預約
            </button>
            <button
                className="menu-show-appointment-records"
                onClick={handleShowAppointmentRecords}
            >
                我的配對
            </button>
            <button
                className="menu-show-field-list"
                onClick={handleShowFieldList}
            >
                球場資訊
            </button>
            <button
                className="menu-check-in"
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