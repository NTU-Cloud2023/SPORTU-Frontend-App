import AppointmentsBody from './AppointmentsBody';
import BookBody from './BookBody';
import BookFieldListBody from './BookFieldListBody';
import BookFieldMapBody from './BookFieldMapBody';
import CheckInBody from './CheckInBody';
import FieldDetailsBody from './FieldDetailsBody';
import FieldListBody from './FieldListBody';
import FieldMapBody from './FieldMapBody';

type BodyProps = {
	page: PageName;
};

const Body = (props: BodyProps) => {
    return (
        <div>
            {
                props.page === 'home' ?
                    <div>
                        <BookBody />
                        <FieldListBody />
                    </div>
                    :
                    <div />
            }
            {
                props.page === 'book' ?
                    <BookBody />
                    :
                    <div />
            }
            {
                props.page === 'book__field-map' ?
                    <BookFieldMapBody />
                    :
                    <div />
            }
            {
                props.page === 'book__field-list' ?
                    <BookFieldListBody />
                    :
                    <div />
            }
            {
                props.page === 'field-list' ?
                    <FieldListBody />
                    :
                    <div />
            }
            {
                props.page === 'field-map' ?
                    <FieldMapBody />
                    :
                    <div />
            }
            {
                props.page === 'check-in' ?
                    <CheckInBody />
                    :
                    <div />
            }
            {
                props.page === 'appointments' ?
                    <AppointmentsBody />
                    :
                    <div />
            }
            {
                props.page === 'field-details' ?
                    <FieldDetailsBody />
                    :
                    <div />
            }
        </div>
    );
};

export default Body;