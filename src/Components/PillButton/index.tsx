import { CSSProperties } from 'react';
import './pillButton.scss';

export type IconType = '' | 'left-triangle' | 'map' | 'control' | 'nav' | 'pin'

export interface PillButtonProps {
    text: string,
    onClick: () => void,
    type?: IconType,
    style?: CSSProperties
}

const PillButton = ({
    text,
    onClick,
    type='left-triangle',
    style={}
}: PillButtonProps) => {
    return (
        <div
            className="pill-btn-container"
            style={style}
        >
            <div
                className="pill-btn"
                onClick={onClick}
            >
                <div className={`icon ${type}`}></div>
                {text}
            </div>
        </div>
    );
};

export default PillButton;