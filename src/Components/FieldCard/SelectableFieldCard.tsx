import { useEffect, useState } from 'react';
import './fieldCard.scss';
import { textMap } from '../../i18n/textMap';
import { FieldAPIResponse } from '../../API/APIInterface';
import { useNavigate } from 'react-router-dom';
import getDistance from '../../utils/getDistance';
import Button from '../Button';

export interface FieldCardPopUpProps {
    field: FieldAPIResponse,
    onClick: () => void
}

const SelectableFieldCard = ({
    field,
    onClick
}: FieldCardPopUpProps) => {
    const [dist, setDist] = useState<number>(NaN);
    const navigate = useNavigate();

    useEffect(() => {
        getDistance(
            +field.longitude,
            +field.latitude
        ).then((d) => setDist(d));
    }, []);

    return (
        <div className="field-card">
            <div className="card-body">
                <div className="field-img-container">
                    <div className="distance-tag">
                        <div className="icon walking"></div>
                        {dist}m
                    </div>
                    <div
                        className="field-img"
                        style={{
                            backgroundImage: `url(${field?.pic})`
                        }}
                    >
                    </div>
                </div>

                <div className="status-container">
                    <div className="text-pill dark">
                        使用人數{field.headcount}/{field.capacity}
                    </div>
                    <div className="text-pill dark">
                        {field.ball_type.cht_game_name}
                    </div>
                    <div
                        className="text-pill primary"
                        onClick={() => navigate('/field-details/' + field.id)}
                    >

                        {textMap.detailed_information}
                    </div>
                </div>

                <div className="field-title">
                    {field.name}
                </div>
                <div className="field-address">
                    <div className="icon nav"></div>{field.address}
                </div>
                <div className="field-position">
                    <div className="icon pin"></div>{field.latitude}, {field.longitude}
                </div>

                <div className="mb-4"></div>

                <Button
                    text="選擇球場"
                    onClick={onClick}
                />
            </div>
        </div>
    );
};

export default SelectableFieldCard;