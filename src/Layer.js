import React, { useContext } from "react";
import { CompoundElement, Clip } from "@bucky24/react-canvas";

import MapContext from './MapContext';
import { CellProvider } from "./CellContext";

export function Layer({ children }) {
    const mapContext = useContext(MapContext);

    return (
        <Clip
            x={mapContext.x}
            y={mapContext.y}
            width={mapContext.width}
            height={mapContext.height}
        >
            <CompoundElement extraData={mapContext} xOff={mapContext.xOff} yOff={mapContext.yOff}>
                <CellProvider>
                    {children}
                </CellProvider>
            </CompoundElement>
        </Clip>
    );
};