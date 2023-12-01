import { useState } from 'react';
import * as pages from './pages';
import CourtProviderRoot from './court_provider/Root';
import Container from './sportsman/Container';
import Register from './sportsman/Register';
import Login from './sportsman/Login';
import './root.scss';

const Root = () => {
    const [page, setPage] = useState(pages.SPORTSMAN_LOGIN);

    const handleLogin = () => {
        setPage(pages.SPORTSMAN_CONTAINER);
    };

    const handleLogout = () => {
        setPage(pages.SPORTSMAN_LOGIN);
    };

    const handleRegister = () => {
        setPage(pages.SPORTSMAN_REGISTER);
    };

    const handleCourtProviderLogin = () => {
        setPage(pages.COURT_PROVIDER_ROOT);
    };

    return (
        <div>
            {
                page === pages.COURT_PROVIDER_ROOT ?
                    <div className="root-court-provider"> <CourtProviderRoot/> </div>
                    :
                    <div className="root-sportsman">
                        {
                            page === pages.SPORTSMAN_CONTAINER ?
                                <Container handleLogout={handleLogout}/>
                                :
                                <div/>
                        }
                        {
                            page === pages.SPORTSMAN_REGISTER ? <Register/> : <div/>
                        }
                        {
                            page === pages.SPORTSMAN_LOGIN ?
                                <Login
                                    handleLogin={handleLogin}
                                    handleRegister={handleRegister}
                                    handleCourtProviderLogin={handleCourtProviderLogin}
                                />
                                :
                                <div/>
                        }
                    </div>
            }
        </div>
    );
};

export default Root;
