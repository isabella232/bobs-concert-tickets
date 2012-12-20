$(function() {
    var superzoom = L.map('superzoom', {
        center: new L.LatLng(-1892, 1500),
        zoom: 1,
        maxZoom: 2,
        maxBounds: new L.LatLngBounds(new L.LatLng(0, 0), new L.LatLng(-7595, 5463)),
        crs: L.CRS.Simple
    });

    var tiles = L.tileLayer('img/tiles/{z}/{x}/{y}.png', {
        continuousWorld: true,
        noWrap: true
    }).addTo(superzoom);
});
