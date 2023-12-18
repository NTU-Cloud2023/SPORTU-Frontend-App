const getPrevHourTimestamp = () => {
    const date = new Date().getTime();
    const rest = new Date().getTime() % 3600000;
    return date - rest;
};

export default getPrevHourTimestamp;