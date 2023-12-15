import { useContext, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import './login.scss';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const {
        fetchUser,
        fetchingUser
    } = useContext(GlobDataContext);
    const navigate = useNavigate();
    const handleLogin = () => {
        if (fetchingUser === false) {
            fetchUser(account).then(() => navigate('/home'));
        }
    };

    return (
        <div className="login">
            <div className="login-space1" />
            <div className="login-logo">
                <Logo />
            </div>
            <div className="login-space2" />
            <input
                className="login-email"
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="電子信箱"
            />
            <div className="login-space3" />
            <input
                className="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="密碼"
            />
            <div className="login-space4" />
            <button
                className="login-log-in"
                type="button"
                onClick={handleLogin}
            >
                登入
            </button>
            <div className="login-space5" />
            <div className="login-register-text">
                <span>
                    還沒有帳號?&ensp;
                </span>
                <span
                    className="login-register-link"
                    onClick={() => {}}
                >
                    立即註冊
                </span>
            </div>
            <div className="login-space6" />
            <div
                className="login-court-provider-login"
                onClick={() => {}}
            >
                我是廠商
            </div>
        </div>
    );
};

export default Login;