import bboxPolygon from "@turf/bbox-polygon";

import type { LatLngBounds } from "leaflet";

type GetBboxPolygon = (bounds: LatLngBounds) => ReturnType<typeof bboxPolygon>;

/**
 * Compute the geometry from a bounding box.
 */
const getBboxPolygon: GetBboxPolygon = (bounds) => {
  const { lat: swLat, lng: swLng } = bounds.getSouthWest();
  const { lat: neLat, lng: neLng } = bounds.getNorthEast();

  return bboxPolygon([swLng, swLat, neLng, neLat]);
};

export { getBboxPolygon };
