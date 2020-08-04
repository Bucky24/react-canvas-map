import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
    Images,
    Image,
    Clip,
    renderToImage,
} from '@bucky24/react-canvas';
import useDeepCompareEffect from 'use-deep-compare-effect';

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
    cellWidth: PropTypes.number.isRequired,
    cellHeight: PropTypes.number.isRequired,
}

const getComponents = ({ layer, cellSize }, onLoad) => {
    const cellToReal = (cellX, cellY, cellWidth, cellHeight) => {
        const result = {
            x: cellX * cellSize,
            y: cellY * cellSize,
        };

        if (cellWidth) {
            result.width = cellWidth * cellSize;
        }

        if (cellHeight) {
            result.height = cellHeight * cellSize;
        }

        return result;
    }

    const getImage = (imageData) => {
		const { xOff, yOff, rot } = imageData;

        const rect = cellToReal(
            imageData.cellX + (xOff || 0),
            imageData.cellY + (yOff || 0),
            imageData.cellWidth,
            imageData.cellHeight,
        );

        return {
            src: imageData.src,
            ...rect,
            rot,
        };
    }

    const components = [];

    const images = [];

    if (layer.images) {
        for (let i=0;i<layer.images.length;i++) {
            const imageData = layer.images[i];

            const image = getImage(imageData);
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
            onLoad={onLoad}
        />);
    }

    if (texts.length > 0) {
        components.push(<MapText
            key="text"
            x={0}
            y={0}
            xOff={0}
            yOff={0}
            cellSize={cellSize}
            texts={texts}
        />);
    }

    return components;
}

const MapLayer = (props) => {
    const {
        layer,
        x,
        y,
        width,
        height,
        xOff,
        yOff,
        cellSize,
        cellWidth,
        cellHeight,
        rerender,
    } = props;
    const imageRef = useRef(null);

    const totalWidth = cellSize * cellWidth;
    const totalHeight = cellSize * cellHeight;

    const onImageLoad = () => {
        const components = getComponents(props, onImageLoad);
        rebuildImage(components);
    }

    const rebuildImage = (components, doRender=true) => {
        const image = renderToImage(components, totalWidth, totalHeight);
        imageRef.current = image;
        if (doRender) {
            setTimeout(() => {
                rerender();
            }, 1);
        }
    }

    useDeepCompareEffect(() => {
        const components = getComponents(props);
        rebuildImage(components);
    }, [layer, x, y, width, height, cellSize]);

    if (!imageRef.current) {
        const components = getComponents(props, onImageLoad);
        rebuildImage(components, false);
    }

    return <Clip
        x={x}
        y={y}
        width={width}
        height={height}
    >
        { imageRef.current && <Image
            src={imageRef.current}
            x={x+xOff}
            y={y+yOff}
            width={totalWidth}
            height={totalHeight}
        />}
    </Clip>;
}

MapLayer.propTypes = propTypes;

export default MapLayer;