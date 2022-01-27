/* istanbul ignore file */

import { Layer, Util } from "leaflet";
import { getBboxPolygon } from "../utils/geometry";

import difference from "@turf/difference";
import union from "@turf/union";

import type { Map, LayerOptions } from "leaflet";
import type { Feature, Polygon, MultiPolygon } from "@turf/helpers";

export type BboxToPoly = Feature<Polygon | MultiPolygon>;

export type PolyDiffOptions = {
  /**
   * The name of the diff event. Defaults to "polydiff".
   */
  eventName: string;
} & LayerOptions;

const PolyDiff = Layer.extend({
  options: {
    eventName: "polydiff",
  },

  initialize: function (opts: PolyDiffOptions) {
    Util.setOptions(this, opts);
  },

  onAdd: function (map: Map) {
    this._lastSeenArea = getBboxPolygon(map.getBounds());
    this._map = map;

    map.on("moveend", this._onMoveEnd, this);
  },

  onRemove: function (map: Map) {
    map.off("moveend", this._onMoveEnd, this);
  },

  _onMoveEnd(this: {
    options: PolyDiffOptions;
    _map: Map;
    _lastSeenArea: BboxToPoly;
  }) {
    const {
      options: { eventName },
    } = this;

    const mapPoly = getBboxPolygon(this._map.getBounds()) as BboxToPoly;

    const diff = difference(mapPoly, this._lastSeenArea);

    const _union = union(this._lastSeenArea, mapPoly);
    if (!_union) return;

    this._lastSeenArea = _union;

    if (!diff) return;
    this._map.fire(eventName, { diff });
  },
});

export { PolyDiff };

export default function (opts?: PolyDiffOptions) {
  // @ts-ignore
  return new PolyDiff(opts);
}
