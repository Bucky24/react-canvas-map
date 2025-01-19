import React, { useState } from 'react';
import { Canvas, Rect, ButtonTypes } from '@bucky24/react-canvas';
import { Map, MoveType, VAlign, Layer } from "@bucky24/react-canvas-map";


import RED_IMAGE from "../images/red.jpg";
import BLUE_IMAGE from "../images/blue.png";
import YELLOW_IMAGE from "../images/yellow.jpg";
import Figure from "../images/figure.jpg";
import { LayerImage, LayerText } from '../../src';

const GREEN_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/600px-Green_Arrow_Up.svg.png";

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
                x={100}
                y={50}
                width={width-100}
                height={height-100}
                xOff={0}
                yOff={0}
                minCellX={-5}
                minCellY={-5}
                maxCellX={10}
                maxCellY={30}
                moveType={MoveType.MOUSE}
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
            >
                <Layer id="images">
                    <LayerImage
                        src={GREEN_IMAGE}
                        width={2}
                        height={1}
                        x={selectedTile.x}
                        y={selectedTile.y}
                    />
                    <LayerImage
                        src={GREEN_IMAGE}
                        width={0.5}
                        height={0.5}
                        x={5}
                        y={2}
                        rot={0}
                    />
                    <LayerImage
                        src={RED_IMAGE}
                        width={0.5}
                        height={0.5}
                        x={5.5}
                        y={2}
                        rot={90}
                   />
                    <LayerImage
                        src={BLUE_IMAGE}
                        width={0.5}
                        height={0.5}
                        x={5.5}
                        y={2.5}
                        rot={180}
                   />
                    <LayerImage
                        src={YELLOW_IMAGE}
                        width={0.5}
                        height={0.5}
                        x={5}
                        y={2.5}
                        rot={270}
                   />
                    <LayerImage
                        src={Figure}
                        width={1}
                        height={1.5}
                        x={8}
                        y={5}
                   /> 
                </Layer>
                <Layer id="text">
                    <LayerText
                        x={4}
                        y={6}
                        font="12px Arial"
                    >left</LayerText>
                    <LayerText
                        x={5}
                        y={6}
                        font="12px Arial"
                    >right</LayerText>
                    <LayerText
                        text="mid"
                        x={7}
                        y={6}
                        font="12px Arial"
                    >mid</LayerText>
                    <LayerText
                        x={4}
                        y={7}
                        font="12px Arial"
                    >top</LayerText>
                    <LayerText
                        x={5}
                        y={7}
                        font="12px Arial"
                    >bot</LayerText>
                    <LayerText
                        x={7}
                        y={7}
                        font="12px Arial"
                    >mid</LayerText>
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
