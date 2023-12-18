import './warningContent.scss';

interface WarningContentProps {
    content: string
}

const WarningContent = ({
    content
}: WarningContentProps) => {
    return (
        <div className="warning-content-body">
            <div className="wrapper">
                <div className="icon-body">
                    <div className="icon danger d-block mr-0"></div>
                </div>

                {content}
            </div>
        </div>
    );
};

export default WarningContent;