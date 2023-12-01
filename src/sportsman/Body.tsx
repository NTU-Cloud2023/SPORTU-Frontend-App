import * as pages from '../pages';
import Home from './Home';
import ReserveNow from './ReserveNow';
import ReservationRecords from './ReservationRecords';
import CourtInformation from './CourtInformation';
import SignIn from './SignIn';
import Map from './Map';
import './body.scss';

type BodyProps = {
    page: number;
};

const Body = (props: BodyProps) => {
    return (
        <div className="body">
            {
                props.page === pages.SPORTSMAN_HOME ? <Home/> : <div/>
            }
            {
                props.page === pages.SPORTSMAN_RESERVE_NOW ? <ReserveNow/> : <div/>
            }
            {
                props.page === pages.SPORTSMAN_RESERVATION_RECORDS ? <ReservationRecords/> : <div/>
            }
            {
                props.page === pages.SPORTSMAN_COURT_INFORMATION ? <CourtInformation/> : <div/>
            }
            {
                props.page === pages.SPORTSMAN_SIGN_IN ? <SignIn/> : <div/>
            }
            {
                props.page === pages.SPORTSMAN_MAP ? <Map/> : <div/>
            }
        </div>
    );
};

export default Body;
