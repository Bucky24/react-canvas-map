import React from 'react';
import { Canvas } from '@bucky24/react-canvas';
import { Map, ZoomType } from "@bucky24/react-canvas-map";

function App() {
    const width = 500;
    const height = 400;
	
    return (<div>
        <Canvas
            width={width}
            height={height}
        >
            <Map
                x={100}
                y={50}
                width={width-100}
                height={height-100}
                xOff={0}
                yOff={0}
                minCellX={0}
                minCellY={0}
                maxCellX={10}
                maxCellY={30}
                zoomType={ZoomType.FIXED}
                zoom={200}
            ></Map>
        </Canvas>
    </div>);
}

export default App;
