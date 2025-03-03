import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import RegisterSuccess from './Pages/RegisterSuccess';
import Home from './Pages/Home';
import Book from './Pages/Book';
import FieldList from './Pages/FieldList';
import FieldMap from './Pages/FieldMap';
import BookFieldMap from './Pages/Book/FieldMap';
import BookFieldList from './Pages/Book/FieldList';
import CheckIn from './Pages/CheckIn';
import Appointments from './Pages/Appointments';
import FieldDetails from './Pages/FieldDetails';
import BookSuccess from './Pages/BookSuccess';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
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
                    path="/book-success"
                    element={<BookSuccess />}
                >
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
                    path="/field-details/:id"
                    element={<FieldDetails />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;