import { ReactComponent as Cancel } from '../../assets/images/icon/cancel.svg';
import './menu.scss';

type MenuProps = {
    handleCloseMenu: () => void;
};

const Menu = (props: MenuProps) => {
    const handleShowHomePage = () => {
        window.location.href = 'http://localhost:3000/home';
    };

    const handleBookNow = () => {
        window.location.href = 'http://localhost:3000/book';
    };

    const handleShowAppointmentRecords = () => {
        window.location.href = 'http://localhost:3000/appointments';
    };

    const handleShowFieldList = () => {
        window.location.href = 'http://localhost:3000/field-list';
    };

    const handleCheckIn = () => {
        window.location.href = 'http://localhost:3000/check-in';
    };

    const handleLogout = () => {
        window.location.href = 'http://localhost:3000/login';
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
                className="menu-log-out"
                onClick={handleLogout}
            >
                登出
            </button>
        </div>
    );
};

export default Menu;