import './login.scss';

const Login = () => {
    return (
        <div className="login">
            <div className="login-space1" />
            <img
                className="login-logo"
                src={require('../../assets/images/logo.png')}
                alt="SPORTU"
            />
            <div className="login-space2" />
            <input
                className="login-email"
                type="text"
                placeholder="電子信箱"
            />
            <div className="login-space3" />
            <input
                className="login-password"
                type="password"
                placeholder="密碼"
            />
            <div className="login-space4" />
            <button
                className="login-login"
                type="button"
                onClick={() => {}}
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