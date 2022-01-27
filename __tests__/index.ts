import * as L from "leaflet";

import PolyDiff from "../src";

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

PolyDiff({
  eventName: "polydiffevent",
}).addTo(leafletMap);

/**
 * To test PolyDiff we ensure that when the "polydiff" event is fired, two new layers get added to the map.
 */
const colors = ["#6351c6", "#f9c4c0"];

leafletMap.on("polydiffevent", (event) => {
  // @ts-ignore
  L.geoJSON(event.diff, {
    style: {
      color: colors.pop(),
    },
  }).addTo(leafletMap);
});
