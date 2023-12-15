import SecondaryTitle from '../Title/SecondaryTitle';
import { textMap } from '../../i18n/textMap';
import './fieldListBody.scss';
import FieldCard from '../FieldCard';
import { useContext, useEffect } from 'react';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';

const NearByBody = () => {

    const {
        fetchFields,
        fetchingFields,
        fields
    } = useContext(GlobDataContext);

    useEffect(() => {
        if (fields.length === 0 && fetchingFields === false) {
            fetchFields();
        }
    }, [fields]);

    return (
        <div className="field-list-body">
            <div className="wrapper">
                <SecondaryTitle title={textMap.near_field_title} />

                {
                    fields.map((field) => (
                        <FieldCard
                            {...field}
                            key={field.id}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default NearByBody;