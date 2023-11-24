import { useState } from 'react';
import { BACKEND } from '../backend';
import axios from 'axios';
import './login.scss';

type LoginProps = {
    handleLogin: () => void;
    handleRegister: () => void;
    handleCourtProviderLogin: () => void;
}

const Login = (props: LoginProps) => {
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const handleLoginClicked = () => {
        let email = '';
        let password = '';

        const emailElement = document.getElementById('email') as HTMLInputElement;
        const passwordElement = document.getElementById('password') as HTMLInputElement;

        if (emailElement) {
            email = emailElement.value;
        }

        if (passwordElement) {
            password = passwordElement.value;
        }

        axios.post(BACKEND + '/api/login', {
            email: email,
            password: password
        }).then((res) => {
            const data = res.data;
            console.log(data);
            setIsEmailValid(data.isEmailValid);
            setIsPasswordValid(data.isPasswordValid);

            if (data.isEmailValid && data.isPasswordValid) {
                localStorage.setItem('x-access-token', data.headers['x-access-token']);
                props.handleLogin();
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="login">
            <div className="pt-20"/>
            <div className="login-title">SPORTU</div>
            <div className="pt-4"/>
            <img
                className="login-image"
                src={require('../assets/images/runner.jpg')}
                alt="一起運動"
            />
            <div className="pt-6"/>
            <input
                className="login-email pl-3"
                type="text"
                id="email"
                placeholder="電子信箱"
            />
            {
                isEmailValid ? <div className="pt-4"/> : <div className="login-email-error py-1.5">信箱不存在</div>
            }
            <input
                className="login-password pl-3"
                type="password"
                id="password"
                placeholder="密碼"
            />
            {
                isPasswordValid ? <div className="pt-4"/> : <div className="login-password-error py-1.5">密碼錯誤</div>
            }
            <button
                className="login-login"
                type="button"
                onClick={handleLoginClicked}
            >
                登入
            </button>
            <div className="pt-4"/>
            <div className="login-register-text">
                <span>
                    還沒有帳號?&ensp;
                </span>
                <span
                    className="login-register-link"
                    onClick={props.handleRegister}
                >
                    立即註冊
                </span>
            </div>
            <div className="pt-4"/>
            <div
                className="login-court-provider"
                onClick={props.handleCourtProviderLogin}
            >
                我是廠商
            </div>
        </div>
    );
};

export default Login;
