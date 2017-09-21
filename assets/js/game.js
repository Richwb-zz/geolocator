console.log("new stuff 24");


firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }else{
  	firebase.auth().signInWithRedirect(provider);
  }
  // The signed-in user info.
  playerLogin(result.user);

}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  var catchSound = new Audio('assets/sound/21-fanfare-poke-mon-caught.mp3');
});

function pokeFound(pokeInfo){
	pokeFoundInfo = pokeInfo;
	foundPokedex(pokeInfo);
	$("#pokedex-window").load("battle.html", function(){
		$("#battle").html("<img id ='pokemon-sprite' src='" + pokeInfo.sprite +"'>");
		$("#battle-footer").html("A wild " + pokeInfo.name + " has appeared! <button id='battle-catch'>Catch</button><button id='battle-run'>Run</button>");
	});
	
	//foundPokedex(pokeInfo);
}

$("#map-button").on("click", function(){
	$("#pokedex-window").html("");
	$("#pokedex-window").load("map.html");
});

$("#pokeball-button").on("click", function(){
	$("#pokedex-window").html("");
	viewPokedex();
});

$(".pokedex-id").on("click", function(){
	$("#pokedex-window").html("");
	viewPokemon($(".pokedex-id").text);
});

$(document).on("click", "#battle-run", function(){
	$("#pokedex-window").html("");
	$("#battle-footer").html("Got away safely! <button id='battle-runok'>Ok</button>");
});

$(document).on("click", "#battle-runok" , function(){
	$("#pokedex-window").html("");
	$("#pokedex-window").load("map.html");
});

$(document).on("click", "#battle-fled", function(){
	$("#pokedex-window").html("");
	$("#pokedex-window").load("map.html");
});

$("#pokemon").on("click", function(){
	$("#pokedex-window").html("");
   $("#pokedex-window").load("pokedex.html");
	viewPokemon($("pokedex-id").value());
});

$(document).on("click", "#view-pokemon", function(){
	$("#pokedex-window").html("");
   $("#pokedex-window").load("pokedex.html");
	viewPokemon(pokeFoundInfo.id);
});

$(document).on("click", "#battle-catch", function(){
	
	$("#ball").addClass("animToss");

		setTimeout(function() { 
	    $("#ball").removeClass("animToss");
	}, 500);

	if(pokeFoundInfo.id < 130){
		var pokeCatchChance = Math.round(Math.random() * 4);
		var pokeCatchroll = Math.round(Math.random() * 4);
	}else{
		var pokeCatchChance = Math.round(Math.random() * 20);
		var pokeCatchroll = Math.round(Math.random() * 20);
	}

	if(pokeCatchroll === pokeCatchChance){
		$("#battle-footer").html(pokeFoundInfo.name + " was caught! <button id='view-pokemon'>Ok</button>");
			catchSound.play()
			caughtPokedex();

	}else{

		var pokeRunChance = Math.round(Math.random() * 10);
		var runState = false;

		$("#pokemon-sprite").addClass("dodge")

		setTimeout(function() { 
    		$("#pokemon-sprite").removeClass("dodge");
		}, 500);

		if(pokeFoundInfo.id === 63){
			if(pokeRunChance !== "2" || pokeRunChance !== "7"){
				runState = true;

			}
		}else{
			var pokeRunRoll = Math.round(Math.random() * 5);

			if(pokeRunRoll === pokeRunChance){
				runState = true;
			}
		}
		if(runState === true){
			$("#pokemon-sprite").addClass("run-away");
			$("#battle-footer").html(pokeFoundInfo.name + " has fled! <button id='battle-fled'>Ok</button>");
		}
	}

});

var catchSound = new Audio('assets/sound/21-fanfare-poke-mon-caught.mp3');
	
function soundCatch(){
	catchSound.play();
}