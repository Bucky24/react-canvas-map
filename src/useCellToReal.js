import { useContext } from "react";

import { MapType } from "./enums";
import MapContext from "./MapContext";
import useDims from "./useDims";

export default function cellToReal() {
    const { type, cellSize, minCellX, minCellY } = useContext(MapContext);
    const dims = useDims();

    return (cellX, cellY, cellWidth, cellHeight) => {
        if (type === MapType.STANDARD) {
            const result = {
                x: dims[0].x + cellX * cellSize,
                y: dims[0].y + cellY * cellSize,
            };

            if (cellWidth) {
                result.width = cellWidth * cellSize;
            }

            if (cellHeight) {
                result.height = cellHeight * cellSize;
            }

            return result;
        } else if (type === MapType.ISOMETRIC) {
            const actualCellX = cellX - minCellX;
            const actualCellY = cellY - minCellY;
            //console.log(dims[0], cellX, cellX * cellSize/2, dims[0].x + cellX * cellSize/2);

            //console.log(cellY);

            // because we slide x and y for isometric for each cell, each final coord has 2 parts,
            // one from the start x coord and one from the start y coord
            const xPartOfX = dims[0].x + actualCellX * cellSize + cellSize/2;
            const yPartOfX = actualCellY * cellSize;
            const xPartOfY = -actualCellX * cellSize/2;
            const yPartOfY = dims[0].y + actualCellY * cellSize/2 - cellSize/2;
            return {
                x: xPartOfX + yPartOfX,
                y: yPartOfY + xPartOfY,
                width: cellWidth * cellSize,
                height: cellHeight * cellSize,
            };
        }
    }
}