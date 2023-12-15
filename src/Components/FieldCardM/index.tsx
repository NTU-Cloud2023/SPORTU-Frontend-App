import { useEffect, useState } from 'react';
import { FieldAPIResponse } from '../../API/APIInterface';
import './fieldCardM.scss';
import { getDistance } from '../../utils';
import Gap from '../Gap';

const FieldCardM = (props: FieldAPIResponse) => {
    const [dist, setDist] = useState(NaN);

    useEffect(() => {
        getDistance(
            +props.longitude,
            +props.latitude
        ).then((d) => {
            setDist(d);
        });
    }, []);

    return (
        <div className="field-card-m">
            <div className="card-body">
                <div className="title">
                    {props.name}
                </div>

                <Gap h="5px" />

                <div className="status-container">
                    <div className="text-pill dark">
                        {props.ball_type.cht_game_name}
                    </div>

                    <div className="text-pill dark">
                        使用人數 <span className="underline">{props.headcount}/{props.capacity}</span>
                    </div>

                    <div className="text-pill primary">
                        {dist}m
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FieldCardM;