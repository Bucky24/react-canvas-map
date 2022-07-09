import React, { useState } from 'react';
import { Canvas, Rect, ButtonTypes } from '@bucky24/react-canvas';
import { Map, Layer, LayerImage, MapType } from "@bucky24/react-canvas-map";

import RED_IMAGE from "../images/red.jpg";

function App() {
    const width = 500;
    const height = 400;
	
	const [selectedTile, setSelectedTile] = useState({ x: 11, y: 3 });
	const [mouseOverTile, setMouseOverTile] = useState(null);

    return (<div>
        <Canvas
            width={width}
            height={height}
        >
            <Map
                renderLayersToImage={true}
                x={50}
                y={50}
                width={width-100}
                height={height-100}
                cellSize={30}
                xOff={0}
                yOff={0}
                minCellX={-1}
                minCellY={-1}
                maxCellX={3}
                maxCellY={3}
                onMove={(x, y) => {
                    setMouseOverTile({
                        x,
                        y,
                    });
                }}
                onClick={(x, y, button) => {
                    console.log(button, "button clicked!");
                    if (button === ButtonTypes.LEFT)
                        setSelectedTile({
                            x,
                            y,
                        });
                    }
                }
                mapBackground={{
                    color: "#0a0",
                }}
                offMapBackground={{
                    color: "#000",
                }}
                type={MapType.ISOMETRIC}
            >
                <Layer>
                    <LayerImage
                        src={RED_IMAGE}
                        width={1}
                        height={1}
                        x={2}
                        y={2}
                    />
                    <LayerImage
                        src={RED_IMAGE}
                        width={1}
                        height={1}
                        x={1}
                        y={1}
                    />
                    <LayerImage
                        src={RED_IMAGE}
                        width={1}
                        height={1}
                        x={0}
                        y={0}
                    />
                </Layer>
            </Map>
        </Canvas>
        <div>
            Mouse over:&nbsp;
            { mouseOverTile ? mouseOverTile.x : "None" }
            &nbsp;/&nbsp;
            { mouseOverTile ? mouseOverTile.y : "None" }
        </div>
    </div>);
}

export default App;
