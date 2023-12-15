import getCurrentCoords from './getCurrentCoords';
import getDistanceFromLatLonInKm from './getDistanceFromLatLonInKm';

const getDistance = async (lon: number, lat: number) => {
    const coords = await getCurrentCoords();
    const d = getDistanceFromLatLonInKm(
        coords.latitude,
        coords.longitude,
        lon,
        lat
    );
    return Math.round(d);
};

export default getDistance;