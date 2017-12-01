/* globals L:true */

L.Polyline.prototype.getFlatPts = function () {
    if (! L.LineUtil.isFlat) {
        return this._latlngs;
    }
    
    return L.LineUtil.isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
};

L.Polyline.prototype.getCenterEdgeCenter = function () {
    return L.Polyline._getCenterEdgeCenter(this.getFlatPts());
};

L.Polyline._getCenterEdgeCenter = function (pts) {
    var n = pts.length;
    
    if ((n%2) === 0) {
        var a = pts[n/2 - 1];
        var b = pts[n/2];
        return new L.LatLng((a.lat + b.lat)/2, (a.lng + b.lng)/2);
    }
    else {
        return pts[(n-1)/2].clone();
    }
};

// from https://stackoverflow.com/questions/5271583/center-of-gravity-of-a-polygon#5271722
L.Polyline.prototype.getCentroid = function () {
    return L.Polyline._getCentroid(this.getFlatPts());
};

L.Polyline._getCentroid = function (pts) {
    var n = pts.length;
    
    var off = pts[0];
    var twicearea = 0;
    var x = 0;
    var y = 0;
    var f;
    
    var j = n-1;
    for (var i=0; i<n; j=i++) {
        var p1 = pts[i];
        var p2 = pts[j];
        
        f = (p1.lat - off.lat)*(p2.lng - off.lng) - (p2.lat - off.lat)*(p1.lng - off.lng);
        twicearea += f;
        
        x += (p1.lat + p2.lat - 2*off.lat) * f;
        y += (p1.lng + p2.lng - 2*off.lng) * f;
    }
    
    f = 3*twicearea;
    return new L.LatLng(x/f + off.lat, y/f + off.lng);
};

// translated to js from  https://stackoverflow.com/questions/471962/how-do-determine-if-a-polygon-is-complex-convex-nonconvex
// and then adapted to ignore three points that make straight lines
L.Polygon.prototype.isConvex = function () {
    var pts = this.getFlatPts();
    var n = this._latlngs[0].length;
    if (n < 4) {
        return true;
    }
    
    var signSet = false;
    var checkedAny = false;
    var sign = false;
    for (var i=0; i<n; i++) {
        var dx1 = pts[(i+2)%n].lat - pts[(i+1)%n].lat;
        var dy1 = pts[(i+2)%n].lng - pts[(i+1)%n].lng;
        var dx2 = pts[i].lat - pts[(i+1)%n].lat;
        var dy2 = pts[i].lng - pts[(i+1)%n].lng;
        var zcrossproduct = dx1*dy2 - dy1*dx2;
        
        if (zcrossproduct === 0) {
            continue;
        }
        
        checkedAny = true;
        var newSign = zcrossproduct > 0;
        
        if (signSet === false) {
            signSet = true;
            sign = newSign;
        }
        else if (sign !== newSign) {
            return false;
        }
    }
    
    return checkedAny;
};
