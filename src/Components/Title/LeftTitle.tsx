import './title.scss';

const LeftTitle = ({
    title,
    color='content'
}: {
    title: string,
    color?: LayoutColors
}) => {
    return (
        <div className={`body-title left color-${color}`}>
            {title}
        </div>
    );
};

export default LeftTitle;