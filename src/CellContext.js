import React, { useContext } from 'react';
import { RenderContext } from '@bucky24/react-canvas';
import useCellToReal from './useCellToReal';

const CellContext = React.createContext();
export default CellContext;

export function CellProvider({ children }) {
    const mapContext = useContext(RenderContext);

    const cellToReal = useCellToReal(mapContext);

    const value = {
        getDims: (x, y, width, height) => {
            const dims = cellToReal(x, y, width, height);
            const dimX = dims.x - mapContext.xOff;
            const dimY = dims.y - mapContext.yOff;
            return {
                x: dimX,
                y: dimY,
                width: dims.width,
                height: dims.height,
                x2: dimX + dims.width,
                y2: dimY + dims.height,
            };
        },
    };

    return <CellContext.Provider value={value}>
        {children}
    </CellContext.Provider>
}