$(function() {
    var map = L.map('superzoom').setView([0, 0], 1);

    L.tileLayer('img/tiles/{z}/{x}/{y}.png', {
        maxZoom: 2
    }).addTo(map);
});
