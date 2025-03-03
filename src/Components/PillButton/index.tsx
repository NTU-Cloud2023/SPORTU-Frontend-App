import { CSSProperties } from 'react';
import './pillButton.scss';

export type IconType = '' | 'none' | 'left-triangle' | 'map' | 'control' | 'nav' | 'pin'

export interface PillButtonProps {
    text: string,
    onClick: () => void,
    type?: IconType,
    style?: CSSProperties
    color?: LayoutColors
}

const PillButton = ({
    text,
    onClick,
    type='left-triangle',
    color,
    style={}
}: PillButtonProps) => {
    return (
        <div
            className="pill-btn-container"
            style={style}
        >
            <div
                className={`pill-btn ${color}`}
                onClick={onClick}
            >
                {
                    type !== 'none'
                        ? <div className={`icon ${type}`}></div>
                        : ''
                }
                {text}
            </div>
        </div>
    );
};

export default PillButton;