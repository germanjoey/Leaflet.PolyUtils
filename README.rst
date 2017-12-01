===============
Leaflet.PolyUtils
===============

This plugin adds a few useful methods to L.Polyline and L.Polygon.

----------------
L.Polyline.getCenterEdgeCenter
----------------

Returns the point that is the center of the center edge of the polyline.

----------------
L.Polyline.getCentroid
----------------

Returns the polyline/polygon's centroid (its center of gravity), as you might expect. Note that a centroid is different than the center of the polygon's bounding box, unless your polygon happens to be a Rectangle.

----------------
L.Polygon.isConvex
----------------

Returns true if a Polygon is convex, otherwise false.
