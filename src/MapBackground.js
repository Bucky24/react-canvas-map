import React from 'react';
import PropTypes from 'prop-types';
import { CanvasContext } from '@bucky24/react-canvas';

import { Background } from './shapes';

const propTypes = {
    background: Background.isRequired,
    viewX: PropTypes.number.isRequired,
    viewY: PropTypes.number.isRequired,
    maxX: PropTypes.number.isRequired,
    maxY: PropTypes.number.isRequired,
    cellSize: PropTypes.number.isRequired,
    xOff: PropTypes.number.isRequired,
    yOff: PropTypes.number.isRequired,
    minX: PropTypes.number.isRequired,
    minY: PropTypes.number.isRequired,
};

const MapBackground = ({
    background,
    viewX,
    viewY,
    maxX,
    maxY,
    cellSize,
    xOff,
    yOff,
    viewWidth,
    viewHeight,
    minX,
    minY,
}) => {
    return <CanvasContext.Consumer>
        {({ context, getImage, forceRerender }) => {
            if (!context) {
                return null;
            }
            context.save();

            const { color, image } = background;

            const screenTopX = viewX + viewWidth;
            const screenTopY = viewY + viewHeight;
            const drawBotX = minX + xOff + viewX;
            const drawBotY = minY + yOff + viewY;
            const drawTopX = maxX + xOff + viewX;
            const drawTopY = maxY + yOff + viewY;

            const finalBotX = Math.max(viewX, Math.min(screenTopX, drawBotX));
            const finalBotY = Math.max(viewY, Math.min(screenTopY, drawBotY));
            const finalTopX = Math.max(viewX, Math.min(screenTopX, drawTopX));
            const finalTopY = Math.max(viewY, Math.min(screenTopY, drawTopY));
    
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
                    context.rect(viewX,viewY,width,height);
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
