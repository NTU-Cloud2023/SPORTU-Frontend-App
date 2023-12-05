import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Login from './Login';
import Root from '../Root';
import Register from './Register';
import RegisterSuccess from './RegisterSuccess';
import Home from './Home';
import Book from './Book';
import FieldList from './FieldList';
import FieldMap from './FieldMap';
import BookFieldMap from './Book/FieldMap';
import BookFieldList from './Book/FieldList';
import CheckIn from './CheckIn';
import Appointments from './Appointments/Index';
import FieldDetails from './FieldDetails/Index';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Root />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/register-success"
                    element={<RegisterSuccess />}
                />
                <Route
                    path="/home"
                    element={<Home />}
                />
                <Route path="/book">
                    <Route
                        index={true}
                        element={<Book />}
                    />
                    <Route
                        path="field-map"
                        element={<BookFieldMap />}
                    />
                    <Route
                        path="field-list"
                        element={<BookFieldList />}
                    />
                </Route>
                <Route
                    path="/field-list"
                    element={<FieldList />}
                />
                <Route
                    path="/field-map"
                    element={<FieldMap />}
                />
                <Route
                    path="/check-in"
                    element={<CheckIn />}
                />
                <Route
                    path="/appointments"
                    element={<Appointments />}
                />
                <Route
                    path="/field-details"
                    element={<FieldDetails />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;