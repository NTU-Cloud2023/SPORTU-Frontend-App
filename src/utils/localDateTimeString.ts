const localDateTimeString = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export default localDateTimeString;