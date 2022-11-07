import React, { useState } from 'react';
import { Canvas, Rect, ButtonTypes } from '@bucky24/react-canvas';
import { Map, Layer, LayerImage, MapType, LayerText } from "@bucky24/react-canvas-map";

import RED_IMAGE from "../images/red.jpg";

function App() {
    const width = 500;
    const height = 400;
	
	const [selectedTile, setSelectedTile] = useState({ x: 11, y: 3 });
	const [mouseOverTile, setMouseOverTile] = useState({ x: 0, y: 0 });
    const [useIso, setUseIso] = useState(true);

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
                minCellX={0}
                minCellY={0}
                maxCellX={10}
                maxCellY={10}
                onMove={(x, y) => {
                    setMouseOverTile({
                        x,
                        y,
                    });
                }}
                onClick={(x, y, button) => {
                    console.log(button, "button clicked!", x, y);
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
                type={useIso ? MapType.ISOMETRIC : MapType.STANDARD}
            >
                <Layer>
                   {/*<LayerImage
                        src={RED_IMAGE}
                        width={1}
                        height={1}
                        x={mouseOverTile.x}
                        y={mouseOverTile.y}
                    />
                    <LayerImage
                        src={RED_IMAGE}
                        width={1}
                        height={1}
                        x={1}
                        y={1}
                    />*/}
                    {/*<LayerImage
                        src={RED_IMAGE}
                        width={1}
                        height={1}
                        x={0}
                        y={0}
                />*/}
                </Layer>
                <Layer>
                    <LayerText
                        text="left"
                        x={0}
                        y={0}
                        font="12px Arial"
                    />
                    {/*<LayerText
                        text="right"
                        x={5}
                        y={6}
                        font="12px Arial"
                        hAlign="center"
                    />
                    <LayerText
                        text="mid"
                        x={7}
                        y={6}
                        font="12px Arial"
                        hAlign="center"
                    />
                    <LayerText
                        text="top"
                        x={4}
                        y={7}
                        font="12px Arial"
                    />
                    <LayerText
                        text="bot"
                        x={5}
                        y={7}
                        font="12px Arial"
                        vAlign="bottom"
                    />
                    <LayerText
                        text="mid"
                        x={7}
                        y={7}
                        font="12px Arial"
                        vAlign="center"
                    />
                    <LayerText
                        text="mult\nline\ntext"
                        x={4}
                        y={4}
                        font="8px Arial"
                    />
                    <LayerText
                        text="mult\nline\ntext"
                        x={5}
                        y={4}
                        font="8px Arial"
                        vAlign="bottom"
                    />
                    <LayerText
                        text="mult\nline\ntext"
                        x={6}
                        y={4}
                        font="8px Arial"
                        vAlign="center"
            />*/}
                </Layer>
            </Map>
        </Canvas>
        <div>
            Mouse over:&nbsp;
            { mouseOverTile ? mouseOverTile.x : "None" }
            &nbsp;/&nbsp;
            { mouseOverTile ? mouseOverTile.y : "None" }
            <br/>
            <button
                onClick={() => {
                    setUseIso(!useIso);
                }}
            >{useIso ? 'Change to Standard' : 'Change to Isometric'}</button>
        </div>
    </div>);
}

export default App;
