import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CanvasContext } from '@bucky24/react-canvas';

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
    const dims = useDims();
    const { x, y, width, height } = useContext(MapContext);

    const offMapBoundary = [
        { x, y },
        { x: x+width, y },
        { x: x+width, y: y+height },
        { x, y: y+height },
    ]

    const borderBoundaries = offMap ? offMapBoundary : dims;

    return <CanvasContext.Consumer>
        {({ context, getImage, forceRerender }) => {
            if (!context) {
                return null;
            }
            context.save();

            const clipRegion = new Path2D();
            clipRegion.rect(x, y, width, height);
            context.clip(clipRegion);

            const { color, image } = background;

            context.beginPath();
            if (color) {
                context.fillStyle = color;
            } else if (image) {
                const img = getImage(image, forceRerender);

                if (img) {
                    // https://stackoverflow.com/questions/33337346/canvas-resize-image-object-and-repeat-pattern
                    // need a createPattern function in canvas context
                    const ptrn = context.createPattern(img, 'repeat');
                    context.fillStyle = ptrn;
                }
            }
            console.log(borderBoundaries, offMap);
            context.moveTo(borderBoundaries[0].x, borderBoundaries[0].y);
            context.lineTo(borderBoundaries[1].x, borderBoundaries[1].y);
            context.lineTo(borderBoundaries[2].x, borderBoundaries[2].y);
            context.lineTo(borderBoundaries[3].x, borderBoundaries[3].y);
            context.fill();

            context.restore();
        }}
    </CanvasContext.Consumer>
}

MapBackground.propTypes = propTypes;

export default MapBackground;
