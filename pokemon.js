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

var pokeUrl = "http://pokeapi.co/api/v2/";
var pokeLocation = "subway_station";
var pokeTypes = [];
var pokeRandomType = "";
var pokeRand = 0;

for (var i = 0; i < typeLocation.length; i++) {
	if(typeLocation[i].indexOf(pokeLocation) !== -1){
		pokeTypes.push(typeLocation[i][0]);
	}
}

pokeRandomType = pokeTypes[Math.round(Math.random() * (pokeTypes.length-1))];
console.log("url " + pokeUrl + "type/" + pokeRandomType)
$.ajax({
	url: pokeUrl + "type/" + pokeRandomType,
	type: "GET",
	dataType: "json",
	success:
	function(pokeTypeData){
		var pokeCount = 0;
		
		$.each(pokeTypeData.pokemon, function(key, value){
			pokeCount++;
		});

		pokeRand = Math.round(Math.random() * pokeCount);


		$.ajax({
			url: pokeUrl + "pokemon/" + pokeRand,
			type: "GET",
			dataType: "json",
			success:
			function(pokeData){
				console.log(JSON.stringify(pokeData));
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

