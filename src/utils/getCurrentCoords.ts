export const defaultCoords = {
    accuracy: 14.663,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 25.01387058495358,
    longitude: 121.5382014611378,
    speed: null
};

const getCurrentCoords = () => (new Promise<GeolocationCoordinates>((res) => {
    try {
        navigator.geolocation.getCurrentPosition((pos) => {
            res(pos.coords);
        });
    } catch {
        res(defaultCoords);
    }
}));

export default getCurrentCoords;