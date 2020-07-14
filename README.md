# react-canvas-map

This module provides a basic 2d grid-based map interface that works with react-canvas (https://github.com/Bucky24/react-canvas)

# Installation

With NPM

```
npm install --save @bucky24/react-canvas-map
```

With Yarn

```
npm install @bucky24/react-canvas-map
```

# Dependencies

This module depends on @bucky24/react-canvas as a peer dependency, with a min version of 1.3.0.

# Usage

This project exports a single component, Map, which must be embedded within a react-canvas Canvas component (or child thereof).

This component contains a large number of options for the given map that you want to display. It is somewhat low level, and you will likely want to have an integration layer with the rest of your application.

## Parameters

| Param | Description | Required |
| -- | -- | -- |
| x | X coord where the map starts on the canvas | Yes |
| y | Y coord where the map starts on the canvas | Yes |
| width | Width in pixels of the map | Yes |
| height | Height in pixels of the map | Yes |
| cellSize | Size in pixels of each map cell | Yes |
| xOff | Initial map horizontal offset | No |
| yOff | Initial map vertical offset | No |
| layers | List of MapLayer objects | No |
| moveType | One of the MoveType entries. Determines how the map can be panned. Defaults to MOUSE | No |
| mapBackground | MapBackground object, describes background for the map | No |
| offMapBackground | MapBackground object, describes background for area that is not take up by the map | No |
| onMove | Function, fires when mouse moves over a map cell | No |
| onClick | Function, fires when move is clicked over a map cell | No |

### MapLayer

The MapLayer object defines a layer of various objects that need to be drawn. MapLayers are drawn in order, so the first layer is drawn first, and the last layer is drawn last. You can use this to ensure that you get a proper z-depth for your map.