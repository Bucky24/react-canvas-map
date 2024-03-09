import React, { useContext } from "react";
import { CompoundElement, Clip } from "@bucky24/react-canvas";

import MapContext from './MapContext';
import { CellProvider } from "./CellContext";

export function Layer({ children }) {
    const mapContext = useContext(MapContext);

    const extraProps = {
        ...mapContext,
    };

    delete extraProps.zoom;
    extraProps.cellSize = mapContext.initialCellSize;

    // figure out the zoom based on the initial cell size and the new cell size
    const zoom = mapContext.cellSize / mapContext.initialCellSize;
    return (
        <Clip
            x={mapContext.x}
            y={mapContext.y}
            width={mapContext.width}
            height={mapContext.height}
        >
            <CompoundElement
                extraData={extraProps}
                xOff={mapContext.xOff}
                yOff={mapContext.yOff}
                zoom={zoom}
                maxZoom={1}
                zoomXOff={mapContext.x}
                zoomYOff={mapContext.y}
            >
                <CellProvider>
                    {children}
                </CellProvider>
            </CompoundElement>
        </Clip>
    );
};