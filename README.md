# leaflet-polydiff
> Leaflet layer for efficient data fetching.

`leaflet-polydiff` keeps track of user movements to compute the **difference between newly visited area in the map, and the sum of all previously visited area**, thanks to [Turf.js](https://turfjs.org).

The resulting polygon can be used to make API calls to a backend, in order to optimize data fetching of GeoJSON feature.

## Installation

You can install `leaflet-polydiff` with NPM:

```bash
npm i @20tab/leaflet-polydiff
```

Or with YARN:

```bash
yarn add @20tab/leaflet-polydiff
```

## Usage

`leaflet-polydiff` is distributed as an ES2015 module, and is intended to be used with a module bundler.

```typescript jsx
import * as L from "leaflet";

import PolyDiff from "@20tab/leaflet-polydiff";

/**
 * Map initialization.
 */
const copy =
    "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osm = L.tileLayer(url, { attribution: copy });

const leafletMap = L.map("map", {
    layers: [osm],
    zoom: 15,
    center: [43.71994, 10.948968],
});

/**
 * PolyDiff activation.
 */

PolyDiff().addTo(leafletMap);

leafletMap.on("polydiff", (event) => {
    // The event object will carry a diff polygon.
    event.diff;
});
```

## Props

| Name         | Type                                                                  | Default       | Description                        |
|--------------|-----------------------------------------------------------------------|---------------|------------------------------------|
| eventName?   | string                                                                | "polydiff"    | The event name for the diff event. |
| pane?        | [LayerOptions](https://leafletjs.com/reference.html#layer-pane) | "overlayPane" | See link.                          |
| attribution? | [LayerOptions](https://leafletjs.com/reference.html#layer-pane) | null          | See link.                          |
