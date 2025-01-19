import React from 'react';

const MapContext = React.createContext();
export default MapContext;

export function MapProvider({
    children,
    xOff,
    yOff,
    cellSize,
    cellWidth,
    cellHeight,
    minCellX,
    minCellY,
    x,
    y,
    width,
    height,
    forceRenderCount,
    type,
    zoom,
    initialCellSize,
    log,
}) {
    return (
        <MapContext.Provider
            value={{
                xOff,
                yOff,
                cellSize,
                cellWidth,
                cellHeight,
                minCellX,
                minCellY,
                x,
                y,
                width,
                height,
                forceRenderCount,
                type,
                zoom,
                initialCellSize,
                log,
            }}
        >
            {children}
        </MapContext.Provider>
    )
};
