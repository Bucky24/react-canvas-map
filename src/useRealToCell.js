import { useContext } from "react";
import { Polygon } from '@bucky24/toolbox';

import { MapType } from "./enums";
import MapContext from "./MapContext";
import useDims from './useDims';
import useGetCellShape from "./useGetCellShape";

export default function useRealToCell() {
    const {
        type,
        xOff,
        yOff,
        cellSize,
        x,
        y,
        width,
        height,
        minCellX,
        minCellY,
    } = useContext(MapContext);
    const dims = useDims();
    const getCellShape = useGetCellShape();

    return (rx, ry) => {
        if (type === MapType.STANDARD) {  
            if (rx < x || ry < y || rx > x + width || ry > y + height) {
                return {
                    x: null,
                    y: null,
                };
            }

            const shiftX = rx - x - xOff;
            const shiftY = ry - y - yOff;
            const cellX = Math.floor(shiftX/cellSize);
            const cellY = Math.floor(shiftY/cellSize);

            return {
                x: cellX,
                y: cellY,
            };
        } else if (type === MapType.ISOMETRIC) {
            const xWithoutOffset = rx - dims[0].x;
            const yWithoutOffset = ry - dims[0].y;
            const xByCell = Math.round(xWithoutOffset / cellSize);
            const yByCell = Math.round(yWithoutOffset / (cellSize/2));
            let cellX = NaN;
            let cellY = NaN;
            if (yByCell === 0 || yByCell === -0) {
                cellX = (xByCell - 1) / 2;
            } else if (yByCell < 0) {
                const numToAdd = Math.abs(yByCell + 1);
                cellX = (xByCell + numToAdd) / 2;
            } else if (yByCell > 0) {
                const numToRemove = Math.abs(yByCell + 1);
                cellX = (xByCell - numToRemove) / 2;
            }
            cellX = Math.round(cellX);
            if (cellX === -0) cellX = 0;

            if (yByCell === 0 || yByCell === -0) {
                cellY = cellX;
            } else if (yByCell < 0) {
                const numToRemove = Math.abs(yByCell)+1;
                cellY = (xByCell - numToRemove) / 2;
            } else if (yByCell > 0) {
                const numToAdd = Math.abs(yByCell)-1;
                cellY = (xByCell + numToAdd) / 2;
            }
            cellY = Math.round(cellY);
            if (cellY === -0) cellY = 0;

            cellX += minCellX;
            cellY += minCellY;

            // now at this point we do have a cell, however it will not always exactly be the cell that the mouse is over. It will, however,
            // be extremely close. To the point that we can just get the neighbors of the cell we found above and one of them is almost
            // guaranteed to be one of those

            const neighbors = [
                { x: cellX-1, y: cellY-1 },
                { x: cellX, y: cellY-1 },
                { x: cellX+1, y: cellY-1 },
                { x: cellX+1, y: cellY },
                { x: cellX+1, y: cellY+1 },
                { x: cellX, y: cellY+1 },
                { x: cellX-1, y: cellY+1 },
                { x: cellX-1, y: cellY },
                { x, y },
            ];

            const neighborShapes = [];
            for (const neighbor of neighbors) {
                const neighborShape = getCellShape(neighbor.x, neighbor.y);
                neighborShapes.push({
                    neighbor,
                    shape: neighborShape,
                });
            }

            // now compare and see if the mouse coords are inside the shape given
            for (const neighborShape of neighborShapes) {
                const inside = Polygon.pointInsidePolygon({ x: rx, y: ry }, neighborShape.shape);
                if (inside) {
                    return {
                        x: neighborShape.neighbor.x,
                        y: neighborShape.neighbor.y,
                    };
                }
            }

            return {
                x: cellX,
                y: cellY,
            };
        }
    }
}