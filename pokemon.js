
// List of google map locations with pokemon type as first value
var typeLocation = [["airport","flying"],
["aquarium","water"],
["bar","poison"],
["campground","bug","grass","ground"],
["cemetery","ghost"],
["electrician","electric"],
["electronics_store","electric"],
["fire_station","fire","water"],
["florist","grass"],
["funeral_home","ghost"],
["gym","fighting","rock"],
["library","dragon"],
["liquor_store","poison"],
["museum","rock"],
["park","bug,normal","ground"],
["zoo","ice"],
["restaurant","normal"],
["stadium","dragon"],
["doctor","psychic"],
["police","fighting"],
["travel_agency","flying"],
["pharmacy","poison"],
["shopping_mall","normal"],
["bakery","fire"],
["night_club","ice"],
["train_station","electric"],
["school","normal"],
["gas_station","fire"],
["amusement_park","flying","ghost","water"],
["cafe","rock"],
["subway_station","normal","ground"],
["jewelry_store","rock"],
["pet_store","bug","dragon","ice","fighting","fire","flying","grass","ghost","ground","electric","normal","poison","psychic","rock","water"],
["university","bug","psychic"],
["art_gallery","dragon"],
["parking","fighting"],
["rv_park","poison","grass"],
["veterinary_care","bug","dragon","ice","fighting","fire","flying","grass","ghost","ground","electric","normal","poison","psychic","rock","water"],
["movie_theater","ghost","electric"]];

// API url
var pokeUrl = "http://pokeapi.co/api/v2/";
// Location to be passed from google API
var pokeLocation = 
// Will hold list of types that can be found in the passed location
var pokeTypesList = [];
// the choosen type to use
var pokeRandomType = "";


// searches through array to find the location and then randomly chooses one of its types
for (var i = 0; i < pokeLocation.length; i++) {
	for (var j = 0; j < typeLocation.length - 1 ; j++) {
		if(typeLocation[j][0] == pokeLocation[i]){
			randomPoke = typeLocation[j][Math.floor((Math.random() * (typeLocation[j].length-1))+1)]

		}
	}
}

function api(){

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
				url: pokeUrl + "pokemon/" + pokeChoosen,
				type: "GET",
				dataType: "json",
				success:
				function(pokeData){
					
					// Assign objects to values
					var pokeSprite = pokeData.sprites.front_default;
					var PokeNumber = pokeData.id;
					var PokeName = pokeData.name;
					var PokeHeight = pokeData.height;
					var PokeWeight = pokeData.weight;
					
					// Loop through the pokemon's types and add them to the array 
					$.each(pokeData.types, function(key, value){
						pokeTypesList.push(value.type.name);
					});
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
}