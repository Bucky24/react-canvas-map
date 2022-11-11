import { useContext } from 'react';

import useCellToReal from "./useCellToReal";
import MapContext from "./MapContext";
import { MapType } from "./enums";

// from an x and y coord, this gets the actual coords for a cell shape.
// this was not tested with standard yet, might be off
export default function useGetCellShape() {
    const cellToReal = useCellToReal();
    const { type } = useContext(MapContext);

    return (cellX, cellY) => {
        const cellReal = cellToReal(cellX, cellY, 1, 1);
        const realX = cellReal.x;
        const realY = cellReal.y;
        const width = cellReal.width;
        const height = cellReal.height;

        //console.log(cellReal);

        if (type === MapType.ISOMETRIC) {
            return [
                { x: realX - width, y: realY+height*2 },
                { x: realX, y: realY+height },
                { x: realX + width, y: realY+height*2 },
                { x: realX, y: realY + height*3 },
            ];
        } else {
            return [
                { x: realX, y: realY },
                { x: realX + width, y: realY },
                { x: realX + width, y: realY + height },
                { x: realX, y: realY + height },
            ];
        }
    }
}