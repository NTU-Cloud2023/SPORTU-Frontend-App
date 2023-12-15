import './title.scss';

const LeftSubTitle = ({
    title,
    color='content'
}: {
    title: string,
    color?: LayoutColors
}) => {
    return (
        <div className={`body-title left color-${color} m`}>
            {title}
        </div>
    );
};

export default LeftSubTitle;