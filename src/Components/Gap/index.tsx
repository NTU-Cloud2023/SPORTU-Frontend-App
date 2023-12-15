import { CSSProperties } from 'react';

const Gap = ({h, c=undefined}: {h: string, c?: string}) => {
    const style: CSSProperties = {
        height: h,
        ...c ? {backgroundColor: c} : {}
    };

    return (
        <div style={style}></div>
    );
};

export default Gap;