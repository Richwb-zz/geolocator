var locTypes = ["airport", "aquarium", "bar", "campground", "cemetery", "electrician", "electronics_store", "fire_station", "florist", "funeral_home", "gym", "library", "liquor_store", "museum", "park", "zoo", "restaurant", "stadium", "doctor", "police","travel_agency", "pharmacy", "shopping_mall", "bakery", "night_club", "train_station", "school", "gas_station", "amusement_park", "cafe", "subway_station", "jewelry_store", "pet_store", "university", "art_gallery", "parking", "rv_park", "veterinary_care", "movie_theater","lodging"]
var searchZone = 5000;

var markerArray = [];
var pMarker;

function initMap() {
  var pos = {lat: 37.4213897, lng: -122.083906};

  map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 16,
    mapTypeId: 'satellite'
  }); // loads a new map, sets the center to the Googleplex and the map type to sattilite images.

  infowindow = new google.maps.InfoWindow();
  

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };//gets the geographic position of the user

      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: pos,
        radius: searchZone,
        types: locTypes,
        rankBy: google.maps.places.RankBy.PROMINENCE,
      }, callback);// finds all valid locations within 5km of the user

      map.setCenter(pos); //centers the map on the user
      playerMarker(pos); //puts a marker at the users position


    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
      
    });
  }// end if

  else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

    setInterval(reCenter, 8000,); // resets the position of the user marker to the users location every 8 secconds.

    
}

function callback(results, status) {

  // console.log(results);

  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {

      createMarker(results[i]); //creates a marker at each valid location
      // console.log(results[i].types); 
    }
  }
}

function playerMarker(pos) {

	var imgMrk ="assets/images/Pokehat.png"; 

	var playerLoc = pos;

	pMarker = new google.maps.Marker({

		map: map,
		position: playerLoc,
		animation: google.maps.Animation.DROP,
		icon: imgMrk

	}); //puts a hat on the user's location
}

function pRepos(pos){
	pMarker.setPosition(pos);
}// resets the location of the hat

function createMarker(place) {

	var imgTest ="assets/images/Pikapeek.png"; 

	var placeLoc = place.geometry.location;

	markerArray.push(placeLoc);
	console.log("Ma" + markerArray);

	var marker = new google.maps.Marker({

		map: map,
		position: place.geometry.location,
		animation: google.maps.Animation.DROP,
		icon: imgTest

	});//makes hiding pikachu markers at the target location

	google.maps.event.addListener(marker, 'click', function() {
		
		pokeGetType(place.types); // passes the type of the location to Rich's code
		
		var rangeCheck = true;

		infowindow.setContent("Pokemon Found!");
		infowindow.open(map, this);
		toggleBounce();
		soundBattle();
		pokeGetType(place.types);
 		// when someone clicks on a Pikamarker, it bounces, plays music and displays an infowindow


	});
	
	var batSound = new Audio('assets/sound/14-battle-wild-poke-mon-.mp3');
	
	function soundBattle(){
		batSound.play();
		setTimeout(soundStop, 3000);
	}// plays the music

	function soundStop(){
		batSound.pause();
		marker.setMap(null);
	}//stops the music and removes the marker

	function toggleBounce() {
	  if (marker.getAnimation() !== null) {
	    marker.setAnimation(null);
	  } else {
	    marker.setAnimation(google.maps.Animation.BOUNCE);
	  }
	}// if the marke isnt bouncing, it starts, other wise it stops
}

function reCenter(pos){
	console.log("Tick")
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	      pos = {
	        lat: position.coords.latitude,
	        lng: position.coords.longitude
	      };
		map.setCenter(pos);
	  	pRepos(pos);
	    }, function() {
	      handleLocationError(true, infoWindow, map.getCenter());
	      
	    });
	  }// end if

	  else {
	    // Browser doesn't support Geolocation
	    handleLocationError(false, infoWindow, map.getCenter());
	  }
}// recenters the map on the users position
