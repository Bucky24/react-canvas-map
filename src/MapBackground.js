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

const MapBackground = ({ background, x, y, width, height, cellSize, xOff, yOff }) => {
    return <CanvasContext.Consumer>
        {({ context, getImage, forceRerender }) => {
            if (!context) {
                return null;
            }
            context.save();

            const { color, image } = background;

            if (color) {
                context.beginPath();
                context.fillStyle = color;
                context.rect(x,y,width,height);
                context.fill();
            } else if (image) {
                const img = getImage(image, forceRerender);

                if (img) {
                    //context.rect(0,0,width,height);
                    //context.clip();


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
