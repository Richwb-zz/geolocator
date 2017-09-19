var locTypes = ["airport", "aquarium", "bar", "campground", "cemetery", "electrician", "electronics_store", "fire_station", "florist", "funeral_home", "gym", "library", "liquor_store", "museum", "park", "zoo", "restaurant", "stadium", "doctor", "police","travel_agency", "pharmacy", "shopping_mall", "bakery", "night_club", "train_station", "school", "gas_station", "amusement_park", "cafe", "subway_station", "jewelry_store", "pet_store", "university", "art_gallery", "parking", "rv_park", "veterinary_care", "movie_theater","lodging"]
var searchZone = 5000;

var markerArray = [];

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
        radius: searchZone,
        types: locTypes,
        rankBy: google.maps.places.RankBy.PROMINENCE,
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
    for (var i = 0; i < results.length; i++) {

      createMarker(results[i]);
      console.log(results[i].types);
    }
  }
}

function createMarker(place) {

	//replace with pokeCall
	var imgTest ="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"; 

	var placeLoc = place.geometry.location;

	markerArray.push(placeLoc);
	console.log("Ma" + markerArray);

	var marker = new google.maps.Marker({

		map: map,
		position: place.geometry.location,
		animation: google.maps.Animation.DROP,
		icon: imgTest

	});//make markers

	google.maps.event.addListener(marker, 'click', function() {
		
		pokeGetType(place.types);
		
		var rangeCheck = true;


		if (rangeCheck === false){
			// radius comparision nooot working atm.
			// TDL.
		}

		else{
			infowindow.setContent("Pokemon Found!");
			infowindow.open(map, this);
			toggleBounce();
			soundBattle();
			pokeGetType(place.types);
		}


	});
	
	var batSound = new Audio('assets/sound/14-battle-wild-poke-mon-.mp3');
	
	function soundBattle(){
		batSound.play();
		setTimeout(soundStop, 3000);
	}

	function soundStop(){
		batSound.pause();
		marker.setMap(null);

	}

	function toggleBounce() {
	  if (marker.getAnimation() !== null) {
	    marker.setAnimation(null);
	  } else {
	    marker.setAnimation(google.maps.Animation.BOUNCE);
	  }
	}
}