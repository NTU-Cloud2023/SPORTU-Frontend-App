import { ReactComponent as Cancel } from '../../assets/images/icon/cancel.svg';
import './menu.scss';

type MenuProps = {
    handleCloseMenu: () => void;
};

const Menu = (props: MenuProps) => {
    return (
        <div className="menu">
            <div className="menu-cancel">
                <Cancel onClick={props.handleCloseMenu}/>
            </div>
            <div className="menu-space1" />
            <button
                className="menu-show-home-page"
                onClick={() => {}}
            >
                回首頁
            </button>
            <button
                className="menu-book-now"
                onClick={() => {}}
            >
                立即預約
            </button>
            <button
                className="menu-appointment-record"
                onClick={() => {}}
            >
                我的配對
            </button>
            <button
                className="menu-field-list"
                onClick={() => {}}
            >
                球場資訊
            </button>
            <button
                className="menu-check-in"
                onClick={() => {}}
            >
                報到
            </button>
            <button
                className="menu-log-out"
                onClick={() => {}}
            >
                登出
            </button>
        </div>
    );
};

export default Menu;