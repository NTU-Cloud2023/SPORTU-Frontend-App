import './button.scss';

export interface ButtonProps {
    text: string
}

const Button = ({
    text
}: ButtonProps) => {
    return (
        <div className="btn-container">
            <div className="primary-btn">
                {text}
            </div>
        </div>
    );
};

export default Button;