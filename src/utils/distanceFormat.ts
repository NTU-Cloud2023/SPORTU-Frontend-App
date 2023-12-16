const distanceFormat = (m: number) => {
    m = Math.round(m);
    // const m_remain = m % 1000;
    // let k_remain = NaN;
    // let str = '';
    // if (m_remain !== m) {
    //     k_remain = (m - m_remain) / 1000;
    //     str += `${k_remain}k`;
    // }
    // str += `${m_remain}m`;
    // return str;
    return Math.round(m / 10) / 100;
};

export default distanceFormat;