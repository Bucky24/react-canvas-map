import React from 'react';
import { useWithContext } from '@bucky24/react-canvas';

const MapLines = ({
    x, y, width, height,
    minCellX, minCellY, maxCellX, maxCellY, cellSize,
    color, xOff, yOff }) => {
    const withContext = useWithContext();

    return withContext((context) => {
        context.save();
        context.strokeStyle = color;

        let leastX = minCellX * cellSize + xOff + x;
        let greatX = maxCellX * cellSize + xOff + x;
        let leastY = minCellY * cellSize + yOff + y;
        let greatY = maxCellY * cellSize + yOff + y;

        leastX = Math.min(x + width, Math.max(x, leastX));
        greatX = Math.max(x, Math.min(x + width, greatX));
        leastY = Math.min(y + height, Math.max(y, leastY));
        greatY = Math.max(y, Math.min(y + height, greatY));

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
        context.restore();
    });
}

export default MapLines;