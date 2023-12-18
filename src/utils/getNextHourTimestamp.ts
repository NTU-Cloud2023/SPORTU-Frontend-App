const getNextHourTimestamp = () => {
    const date = new Date().getTime();
    const rest = new Date().getTime() % 3600000;
    return date - rest + (3600000 * ((rest > 1800000) ? 2 : 1));
};

export default getNextHourTimestamp;