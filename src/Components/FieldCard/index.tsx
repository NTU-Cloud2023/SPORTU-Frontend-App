import { useEffect, useState } from 'react';
import './fieldCard.scss';
import { textMap } from '../../i18n/textMap';
import { FieldAPIResponse } from '../../API/APIInterface';
import { useNavigate } from 'react-router-dom';
import getDistance from '../../utils/getDistance';

export interface FieldCardProps extends FieldAPIResponse {
    distance: number
}

const FieldCard = (props: FieldAPIResponse) => {
    const [dist, setDist] = useState<number>(NaN);
    const navigate = useNavigate();

    useEffect(() => {
        getDistance(
            +props.longitude,
            +props.latitude
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
                            backgroundImage: `url(${props?.pic})`
                        }}
                    >
                    </div>
                </div>

                <div className="status-container">
                    <div className="text-pill dark">
                        使用人數{props.headcount}/{props.capacity}
                    </div>
                    <div className="text-pill dark">
                        {props.ball_type.cht_game_name}
                    </div>
                    <div
                        className="text-pill primary"
                        onClick={() => navigate('/field-details/' + props.id)}
                    >

                        {textMap.detailed_information}
                    </div>
                </div>

                <div className="field-title">
                    {props.name}
                </div>
                <div className="field-address">
                    <div className="icon nav"></div>{props.address}
                </div>
                <div className="field-position">
                    <div className="icon pin"></div>{props.latitude}, {props.longitude}
                </div>
            </div>
        </div>
    );
};

export default FieldCard;