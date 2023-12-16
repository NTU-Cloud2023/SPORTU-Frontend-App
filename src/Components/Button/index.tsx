import './button.scss';

export interface ButtonProps {
    text: string,
    onClick?: () => void
}

const Button = ({
    text,
    onClick= () => {}
}: ButtonProps) => {
    return (
        <div
            className="btn-container"
            onClick={onClick}
        >
            <div className="primary-btn">
                {text}
            </div>
        </div>
    );
};

export default Button;