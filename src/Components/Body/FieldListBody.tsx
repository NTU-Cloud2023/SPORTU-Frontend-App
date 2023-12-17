import { textMap } from '../../i18n/textMap';
import './fieldListBody.scss';
import FieldCard from '../FieldCard';
import { useContext, useEffect, useState } from 'react';
import { GlobDataContext } from '../../Contexts/GlobDataProvider';
import PillButton from '../PillButton';
import LeftTitle from '../Title/LeftTitle';
import SortFieldsPopUp from '../PopUp/SortFieldsPopUp';

const FieldListBody = () => {
    const {
        fetchFields,
        fetchingFields,
        fields
    } = useContext(GlobDataContext);
    const [openSort, setOpenSort] = useState(false);
    const [selectedSport, setSelectedSport] = useState('all');

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
                            onClick={() => setOpenSort(true)}
                        />
                    </div>
                </div>

                {
                    fields.map((field) => (
                        selectedSport === 'all'
                            || field.ball_type.game_name === selectedSport
                            ? (
                                <FieldCard
                                    field={{...field}}
                                    key={`field_list_body_${field.id}`}
                                />
                            ) : ''
                    ))
                }
                <div className="empty-check">
                    沒有符合條件的球場
                </div>
            </div>
            {
                openSort
                    ? (
                        <SortFieldsPopUp
                            selectedSport={selectedSport}
                            setSelectedSport={setSelectedSport}
                            closePopup={() => setOpenSort(false)}
                        />
                    ) : ''
            }
        </div>
    );
};

export default FieldListBody;