import './selectableInputBar.scss';

export interface SelectableInputBarProps {
    text: string,
    onClick: () => void
}

const SelectableInputBar = ({
    text,
    onClick
}: SelectableInputBarProps) => {
    return (
        <div
            className="selectable-input-bar"
            onClick={() => onClick()}
        >
            <div className="selectable-input">
                {text}
            </div>
        </div>
    );
};

export default SelectableInputBar;