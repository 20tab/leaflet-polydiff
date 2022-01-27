import { getBboxPolygon } from "../../src";

import { LatLngBounds } from "leaflet";

describe("Geometry utils", () => {
  test("geometry of a given bounding box", () => {
    const bounds = new LatLngBounds([
      [29.27681632836857, -107.70996093750001],
      [33.95247360616284, -86.75903320312501],
    ]);

    expect(getBboxPolygon(bounds)).toEqual({
      bbox: [
        -107.70996093750001, 29.27681632836857, -86.75903320312501,
        33.95247360616284,
      ],
      geometry: {
        coordinates: [
          [
            [-107.70996093750001, 29.27681632836857],
            [-86.75903320312501, 29.27681632836857],
            [-86.75903320312501, 33.95247360616284],
            [-107.70996093750001, 33.95247360616284],
            [-107.70996093750001, 29.27681632836857],
          ],
        ],
        type: "Polygon",
      },
      properties: {},
      type: "Feature",
    });
  });
});
