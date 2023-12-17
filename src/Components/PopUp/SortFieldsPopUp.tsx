import { useContext, useEffect, useState } from 'react';
import { GlobDataContext, SortTypes } from '../../Contexts/GlobDataProvider';
import './popUp.scss';
import PillButton from '../PillButton';
import Gap from '../Gap';


export interface SortFieldsPopUpProps {
    selectedSport: string,
    setSelectedSport: (sport: string) => void,
    closePopup: () => void,
    sort?: boolean,
    filter?: boolean
}

interface SortButtonProps {
    text: '無'|'距離優先'|'時間優先',
    value: SortTypes
}

const sortButtons: SortButtonProps[] = [
    {text: '無', value: 'id'}, {text: '距離優先', value: 'distance'}, {text: '時間優先', value: 'time'}
];

const SortFieldsPopUp = ({
    selectedSport,
    setSelectedSport,
    closePopup,
    sort=true,
    filter=true
}: SortFieldsPopUpProps) => {
    const {
        sports,
        sortFields,
        fetchingSports,
        fetchSports
    } = useContext(GlobDataContext);
    const [selectedSort, setSelectedSort] = useState<SortTypes>('id');

    useEffect(() => {
        if (sports.length === 0 && fetchingSports === false) {
            fetchSports();
        }
    }, []);

    return (
        <div className="sort-field-pop-up">
            <div className="wrapper">
                <div className="flex flex-wrap mb-2">
                    {
                        sortButtons.map((btn, idx) => (
                            <div
                                className="mr-3 mb-2"
                                key={`sort-btn${idx}`}
                            >
                                <PillButton
                                    text={btn.text}
                                    color={selectedSort === btn.value ? 'primary' : undefined}
                                    onClick={() => {
                                        setSelectedSort(btn.value);
                                        sortFields(btn.value);
                                    }}
                                    type="none"
                                />
                            </div>
                        ))
                    }
                </div>
                {
                    filter ? (
                        <Gap
                            h="1px"
                            c="#AAAAAA"
                        />
                    ) : ''
                }
                <div className={`flex flex-wrap mt-4 ${filter ? '' : 'hidden'}`}>
                    <div className="mr-3 mb-2">
                        <PillButton
                            text="全部"
                            color={selectedSport === 'all' ? 'primary' : undefined}
                            onClick={() => setSelectedSport('all')}
                            type="none"
                        />
                    </div>
                    {
                        sports.map((sport, idx) => (
                            <div
                                className="mr-3 mb-2"
                                key={`filter-btn${idx}`}
                            >
                                <PillButton
                                    text={sport.cht_game_name}
                                    color={selectedSport === sport.game_name ? 'primary' : undefined}
                                    onClick={() => setSelectedSport(sport.game_name)}
                                    type="none"
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="right-top-button">
                    <div
                        className="icon cancel xl"
                        onClick={closePopup}
                    >
                    </div>
                </div>
            </div>
            {/* <div
                className="bg"
                onClick={closePopup}
            >
            </div> */}
        </div>
    );
};

export default SortFieldsPopUp;