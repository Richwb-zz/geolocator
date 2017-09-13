
// List of google map locations with pokemon type as first value
var typeLocation = [["bug","campground", "park", "zoo", "pet_store", "university", "veterinary_care"], 
["dragon","library", "zoo", "stadium", "pet_store", "art_gallery", "veterinary_care"],
["ice","zoo", "night_club", "pet_store", "veterinary_care"],
["fighting","gym", "zoo", "police", "pet_store", "fighting", "veterinary_care"],
["fire","fire_station", "zoo", "bakery", "gas_station", "pet_store", "veterinary_care"],
["flying","airport", "zoo", "travel_agency", "amusement_park", "pet_store", "veterinary_care"],
["ground","campground","florist", "zoo", "pet_store", "veterinary_care"],
["ghost","cemetery", "funeral_home", "zoo", "amusement_park", "pet_store", "veterinary_care", "movie_theater"],
["ground","campground", "park", "zoo", "subway_station", "pet_store", "veterinary_care"],
["electric","electrican", "electronics_store", "zoo", "train_station", "pet_store", "veterinary_care", "movie_theater"],
["normal","park", "zoo", "resturant", "shopping mall", "school", "normal", "pet_store", "veterinary_care"],
["poison","bar", "liquor_store", "zoo", "pharmacy", "pet_store", "rv_park", "veterinary_care"],
["psychic","hospital", "zoo", "doctor", "pet_store", "university", "veterinary_care"],
["rock","rock", "museum", "zoo", "cafe", "jewelry_store", "pet_store", "veterinary_care"],
["water","aquarium", "zoo", "amusement_park", "pet_store", "veterinary_care"]];

// API url
var pokeUrl = "http://pokeapi.co/api/v2/";
// Location to be passed from google API
var pokeLocation = "subway_station";
// Will hold list of types that can be found in the passed location
var pokeTypesList = [];
// the choosen type to use
var pokeRandomType = "";


// searches through array to find all pokemon types that can be found in that location and places in an array
for (var i = 0; i < typeLocation.length; i++) {
	if(typeLocation[i].indexOf(pokeLocation) !== -1){
		pokeTypesList.push(typeLocation[i][0]);
	}
}

console.log(pokeTypesList);
// Randomly chooses one of the types
pokeRandomType = pokeTypesList[Math.round(Math.random() * (pokeTypesList.length-1))];


console.log("url " + pokeUrl + "type/" + pokeRandomType);
// API call using selected type
$.ajax({
	url: pokeUrl + "type/" + pokeRandomType,
	type: "GET",
	dataType: "json",
	success:
	function(pokeTypeData){
		var pokeChoosen = 0;
		var pokenumGrab = "";
		var pokeList = [];
		
		// Loops through the Objects and collets all information in Pokemon object
		$.each(pokeTypeData.pokemon, function(key, value){
			// Need to find out if pokemon is generation 1 via id, only provided in the url
			// Remove all url information and leaves the id number
			pokeNumGrab = value.pokemon.url.replace("http://pokeapi.co/api/v2/pokemon/", "");
			pokeNumGrab = pokeNumGrab.replace("/","");
			// Gen 1 pokemon go up to 151 so if in that range add to array
			if(parseInt(pokeNumGrab) < 152){
				pokeList.push(pokeNumGrab);
			}
		});
		
		// Randomly choose a pokemon from the list
		pokeChoosen = pokeList[Math.round(Math.random() * (pokeList.length-1))];

		// Do a request on the selected pokemon
		$.ajax({
			url: pokeUrl + "pokemon/" + pokeRand,
			type: "GET",
			dataType: "json",
			success:
			function(pokeData){
				console.log(JSON.stringify(pokeData));
				
				// Assign objects to values
				var pokeSprite = pokeData.sprites.front_default;
				var PokeNumber = pokeData.id;
				var PokeName = pokeData.name;
				var PokeHeight = pokeData.height;
				var PokeWeight = pokeData.weight;
				
				// Loop through the pokemon's types and add them to the array 
				$.each(pokeData.types, function(key, value){
					pokeTypes.push(value.type.name);
				});

				console.log("pokeInfo " + pokeSprite + " " + PokeNumber + " " +  PokeName + " " +  PokeHeight + " " +  PokeWeight + " " +  JSON.stringify(pokeTypes));
			},
			error:
			function(error){
				console.log("test2 " + pokeRand + " " + JSON.stringify(error));
			}
		});
	},
	error:
	function(error){
		console.log("error1 " + JSON.stringify(error));
	}
});

