import { Stage } from '@pixi/react';
import './positioningAnimation.scss';

const PositioningAnimation = () => {
    return (
        <div className="positioning-animation" >
            <Stage
                width={window.innerHeight}
                height={window.innerHeight - 67}
                options={{
                    backgroundAlpha: 0
                }}
            >

            </Stage>
        </div>
    );
};

export default PositioningAnimation;