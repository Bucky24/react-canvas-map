import React from 'react';
import PropTypes from 'prop-types';
import {
    Images,
    Image,
    Clip,
    renderToCanvas,
    CanvasComponent,
} from '@bucky24/react-canvas';
import isEqual from 'react-fast-compare';

import { VAlign, HAlign } from "./enums";

import {
    Layer,
} from './shapes';
import MapText from './MapText';
import useCellToReal from './useCellToReal';

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
    forceRenderCount: PropTypes.number.isRequired,
}

const useGetComponents = () => {
    const cellToReal = useCellToReal();

    return ({ layer, cellSize, xOff: viewX, yOff: viewY, x, y, renderAsImage }, { minXOff, minYOff }) => {
        const getImage = (imageData) => {
            const { xOff, yOff, rot, vAlign } = imageData;

            const rect = cellToReal(
                imageData.cellX + (xOff || 0),
                imageData.cellY + (yOff || 0),
                imageData.cellWidth,
                imageData.cellHeight,
            );

            rect.x = rect.drawX;
            rect.y = rect.drawY;
            rect.height = rect.drawHeight;
            rect.width = rect.drawWidth;

            if (renderAsImage) {
                rect.x -= minXOff;
                rect.y -= minYOff;
            }

            if (vAlign === VAlign.CENTER) {
                rect.y -= rect.height/2 - cellSize/2;
            } else if (vAlign === VAlign.BOTTOM) {
                rect.y -= rect.height - cellSize;
            }

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

        let rawElements = []
        if (layer.raw && layer.raw.drawFunc) {
            const viewOffX = renderAsImage ? -minXOff : (viewX || 0) + x;
            const viewOffY = renderAsImage ? -minYOff : (viewY || 0) + y;

            const func = layer.raw.drawFunc;
            for (const cell of layer.raw.cells) {
                const { cellX, cellY, id, cellWidth, cellHeight } = cell;
                let newElements = func({
                    x: cellX*cellSize + viewOffX,
                    y: cellY*cellSize + viewOffY,
                    width: cellWidth*cellSize,
                    height: cellHeight*cellSize,
                    id,
                });
                if (!Array.isArray(newElements)) {
                    newElements = [newElements];
                }
                rawElements = [
                    ...rawElements,
                    ...newElements,
                ];
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
                x={renderAsImage ? 0 : x}
                y={renderAsImage ? 0 : y}
                xOff={renderAsImage ? 0 : viewX}
                yOff={renderAsImage ? 0 : viewY}
                cellSize={cellSize}
                texts={texts}
                cellToReal={cellToReal}
            />);
        }

        for (const rawElement of rawElements) {
            components.push(rawElement);
        }

        return components;
    }
}

class MapLayer extends CanvasComponent {
    constructor(props) {
        super(props);

        this.imageRef = null;
        this.lastProps = null;
    }

    getLayerDims() {
        const { renderAsImage, layer, cellSize } = this.props;

        let minXOff = 0;
        let minYOff = 0;
        let maxXOff = 0;
        let maxYOff = 0;
        if (renderAsImage) {
            let minX = 0;
            let minY = 0;
            let maxX = 0;
            let maxY = 0;
    
            if (layer.images) {
                layer.images.forEach(({ cellX, cellY, cellWidth, cellHeight, vAlign }) => {
                    minX = Math.min(cellX, minX);
                    minY = Math.min(cellY, minY);
                    maxX = Math.max(cellX+cellWidth, maxX);
                    maxY = Math.max(cellY+cellHeight, maxY);
                    // not the most efficient, takes up more space than needed.
                    if (vAlign === VAlign.CENTER) {
                        minY = Math.min(cellY - cellHeight, minY);
                    } else if (vAlign === VAlign.BOTTOM) {
                        minY = Math.min(cellY - cellHeight, minY);
                    }
                });
            }

            if (layer.text) {
                layer.text.forEach(({ cellX, cellY }) => {
                    minX = Math.min(cellX, minX);
                    minY = Math.min(cellY, minY);
                    maxX = Math.max(cellX+1, maxX);
                    maxY = Math.max(cellY+1, maxY);
                });
            }

            if (layer.raw) {
                for (const cell of layer.raw.cells) {
                    const { cellX, cellY, id, cellWidth, cellHeight } = cell;
                    minX = Math.min(cellX, minX);
                    minY = Math.min(cellY, minY);
                    maxX = Math.max(cellX+cellWidth, maxX);
                    maxY = Math.max(cellY+cellHeight, maxY);
                }
            }
    
            minXOff = minX * cellSize;
            minYOff = minY * cellSize;
            maxXOff = maxX * cellSize;
            maxYOff = maxY * cellSize;
        }

        return {
            minXOff,
            minYOff,
            maxXOff,
            maxYOff,
        };
    }

    render() {
        const {
            x,
            y,
            width,
            height,
            xOff,
            yOff,
            renderAsImage,
            getComponents,
        } = this.props;

        const layerDims = this.getLayerDims();
        const {
            minXOff,
            minYOff,
            maxXOff,
            maxYOff,
        } = layerDims;

        const totalWidth = maxXOff-minXOff;
        const totalHeight = maxYOff-minYOff;

        let componentsToRender = null;
        if (renderAsImage) {
            const processedProps = {
                ...this.props,
                rerender: null,
            };
            const processedLastProps = {
                ...this.lastProps,
                rerender: null,
            };
            //const allPropsEqual = isEqual(processedProps, processedLastProps);
            const moreProcessedProps = {
                ...processedProps,
                xOff: null,
                yOff: null,
            };
            const moreProcessedLastProps = {
                ...processedLastProps,
                xOff: null,
                yOff: null,
            };
            const propsEqual = isEqual(moreProcessedProps, moreProcessedLastProps);
            const rendersEqual = processedProps.forceRenderCount === processedLastProps.forceRenderCount;

            if (!propsEqual || !this.imageRef || !rendersEqual) {
                this.imageRef = null;
            } else {
                componentsToRender = <Image
                    src={this.imageRef}
                    x={x+xOff+minXOff}
                    y={y+yOff+minYOff}
                    width={totalWidth}
                    height={totalHeight}
                />
            }
        }

        if (!componentsToRender) {
            const components = getComponents(this.props, layerDims);
            if (renderAsImage) {
                const image = renderToCanvas(components, totalWidth || 1, totalHeight || 1, this.context);
                this.imageRef = image;
                componentsToRender = <Image
                    src={this.imageRef}
                    x={x+xOff+minXOff}
                    y={y+yOff+minYOff}
                    width={totalWidth}
                    height={totalHeight}
                />
            } else {
                componentsToRender = components;
            }
        }

        this.lastProps = this.props;

        return <Clip
            x={x}
            y={y}
            width={width}
            height={height}
        >
            { componentsToRender }
        </Clip>;
    }
}

MapLayer.propTypes = propTypes;

const MapLayerWrapper = (props) => {
    const getComponents = useGetComponents();

    return (
        <MapLayer {...props} getComponents={getComponents} />
    );
}

export default MapLayerWrapper;