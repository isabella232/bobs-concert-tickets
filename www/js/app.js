$(function() {
    var MIN_ZOOM = 0;
    var MAX_ZOOM = 2;
    var COORDINATE_MULTIPLIER = 1 / Math.pow(2, MAX_ZOOM - MIN_ZOOM);

    function xy(x, y) {
        /*
         * Convert pixel coords into psuedo-lat-lng.
         */
        return new L.LatLng(-y * COORDINATE_MULTIPLIER, x * COORDINATE_MULTIPLIER);
    }

    var superzoom = L.map('superzoom', {
        center: xy(1196, 2531),
        zoom: 2,
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM,
        maxBounds: new L.LatLngBounds(xy(0, 0), xy(5463 - 256, 7595)),
        crs: L.CRS.Simple
    });

    var tiles = L.tileLayer('img/tiles/{z}/{x}/{y}.png', {
        continuousWorld: true,
        noWrap: true
    }).addTo(superzoom);

    $("#about").click(function(){
        if($(".modal-body").children().length < 1 ) {
            $(".modal h3").text($(".legend-contents .headline").text());
            $(".legend-contents .headline").hide();
            $(".legend-contents").clone().appendTo(".modal-body");
        }
    });
});