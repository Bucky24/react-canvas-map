import React from 'react';
import PropTypes from 'prop-types';
import { Images, CanvasComponent, Container } from '@bucky24/react-canvas';

import {
    Layer,
} from './shapes';
import MapText from './MapText';

const propTypes = {
    layer: Layer.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xOff: PropTypes.number.isRequired,
    yOff: PropTypes.number.isRequired,
    cellSize: PropTypes.number.isRequired,
}

class MapLayer extends CanvasComponent {
    cellToReal(cellX, cellY, cellWidth, cellHeight) {
        const { x, y, xOff, yOff, cellSize } = this.props;

        const result = {
            x: cellX * cellSize + x + xOff,
            y: cellY * cellSize + y + yOff,
        };

        if (cellWidth) {
            result.width = cellWidth * cellSize;
        }

        if (cellHeight) {
            result.height = cellHeight * cellSize;
        }

        return result;
    }

    getImage(imageData) {
        const {  x, y, width, height } = this.props;
		const { xOff, yOff } = imageData;

        const rect = this.cellToReal(
            imageData.cellX + (xOff || 0),
            imageData.cellY + (yOff || 0),
            imageData.cellWidth,
            imageData.cellHeight,
        );

        let clip = {
            x: 0,
            y: 0,
            width: rect.width,
            height: rect.height,   
        };

        if (rect.x < x) {
            const overlap = x - rect.x;
            if (overlap > rect.width) {
                // we're off the map completely, no point to drawing
                return null;
            }

            clip.x = overlap;
            rect.x = x;
        }

        if (rect.y < y) {
            const overlap = y - rect.y;
            if (overlap > rect.height) {
                return null
            }

            clip.y = overlap;
            rect.y = y;
        }


        if (rect.x + rect.width > x + width) {
            const overlap = (rect.x + rect.width) - (x + width);
            if (overlap > rect.width) {
                // we're off the map completely, no point to drawing
                return null;
            }

            const nonOverlapPercent = 1 - (overlap / rect.width);

            rect.width -= overlap;
            // basically the clip width is whatever portion of the current rect is NOT overlapped
            clip.width = rect.width * nonOverlapPercent;
        }

        if (rect.y + rect.height > y + height) {
            const overlap = (rect.y + rect.height) - (y + height);
            if (overlap > rect.height) {
                // we're off the map completely, no point to drawing
                return null;
            }

            const nonOverlapPercent = 1 - (overlap / rect.height);

            rect.height -= overlap;
            // basically the clip width is whatever portion of the current rect is NOT overlapped
            clip.height = rect.height * nonOverlapPercent;
        }

        return {
            src: imageData.src,
            ...rect,
            clip,
        };
    }

    render() {
        const { layer, x, y, width, height, cellSize, xOff, yOff } = this.props;

        const components = [];

        const images = [];

        if (layer.images) {
            for (let i=0;i<layer.images.length;i++) {
                const imageData = layer.images[i];

                const image = this.getImage(imageData);
                if (image) {
                    images.push(image);
                }
            }
        }

        const texts = [];
        if (layer.text) {
            for (let i=0;i<layer.text.length;i++) {
                const textData = layer.text[i];

                texts.push({
                    text: textData.text,
                    hAlign: textData.hAlign,
                    vAlign: textData.vAlign,
                    font: textData.font,
                    cellX: textData.cellX,
                    cellY:textData.cellY,
                });
            }
        }

        if (images.length > 0) {
            components.push(<Images
                key="images"
                images={images}
            />);
        }

        if (texts.length > 0) {
            components.push(<MapText
                key="text"
                x={x}
                y={y}
                height={height}
                width={width}
                xOff={xOff}
                yOff={yOff}
                cellSize={cellSize}
                texts={texts}
            />);
        }

        if (components.length === 0) {
            return null;
        }

        return <Container>
            { components }
        </Container>;
    }
}

MapLayer.propTypes = propTypes;

export default MapLayer;