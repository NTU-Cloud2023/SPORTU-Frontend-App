import { useMemo } from 'react';
import AppointmentsBody from './AppointmentsBody';
import BookBody from './BookBody';
import BookFieldListBody from './BookFieldListBody';
import BookFieldMapBody from './BookFieldMapBody';
import CheckInBody from './CheckInBody';
import FieldDetailsBody from './FieldDetailsBody';
import FieldListBody from './FieldListBody';
import FieldMapBody from './FieldMapBody';
import NearByBody from './NearByBody';
import BookSuccessBody from './BookSuccessBody';

type BodyProps = {
	page: PageName;
};

const Body = ({
    page
}: BodyProps) => {
    const bodyDistributer = useMemo(() => {
        if (page === 'home') {
            return (
                <>
                    <BookBody />
                    <NearByBody />
                </>
            );
        } else if (page === 'book') {
            return <BookBody />;
        } else if (page === 'book__field-map')  {
            return <BookFieldMapBody />;
        } else if (page === 'book__field-list') {
            return <BookFieldListBody />;
        } else if (page === 'field-list') {
            return <FieldListBody />;
        } else if (page === 'field-map') {
            return <FieldMapBody />;
        } else if (page === 'check-in') {
            return <CheckInBody />;
        } else if (page === 'appointments') {
            return <AppointmentsBody />;
        } else if (page === 'field-details') {
            return <FieldDetailsBody />;
        } else if (page === 'book-success') {
            return <BookSuccessBody />;
        }
    }, [page]);

    return (
        <div>
            {bodyDistributer}
        </div>
    );
};

export default Body;