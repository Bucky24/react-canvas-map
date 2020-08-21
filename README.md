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
| cellSize | Size in pixels of each map cell (can be modified internally based on zoom level). Defaults to 25 | No |
| xOff | Initial map horizontal offset | No |
| yOff | Initial map vertical offset | No |
| layers | List of MapLayer objects | No |
| moveType | One of the MoveType entries. Determines how the map can be panned. Defaults to MOUSE | No |
| mapBackground | MapBackground object, describes background for the map | No |
| offMapBackground | MapBackground object, describes background for area that is not take up by the map | No |
| onMove | Function, fires when mouse moves over a map cell. First param is cell x, second is cell y. | No |
| onClick | Function, fires when move is clicked over a map cell. First param is cell x, second is cell y. Third param is the button that was clicked (ButtonType from @bucky24/react-canvas) | No |
| zoom | Number that indicates the zoom level of the map. Used as initial value if zoomType is not NONE. 100 is default zoom (100% zoom) | No |
| zoomType | One of the ZoomType etnries. Determines how the map is zoomed. Defaults to MOUSE | No |
| minCellX | The cell x at which the map will start drawing cells. Defaults 0 | No |
| minCellY | The cell y at which the map will start drawing cells. Defaults 0 | No |
| maxCellX | The cell x at which the map will stop drawing cells (inclusive). Defaults 20 | No |
| maxCellY | The cell y at which the map will stop drawing cells (inclusive). Defaults 20 | No |
| renderLayersToImage | Flag that determines if layers are pre-rendered to images. This can optimize performance but may not work correctly. Defaults false | No |

### MapLayer

The MapLayer object defines a layer of various objects that need to be drawn. MapLayers are drawn in order, so the first layer is drawn first, and the last layer is drawn last. You can use this to ensure that you get a proper z-depth for your map. MapLayers have the following keys:

| Param | Description | Required |
| -- | -- | -- |
| images | List of Image objects | No |
| text | List of Text objects | No |
| raw | Raw object | no |

Note that this means a single layer can have multiple images, multiple text strings, or both.

### Image

The Image object defines an image as well as information on how to draw or position the image.

| Param | Description | Required |
| -- | -- | -- |
| src | Either a URL or base64 encoded string with image data | Yes |
| cellWidth | How many cells the image takes up horizontally (can be fractional) | Yes |
| cellHeight | How many cells the image takes up vertically (can be fractional) | Yes |
| cellX | The x position of the cell to draw the image at | Yes |
| cellY | The y position of the cell to draw the image at | Yes |
| xOff | Setting this will shift the image horizontally from the cell x. Can be fractional. | No |
| yOff | Setting this will shift the image vertically from the cell y. Can be fractional. | No |
| rot | Indicates how much the image should be rotated, if at all | No |
| vAlign | The vertical alignment of the image. One of "top", "center", "bottom". Defaults "top" | No |

### Text

The Text object defines a string of text as well as information on how to draw the text.

| Param | Description | Required |
| -- | -- | -- |
| text | The text to draw | Yes |
| cellX | The x position of the cell to draw the text at | Yes |
| cellY | The y position of the cell to draw the text at | Yes |
| vAlign | The vertical alignment of the text. One of "top", "center", "bottom" | No |
| hAlign | The horizontal alignment of the text. One of "left", "center", "right" | No |
| font | The font of the text to draw | Yes

### Raw

The Raw object determines how to draw a layer that is custom, allowing more complex things than just images and text to be drawn.

| Param | Description | Required |
| -- | -- | -- |
| cells | List of CellItem objects | Yes |
| drawFunc | A callback function that will be called once per cell given in the cells list. This function will be given a DrawFuncParams object as a parameter. This function should return either a single React element, or an array of React elements. Note that in the case where `renderLayersToImage` is not set or set to false, these elements must be something that can be handled by the Clip element from `@bucky24/react-canvas` |

### CellItem

An object that describes an item on the map

| Param | Description | Required |
| -- | -- | -- |
| cellX | The x coord on the map of the item | Yes |
| cellY | The y coord on the map of the item | Yes |
| cellWidth | The width, in cells, of the item | Yes |
| cellHeight | The height, in cells, of the item | Yes |
| id | The id of the item. Can be literally anything so this can also be used for passthrough data if necessary. | No |

### DrawFuncParams

An object that is passed into the drawFunc for raw drawing on layers. Note that any coords or widths here are already adjusted for map offset, map x/y, and zoom.

| Param | Description |
| -- | -- |
| x | The x coord on the canvas where this item begins |
| y | The y coord on the canvas where this item begins |
| width | The width, in pixels, of the item |
| height | The height, in pixels, of the item |
| id | The id of the item. Whatever was givenin the CellItem is passed through here. |

### MapBackground

The MapBackground object defines a background.

| Param | Description | Required |
| -- | -- | -- |
| color | A hex color code to fill a solid color background | No |
| image | An image url or base 64 string to fill an image background | No |

Note that either color or image is expected to be set.

### MoveType

MoveType is also exported from the module. It is an enum with the following types:

| Type | Description |
| -- | -- |
| MOUSE | Use the mouse for panning the map |
| KEYBOARD_ARROW | Use arrow keys for panning the map |
| NONE | No map panning will be done by the component |

### ZoomType

ZoomType is also exported from the module. It is an enum with the following types:

| Type | Description |
| -- | -- |
| MOUSE | Use the mouse wheel for zooming the map |
| NONE | No zoom will be done by the component |