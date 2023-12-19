import { useEffect, useMemo, useState } from 'react';
import { SportAPIResponse } from '../../API/APIInterface';
import SelectInputBar, { SelectOption } from '.';

export interface SelectInputBarProps {
    sports: SportAPIResponse[],
    setSport: (s: SportAPIResponse|undefined) => void,
    clearField?: () => void
}

const SelectSportInputBar = ({
    sports,
    setSport,
    clearField
}: SelectInputBarProps) => {
    const sportOptions = useMemo<SelectOption[]>(() => {
        const opts = sports.map<SelectOption>((sport) => ({
            text: sport.cht_game_name,
            value: sport.type.toString()
        }));

        return opts;
    }, [sports]);
    const [type, setType] = useState('');

    useEffect(() => {
        if (type !== '') {
            setSport(
                sports.find((s) => s.type === +type)
            );
        }
    }, [type]);

    return (
        <SelectInputBar
            options={sportOptions}
            setValue={setType}
            clearField={clearField}
        />
    );
};

export default SelectSportInputBar;