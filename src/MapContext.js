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
            }}
        >
            {children}
        </MapContext.Provider>
    )
};
