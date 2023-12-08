import Header from '../../Components/Header';
import Book from '../Book';
import FieldList from '../FieldList';
import './home.scss';

const Home = () => {
    return (
        <div className="home">
            <Header/>
            <Book/>
            <FieldList/>
        </div>
    );
};

export default Home;