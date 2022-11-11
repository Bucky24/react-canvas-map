import React from 'react';
import PropTypes from 'prop-types';
import { CanvasContext, useWithContext } from "@bucky24/react-canvas";

import useGetCellShape from './useGetCellShape';

const propTypes = {
    cellSize: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    xOff: PropTypes.number.isRequired,
    yOff: PropTypes.number.isRequired,
    texts: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        hAlign: PropTypes.string,
        vAlign: PropTypes.string,
        font: PropTypes.string.isRequired,
        cellX: PropTypes.number.isRequired,
        cellY: PropTypes.number.isRequired,
    })).isRequired,
};

const MapText = ({
    cellSize,
    x,
    y,
    xOff,
    yOff,
    texts,
    cellToReal,
}) => {
    const withContext = useWithContext();
    const getCellShape = useGetCellShape();

    return withContext((context) => {
        for (let textObj of texts) {
            const { text, font, cellX, cellY, hAlign, vAlign } = textObj;
            const textList = text.split("\n");

            for (let i=0;i<textList.length;i++) {
                const text = textList[i];
                context.save();

                context.font = font;
                // if we measure the text, any p or q or any other letter that goes below the fold will count towards its height, despite not being useful for placement. Why replace with m? Because if we ONLY have these characters, we need to get the height from something.
                const fluffedText = text.replace(/[pqgyj]+/g,"m");
                let textSize = context.measureText(fluffedText);
                // supported in most browers at this point I hope
                const textHeight = textSize.actualBoundingBoxAscent + textSize.actualBoundingBoxDescent;
                // however for the width we do want to consider all characters
                textSize = context.measureText(text);
                const textWidth = textSize.width;

                const cellShape = getCellShape(cellX, cellY);
                console.log(cellShape);

                const cellStartX = cellShape[0].x;
                const cellStartY = cellShape[0].y;

                const cellEndX = cellShape[2].x;
                const cellEndY = cellShape[2].y;
                const cellCenterX = cellStartX + (cellEndX - cellStartX) / 2;
                const cellCenterY = cellStartY + (cellEndY - cellStartY) / 2;

                console.log(cellCenterX, cellCenterY)

                let textX = cellStartX;
                switch (hAlign) {
                    case "center":
                        textX = cellCenterX - textWidth/2;
                        break;
                    case "right":
                        textX = cellEndX - textWidth;
                        break;
                    case "left":
                    default:
                        // nothing to do, left is default
                        break;
                }

                let textY = cellStartY + textHeight*(i+1);
                switch (vAlign) {
                    case "center":
                        // this is complex. Basically the center for the block as a whole is not the same as a single line. So what we do is calculate the top of the whole block, then move down line by line from there
                        textY = cellCenterY - (textHeight*textList.length)/2 + textHeight*(i+1);
                        break;
                    case "bottom":
                        // in this case we actually need to start from the highest line and move down, similar to the center, except we're not trying to go halfway back up to the top, but all the way.
                        textY = cellEndY - textHeight*textList.length + textHeight*(i+1);
                        break;
                    case "top":
                    default:
                        // nothing to do, top is default
                        break;
                }

                context.fillText(text, textX, textY);
        
                context.restore();
            }
        }
    });
}

MapText.propTypes = propTypes;

export default MapText;