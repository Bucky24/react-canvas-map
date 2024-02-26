import React, { useState, useCallback } from 'react';
import { Canvas, Rect, ButtonTypes, Image, Text } from '@bucky24/react-canvas';
import { Map, Layer, LayerImage, MapType, LayerText, VAlign, Cell } from "@bucky24/react-canvas-map";

import RED_IMAGE from "../images/red.jpg";
import BLUE_IMAGE from "../images/blue.png";
import YELLOW_IMAGE from "../images/yellow.jpg";
import Figure from "../images/figure.jpg";
import GreenImage from './GreenImage';

const GREEN_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/600px-Green_Arrow_Up.svg.png";

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
                    <GreenImage x={selectedTile.x} y={selectedTile.y} />
                    <Cell x={5.5} y={2} width={0.5} height={0.5}
                        cb={useCallback((dims) => {
                            return <Image src={RED_IMAGE} {...dims} rot={90} />
                        }, [])}
                    />
                    <Cell x={5.5} y={2.5} width={0.5} height={0.5}
                        cb={useCallback((dims) => {
                            return <Image src={BLUE_IMAGE} {...dims} rot={180} />
                        }, [])}
                    />
                    <Cell x={5} y={2.5} width={0.5} height={0.5}
                        cb={useCallback((dims) => {
                            return <Image src={YELLOW_IMAGE} {...dims} rot={270} />
                        }, [])}
                    />
                    <Cell x={8} y={5} width={1} height={2}
                        cb={useCallback((dims) => {
                            return <Image src={Figure} {...dims} />
                        }, [])}
                    />
                </Layer>
                <Layer>
                    <Cell x={6} y={6} width={1} height={1}
                        cb={useCallback((dims) => {
                            return <Text {...dims} font="12px Arial">
                                left
                            </Text>;
                        }, [])}
                    />
                    <Cell x={5} y={6} width={1} height={1}
                        cb={useCallback((dims) => {
                            return <Text {...dims} font="12px Arial">
                                right
                            </Text>;
                        }, [])}
                    />
                    <Cell x={7} y={6} width={1} height={1}
                        cb={useCallback((dims) => {
                            return <Text {...dims} font="12px Arial">
                                mid
                            </Text>;
                        }, [])}
                    />
                    <Cell x={4} y={7} width={1} height={1}
                        cb={useCallback((dims) => {
                            return <Text {...dims} font="12px Arial">
                                top
                            </Text>;
                        }, [])}
                    />
                    <Cell x={5} y={7} width={1} height={1}
                        cb={useCallback((dims) => {
                            return <Text {...dims} font="12px Arial">
                                bot
                            </Text>;
                        }, [])}
                    />
                    <Cell x={7} y={7} width={1} height={1}
                        cb={useCallback((dims) => {
                            return <Text {...dims} font="12px Arial">
                                mid
                            </Text>;
                        }, [])}
                    />
                    <Cell x={7} y={7} width={1} height={1}
                        cb={useCallback((dims) => {
                            return <Text {...dims} font="12px Arial">
                                
                            </Text>;
                        }, [])}
                    />
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
