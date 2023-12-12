import { useEffect, useState } from 'react';
import './fieldCard.scss';
import { textMap } from '../../i18n/textMap';

export interface BallType {
    type: number,
    game_name: string,
    cht_game_name: string
}

export interface FieldAPIResponse {
    id: number,
    name: string,
    latitude: string,
    longitude: string,
    capacity: number,
    type: number,
    ball_type: BallType,
    headcount: number,
    updated_at: string,
    created_at: string
}

export interface FieldCardProps extends FieldAPIResponse {
    distance: number
}

const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d;
};

const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
};

const get_current_coords = () => (new Promise<GeolocationCoordinates>((res) => {
    navigator.geolocation.getCurrentPosition((pos) => {
        res(pos.coords);
    });
}));

const cal_distance = async (lon: number, lat: number) => {
    const coords = await get_current_coords();
    const d = getDistanceFromLatLonInKm(
        coords.latitude,
        coords.longitude,
        lon,
        lat
    );
    return Math.round(d);
};

const FieldCard = (props: FieldAPIResponse) => {
    const [dist, setDist] = useState<number>(NaN);

    useEffect(() => {
        cal_distance(
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
                    <div className="field-img"></div>
                </div>

                <div className="status-container">
                    <div className="text-pill dark">
                        使用人數{props.headcount}/{props.capacity}
                    </div>
                    <div className="text-pill dark">
                        {props.ball_type.cht_game_name}
                    </div>
                    <div className="text-pill primary">

                        {textMap.detailed_information}
                    </div>
                </div>

                <div className="field-title">
                    {props.name}
                </div>
                <div className="field-address">
                    <div className="icon nav"></div>無
                </div>
                <div className="field-position">
                    <div className="icon pin"></div>{props.latitude}, {props.longitude}
                </div>
            </div>
        </div>
    );
};

export default FieldCard;