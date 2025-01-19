import React, { useContext, useEffect, useState } from "react";
import { CompoundElement, Clip } from "@bucky24/react-canvas";

import MapContext from './MapContext';
import { CellProvider } from "./CellContext";

export function Layer({ id, children }) {
    const mapContext = useContext(MapContext);
    const [sortedChildren, setSortedChildren] = useState([]);

    const extraProps = {
        ...mapContext,
    };

    delete extraProps.zoom;
    delete extraProps.log;
    extraProps.cellSize = mapContext.initialCellSize;

    useEffect(() => {
        const sortedKids = [...children];
        // TODO: probably should flatten this, or try to go into children of children
        // to get coords just in case
        sortedKids.sort((a, b) => {
            let ay, by;
            if (Array.isArray(a)) {
                for (const item of a) {
                    if (ay === undefined) {
                        ay = item.props?.y;
                        continue;
                    }
                    ay = Math.min(ay ,item.props?.y);
                }
            }
            if (Array.isArray(b)) {
                for (const item of b) {
                    if (by === undefined) {
                        by = item.props?.y;
                        continue;
                    }
                    by = Math.min(by ,item.props?.y);
                }
            }
            return ay - by;
        });

        setSortedChildren(sortedKids);
    }, [children]);

    mapContext.log("Layer " + (id || ""), "Rendering with extra props", extraProps);

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
                    {sortedChildren}
                </CellProvider>
            </CompoundElement>
        </Clip>
    );
};