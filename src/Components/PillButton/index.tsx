import './pillButton.scss';

export interface PillButtonProps {
    text: string,
    onClick: () => void
}

const PillButton = ({
    text,
    onClick
}: PillButtonProps) => {
    return (
        <div className="pill-btn-container">
            <div
                className="pill-btn"
                onClick={() => onClick()}
            >
                <div className="icon left-triangle"></div>
                {text}
            </div>
        </div>
    );
};

export default PillButton;