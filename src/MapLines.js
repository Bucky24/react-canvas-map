import React from 'react';
import { useWithContext } from '@bucky24/react-canvas';

import { MapType } from './enums';
import useDims from './useDims';

const MapLines = ({
    x, y, width, height,
    minCellX, minCellY, maxCellX, maxCellY, cellSize,
    color, xOff, yOff, type }) => {

    const dims = useDims();
    const withContext = useWithContext;

    return withContext((context) => {
        context.save();
        context.strokeStyle = color;

        const clipRegion = new Path2D();
        clipRegion.rect(x, y, width, height);
        context.clip(clipRegion);

        if (type === MapType.STANDARD) {
            const leastX = dims[0].x;
            const greatX = dims[2].x;
            const leastY = dims[0].y;
            const greatY = dims[2].y;

            context.beginPath();

            for (let i=minCellX;i<=maxCellX;i++) {
                const drawX = i*cellSize + xOff + x;
                if (drawX < x || drawX > x + width) {
                    continue;
                }
                context.moveTo(drawX, leastY);                
                context.lineTo(drawX, greatY);
            }

            for (let i=minCellY;i<=maxCellY;i++) {

                const drawY = i*cellSize + yOff + y;
                if (drawY < y || drawY > y + height) {
                    continue;
                }
                context.moveTo(leastX, drawY);
                context.lineTo(greatX, drawY);
            }
            context.stroke();
        } else if (type === MapType.ISOMETRIC) {
            const corners = dims;

            context.beginPath();
            context.moveTo(corners[0].x, corners[0].y);
            context.lineTo(corners[1].x, corners[1].y);
            context.lineTo(corners[2].x, corners[2].y);
            context.lineTo(corners[3].x, corners[3].y);
            context.closePath();

            context.stroke();

            context.beginPath();
            const totalX = maxCellX - minCellX;
            for (let i=1;i<totalX;i++) {
                const drawX = corners[0].x + i*cellSize;
                // start from the bottom-most corner and move right + up as we go
                const secondDrawX = corners[3].x + i*cellSize;
                const leastY = corners[0].y - i * cellSize/2;
                const greatY = corners[3].y - i * cellSize/2;
                context.moveTo(drawX, leastY);                
                context.lineTo(secondDrawX, greatY);
            }

            const totalY = maxCellY - minCellY;
            for (let i=1;i<totalY;i++) {
                const drawY = corners[0].y + i*cellSize/2;
                // start from the bottom-most corner and move right + up as we go
                const secondDrawY = corners[1].y + i*cellSize/2;
                const leastX = corners[0].x + i * cellSize;
                const greatX = corners[1].x + i * cellSize;
                context.moveTo(leastX, drawY);                
                context.lineTo(greatX, secondDrawY);
            }

            context.stroke();
        }

        context.restore();
    });
}

export default MapLines;