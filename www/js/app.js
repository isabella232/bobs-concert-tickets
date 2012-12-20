$(function() {
    var tiles = L.tileLayer('img/tiles/{z}/{x}/{y}.png', {
        maxZoom: 2
    });

    var superzoom = L.map('superzoom', {
        center: [0, 0],
        zoom: 1,
        layers: [tiles],
        minZoom: 0,
        maxZoom: 2,
        crs: L.CRS.Simple
    });
});
