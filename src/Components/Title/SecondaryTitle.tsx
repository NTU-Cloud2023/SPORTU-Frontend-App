import './title.scss';

const SecondaryTitle = ({
    title
}: {
    title: string
}) => {
    return (
        <div className="body-title secondary">
            {title}
        </div>
    );
};

export default SecondaryTitle;

