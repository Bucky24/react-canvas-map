import { useContext } from 'react';
import { MapType } from './enums';
import MapContext from './MapContext';

export function getDims({
    minCellX,
    minCellY,
    cellWidth,
    cellHeight,
    cellSize,
    xOff,
    yOff,
    x,
    y,
    type,
}) {
    if (type === MapType.ISOMETRIC) {
        // all coords have 2 parts because we're basically moving diagonally now
        const c1XFromX = minCellX*cellSize + xOff + x;
        const c1XFromY = minCellY * cellSize;
        const c1YFromY = cellWidth * cellSize/2 + yOff + y + minCellY * cellSize/2;
        const c1YFromX = -minCellX * cellSize/2;
        const corner1 = {
            x: c1XFromX + c1XFromY,
            y: c1YFromY + c1YFromX,
        }
        const c2XFromX = cellWidth * cellSize + xOff + x;
        const c2XFromY = minCellY * cellSize;
        const corner2 = {
            x: c2XFromX + c2XFromY,
            y: minCellY*cellSize/2 + yOff + y,
        }
        const c3XFromX = cellWidth*2 * cellSize + xOff + x;
        const c3XFromY = (cellHeight - cellWidth) * cellSize;
        const corner3 = {
            x: c3XFromX + c3XFromY,
            y: cellHeight * cellSize/2 + yOff + y,
        }

        const c4XFromX = cellWidth * cellSize + xOff + x + minCellX*cellSize;
        const c4XFromY = (cellHeight - cellWidth) * cellSize;
        const c4YFromY = cellHeight * cellSize + yOff + y;
        const c4YFromX = -(cellHeight - cellWidth) * cellSize/2 - minCellX*cellSize/2;
        const corner4 = {
            x: c4XFromX + c4XFromY,
            y: c4YFromY + c4YFromX,
        }

        return [
            corner1,
            corner2,
            corner3,
            corner4,
        ];
    } else if (type === MapType.STANDARD) {
        const corner1 = {
            x: minCellX*cellSize + xOff + x,
            y: minCellY*cellSize + yOff + y,
        }
        const corner2 = {
            x: cellWidth*cellSize + xOff + x,
            y: minCellY*cellSize + yOff + y,
        }
        const corner3 = {
            x: cellWidth*cellSize + xOff + x,
            y: cellHeight*cellSize + yOff + y,
        }
        const corner4 = {
            x: minCellX*cellSize + xOff + x,
            y: cellHeight*cellSize + yOff + y,
        }

        return [
            corner1,
            corner2,
            corner3,
            corner4,
        ];
    }
}

export default function useDims() {
    const {
        minCellX,
        minCellY,
        cellWidth,
        cellHeight,
        cellSize,
        xOff,
        yOff,
        x,
        y,
        type,
    } = useContext(MapContext);

    return getDims({
        minCellX,
        minCellY,
        cellWidth,
        cellHeight,
        cellSize,
        xOff,
        yOff,
        x,
        y,
        type,
    });
}