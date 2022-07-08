import { useContext } from 'react';
import { MapType } from './enums';
import MapContext from './MapContext';

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

    if (type === MapType.ISOMETRIC) {
        const totalCellsX = -minCellX + cellWidth;
        const totalCellsY = -minCellY + cellHeight;
        const corner1 = {
            x: minCellX*cellSize + xOff + x,
            y: cellHeight * cellSize/2 + yOff + y,
        }
        const corner2 = {
            x: cellWidth * cellSize + xOff + x,
            y: minCellY*cellSize + yOff + y,
        }
        const corner3 = {
            x: cellWidth*2 * cellSize + xOff + x,
            y: cellHeight * cellSize/2 + yOff + y,
        }
        const corner4 = {
            x: cellWidth * cellSize + xOff + x,
            y: cellHeight*2 * cellSize/2 + yOff + y,
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