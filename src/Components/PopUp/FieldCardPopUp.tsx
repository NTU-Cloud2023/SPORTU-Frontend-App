import { UpdatedFieldData } from '../../Contexts/GlobDataProvider';
import FieldCard from '../FieldCard';
import './popUp.scss';


export interface FieldCardPopUpProps {
    field: UpdatedFieldData,
    setField: (f: UpdatedFieldData) => void,
    closeSelection: () => void
    closePopup: () => void
}

const FieldCardPopUp = ({
    field,
    setField,
    closeSelection,
    closePopup
}: FieldCardPopUpProps) => {
    return (
        <div className="field-card-pop-up">
            <div className="wrapper">
                <div className="card-container">
                    <FieldCard
                        field={field}
                        onClick={() => {
                            setField(field);
                            closeSelection();
                            closePopup();
                        }}
                    />
                </div>
            </div>
            <div
                className="bg"
                onClick={() => closeSelection()}
            >
            </div>
        </div>
    );
};

export default FieldCardPopUp;