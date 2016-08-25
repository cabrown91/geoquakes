// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {

  var source = $("#earthquakes-list").html();
  var template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: weekly_quakes_endpoint,
    dataType: 'json',
    success: onSuccess

  });


  function onSuccess(json) {
    $quakesList = json.features;
    console.log($quakesList);
    var lat;
    var long;

    var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.78, lng: -122.44},
        zoom: 1,
      });
    }

    initMap();

    for(i=0; i<$quakesList.length; i++) {
      var place = $quakesList[i].properties.place;
      var formattedPlace = place;
      if (place.includes("of ")) {
        formattedPlace = place.substring(place.indexOf("of ") + 3);
    }
      var earthquakeHTML = template({
        place: formattedPlace
      });
    lat = $quakesList[i].geometry.coordinates[1];
    long = $quakesList[i].geometry.coordinates[2];

    var marker = new google.maps.Marker( {
      position: {lat: lat, lng: long},
      map: map,
      title: $quakesList[i].properties.place
    });

      $("#info").append(earthquakeHTML);
    }

  $("#map").append(map);
}

});
