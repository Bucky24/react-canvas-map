import React, { useState } from 'react';
import { Canvas } from '@bucky24/react-canvas';
import { Map, Layer, MoveType } from "@bucky24/react-canvas-map";

import GreenImage from './GreenImage';

function App() {
    const width = 500;
    const height = 400;
	
	const [selectedTile, setSelectedTile] = useState({ x: 3, y: 3 });

    return (<div>
        <Canvas
            width={width}
            height={height}
        >
            <Map
                x={0}
                y={0}
                width={width-100}
                height={height-100}
                cellSize={30}
                xOff={0}
                yOff={0}
                minCellX={0}
                minCellY={0}
                maxCellX={10}
                maxCellY={10}
                moveType={MoveType.NONE}
                centerX={selectedTile.x}
                centerY={selectedTile.y}
            >
                <Layer>
                    <GreenImage x={selectedTile.x} y={selectedTile.y} />
                </Layer>
            </Map>
        </Canvas>
        <div>
            <button onClick={() => {
                setSelectedTile({
                    x: selectedTile.x - 1,
                    y: selectedTile.y,
                });
            }} >Left</button>
            <button onClick={() => {
                setSelectedTile({
                    x: selectedTile.x + 1,
                    y: selectedTile.y,
                });
            }} >Right</button>
            <button onClick={() => {
                setSelectedTile({
                    x: selectedTile.x,
                    y: selectedTile.y - 1,
                });
            }} >Up</button>
            <button onClick={() => {
                setSelectedTile({
                    x: selectedTile.x,
                    y: selectedTile.y + 1,
                });
            }} >Down</button>
        </div>
    </div>);
}

export default App;
