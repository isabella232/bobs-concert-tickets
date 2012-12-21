$(function() {
    var MIN_ZOOM = 0;
    var MAX_ZOOM = 2;
    var COORDINATE_MULTIPLIER = 1 / Math.pow(2, MAX_ZOOM - MIN_ZOOM)

    var superzoom = L.map('superzoom', {
        center: new L.LatLng(-2531 * COORDINATE_MULTIPLIER, 1196 * COORDINATE_MULTIPLIER),
        zoom: 2,
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM,
        maxBounds: new L.LatLngBounds(new L.LatLng(0, 0), new L.LatLng(-7595, 5463)),
        crs: L.CRS.Simple
    });

    var tiles = L.tileLayer('img/tiles/{z}/{x}/{y}.png', {
        continuousWorld: true,
        noWrap: true
    }).addTo(superzoom);
});
