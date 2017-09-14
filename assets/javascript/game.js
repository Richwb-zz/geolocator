
var map, infowindow;

function initMap() {
  var pos = {lat: 37.4213897, lng: -122.083906};

  map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 16
  });

  infowindow = new google.maps.InfoWindow();
  

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: pos,
        radius: 500,
        type: ['points-of-intrest']
      }, callback);

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }// end if

  else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function callback(results, status) {

  console.log(results);

  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < 5; i++) {

      createMarker(results[i]);
    }
  }
}

function createMarker(place) {

  //replace with pokeCall
  var imgTest ="http://pokeapi.co/media/sprites/pokemon/25.png"; 

  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP,
    icon: imgTest
  });
  marker.addListener('click', toggleBounce);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });

  
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
}