import SecondaryTitle from '../Title/SecondaryTitle';
import { textMap } from '../../i18n/textMap';
import './fieldListBody.scss';
import FieldCard from '../FieldCard';
import { useContext, useEffect } from 'react';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';
import PillButton from '../PillButton';
import LeftTitle from '../Title/LeftTitle';

const FieldListBody = () => {

    const {
        fetchFields,
        fetchingFields,
        fields
    } = useContext(GlobDataContext);

    useEffect(() => {
        if (fields.length === 0 && fetchingFields === false) {
            fetchFields();
        }
    }, []);

    return (
        <div className="field-list-body">
            <div className="wrapper">
                <div className="flex items-center my-4 mx-2">
                    <LeftTitle
                        title="球場資訊"
                        color="primary"
                    />
                    <div className="ml-auto">

                        <PillButton
                            text={textMap.sorted_by}
                            type="control"
                            onClick={() => {}}
                        />
                    </div>
                </div>

                {
                    fields.map((field) => (
                        <FieldCard
                            field={{...field}}
                            key={`field_list_body_${field.id}`}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default FieldListBody;