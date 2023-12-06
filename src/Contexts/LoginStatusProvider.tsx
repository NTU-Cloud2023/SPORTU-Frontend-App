import React, { useState, ReactElement } from 'react';

export const LoginStatusContext = React.createContext({});

const LoginStatusProvider = ({ children }:{
    children: ReactElement
}) => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <LoginStatusContext.Provider
            value={{
                isLogin,
                setIsLogin
            }}
        >
            {children}
        </LoginStatusContext.Provider>
    );
};

export default LoginStatusProvider;