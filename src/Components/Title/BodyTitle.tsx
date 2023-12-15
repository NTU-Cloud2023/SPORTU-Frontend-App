import './title.scss';

const BodyTitle = ({
    title
}: {
    title: string
}) => {
    return (
        <div className="body-title primary">
            {title}
        </div>
    );
};

export default BodyTitle;

