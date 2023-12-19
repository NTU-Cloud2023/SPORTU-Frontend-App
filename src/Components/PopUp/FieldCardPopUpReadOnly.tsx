import { useNavigate } from 'react-router-dom';
import { UpdatedFieldData } from '../../Contexts/GlobDataProvider';
import FieldCard from '../FieldCard';
import './popUp.scss';
import { getNextHourTimestamp } from '../../utils';


export interface FieldCardPopUpReadOnlyProps {
    field: UpdatedFieldData,
    closePopup: () => void
}

const FieldCardPopUpReadOnly = ({
    field,
    closePopup
}: FieldCardPopUpReadOnlyProps) => {
    const navigate = useNavigate();

    return (
        <div className="field-card-pop-up">
            <div className="wrapper">
                <div className="card-container">
                    <FieldCard
                        field={field}
                        onClick={() => {
                            navigate('/book', {
                                state: {
                                    field: field,
                                    timestamp: (getNextHourTimestamp() / 1000).toString()
                                }
                            });
                        }}
                    />
                </div>
            </div>
            <div
                className="bg"
                onClick={() => closePopup()}
            >
            </div>
        </div>
    );
};

export default FieldCardPopUpReadOnly;