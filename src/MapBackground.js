import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useWithContext } from '@bucky24/react-canvas';

import { Background } from './shapes';
import useDims from './useDims';
import MapContext from './MapContext';

const propTypes = {
    background: Background.isRequired,
    offMap: PropTypes.bool.isRequired,
};

const MapBackground = ({
    background,
    offMap,
}) => {
    const withContext = useWithContext();

    return withContext((context) => {
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
    });
}

MapBackground.propTypes = propTypes;

export default MapBackground;
