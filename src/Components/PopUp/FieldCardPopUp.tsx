import { FieldAPIResponse } from '../../API/APIInterface';
import FieldCard from '../FieldCard';
import SelectableFieldCard from '../FieldCard/SelectableFieldCard';
import './popUp.scss';


export interface FieldCardPopUpProps {
    field: FieldAPIResponse,
    setField: (f: FieldAPIResponse) => void,
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
                    <SelectableFieldCard
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