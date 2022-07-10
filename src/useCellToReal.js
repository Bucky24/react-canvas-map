import { useContext } from "react";

import { MapType } from "./enums";
import MapContext from "./MapContext";
import useDims from "./useDims";

// this method spits out 2 shapes. The first is the actual shape of the tile, and the second is the shape that
// should be use for drawing items to the time
export default function useCellToReal() {
    const { type, cellSize, minCellX, minCellY } = useContext(MapContext);
    const dims = useDims();

    return (cellX, cellY, cellWidth, cellHeight) => {
        const actualCellX = cellX - minCellX;
        const actualCellY = cellY - minCellY;

        if (type === MapType.STANDARD) {
            const result = {
                x: dims[0].x + actualCellX * cellSize,
                y: dims[0].y + actualCellY * cellSize,
            };

            result.drawX = result.x;
            result.drawY = result.y;

            if (cellWidth) {
                result.width = cellWidth * cellSize;
                result.drawWidth = result.width;
            }

            if (cellHeight) {
                result.height = cellHeight * cellSize;
                result.drawHeight = result.height;
            }

            return result;
        } else if (type === MapType.ISOMETRIC) {
            //console.log(dims[0], cellX, cellX * cellSize/2, dims[0].x + cellX * cellSize/2);

            //console.log(cellY);

            // because we slide x and y for isometric for each cell, each final coord has 2 parts,
            // one from the start x coord and one from the start y coord
            const xPartOfX = dims[0].x + actualCellX * cellSize + cellSize;
            const yPartOfX = actualCellY * cellSize;
            const xPartOfY = -actualCellX * cellSize/2;
            const yPartOfY = dims[0].y + actualCellY * cellSize/2 - cellSize;
            return {
                x: xPartOfX + yPartOfX,
                y: yPartOfY + xPartOfY,
                drawX: xPartOfX + yPartOfX - cellSize/2,
                drawY: yPartOfY + xPartOfY + cellSize/2,
                width: cellWidth * cellSize,
                height: cellHeight * cellSize/2,
                drawWidth: cellWidth * cellSize,
                drawHeight: cellWidth * cellSize,
            };
        }
    }
}