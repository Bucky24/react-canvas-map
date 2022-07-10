// note that this is not a hook because it's meant to run at the Map level, before the MapContext exists.

import { MapType } from "./enums";

export default function realToCell(rx, ry, { type, xOff, yOff, zoom, cellSize, x, y, width, height }) {
    if (type === MapType.STANDARD) {  
        const zoomUnit = Math.abs(zoom) / 100;
        const realCellSize = cellSize * zoomUnit;

        if (rx < x || ry < y || rx > x + width || ry > y + height) {
            return {
                x: null,
                y: null,
            };
        }

        const shiftX = rx - x - xOff;
        const shiftY = ry - y - yOff;
        const cellX = Math.floor(shiftX/realCellSize);
        const cellY = Math.floor(shiftY/realCellSize);

        return {
            x: cellX,
            y: cellY,
        };
    } else if (type === MapType.ISOMETRIC) {
        return {
            x: 2,
            y: 2,
        };
    }
}