import React, { useState } from 'react';
import { Canvas } from '@bucky24/react-canvas';
import { Map, MoveType, Layer } from "@bucky24/react-canvas-map";

import Figure from "../images/figure.jpg";
import { LayerImage } from '../../src';

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
                minCellX={-5}
                minCellY={-5}
                maxCellX={10}
                maxCellY={30}
                moveType={MoveType.MOUSE}
                mapBackground={{
                    color: "#0a0",
                }}
                offMapBackground={{
                    color: "#000",
                }}
            >
                <Layer>
                    <LayerImage
                        src={Figure}
                        width={1}
                        height={1.75}
                        x={8}
                        y={6}
                    /> 
                    <LayerImage
                        src={Figure}
                        width={1}
                        height={1.5}
                        x={8}
                        y={5}
                   /> 
                   <LayerImage
                       src={Figure}
                       width={1}
                       height={1.5}
                       x={8}
                       y={4}
                  /> 
                </Layer>
            </Map>
        </Canvas>
    </div>);
}

export default App;
