import React from 'react';
import PropTypes from 'prop-types';
import { CanvasContext } from '@bucky24/react-canvas';

import { Background } from './shapes';

const propTypes = {
    background: Background.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cellSize: PropTypes.number.isRequired,
    xOff: PropTypes.number.isRequired,
    yOff: PropTypes.number.isRequired,
};

const MapBackground = ({
    background,
    x,
    y,
    width,
    height,
    cellSize,
    xOff,
    yOff,
    viewWidth,
    viewHeight,
}) => {
    return <CanvasContext.Consumer>
        {({ context, getImage, forceRerender }) => {
            if (!context) {
                return null;
            }
            context.save();

            const { color, image } = background;

            const screenX = x + viewWidth;
            const screenY = y + viewHeight;
            const bottomX = x + xOff;
            const bottomY = y + yOff;
            const topX = bottomX + width;
            const topY = bottomY + height;

            const finalBotX = Math.max(x, x+xOff);
            const finalBotY = Math.max(y, y+yOff);
            const finalTopX = Math.min(screenX, topX);
            const finalTopY = Math.min(screenY, topY);
    
            let finalWidth = Math.max(0, finalTopX - finalBotX);
            let finalHeight = Math.max(0, finalTopY - finalBotY);

            if (color) {
                context.beginPath();
                context.fillStyle = color;
                context.rect(finalBotX,finalBotY,finalWidth,finalHeight);
                context.fill();
            } else if (image) {
                const img = getImage(image, forceRerender);

                if (img) {
                    context.rect(x,y,width,height);
                    context.clip();

                    // https://stackoverflow.com/questions/33337346/canvas-resize-image-object-and-repeat-pattern
                    // need a createPattern function in canvas context
                    const ptrn = context.createPattern(img, 'repeat');
                    context.fillStyle = ptrn;
                    context.fillRect(x, y, width, height);
                }
            }

            context.restore();
        }}
    </CanvasContext.Consumer>
}

MapBackground.propTypes = propTypes;

export default MapBackground;
