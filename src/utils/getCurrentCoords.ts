const getCurrentCoords = () => (new Promise<GeolocationCoordinates>((res) => {
    navigator.geolocation.getCurrentPosition((pos) => {
        res(pos.coords);
    });
}));

export default getCurrentCoords;