import { UpdatedFieldData } from '../../Contexts/GlobDataProvider';
import FieldCard from '../FieldCard';
import './popUp.scss';


export interface FieldCardPopUpReadOnlyProps {
    field: UpdatedFieldData,
    closePopup: () => void
}

const FieldCardPopUpReadOnly = ({
    field,
    closePopup
}: FieldCardPopUpReadOnlyProps) => {
    return (
        <div className="field-card-pop-up">
            <div className="wrapper">
                <div className="card-container">
                    <FieldCard field={field} />
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