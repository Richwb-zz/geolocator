function pokeFound(pokeInfo){
	$("#pokedex-window").load("battle.html");
	$("#battle-name").text(pokeInfo.name);
	$("#battle-sprite").attr("src", pokeInfo.sprite);

	foundPokedex(pokeInfo);
}

$("#battle-ok").on("click", function(){
	$("#battle-text").html("A wild" + $("#battle-name").text() + "has appeared!");
	$("#battle-text").html("<button id='battle-catch'>Catch</button><button id='battle-run'>Run</button>");
})

$("battle-run").on("click", function(){
	$("#battle-text").html("Got away safely! <button id='battle-safelyok'>Ok</button>");
})

$("battle-run").on("click", function(){
	$("#battle-text").html("Got away safely! <button id='battle-safelyok'>Ok</button>");
})

$("battle-safelyok").on("click", function(){
	$("#pokedex-window").load("map.html");
})

$("battle-fled").on("click", function(){
	$("#pokedex-window").load("map.html");
})

$("battle-catch").on("click", function(){
	
	if(pokeInfo.id < 130){
		var pokeCatchChance = Math.round(Math.random() * 20);
		var pokeCatchroll = Math.round(Math.random() * 20);
	}else{
		var pokeCatchChance = Math.round(Math.random() * 4);
		var pokeCatchroll = Math.round(Math.random() * 4);
	}

	if(pokeCatchroll === pokeCatchChance){
		$("#battle-text").html(pokeInfo.name + " was caught! <button id='battle-fled'>Ok</button>");
		caughtPokedex();

	}else{
		var pokeRunChance = Math.round(Math.random() * 10);
		var runState = false;
		
		if(pokeInfo.id === 63){
			if(pokeRunChance !== "2" || pokeRunChance !== "7"){
				run = true;
			}
		}else{
			var pokeRunRoll = Math.round(Math.random() * 5);

			if(pokeRunRoll === pokeRunChance){
				run = true;
			}
		}
		if(runState === true){
			$("#battle-name").addClass("hide");
			$("#battle-sprite").addClass("hide");
			$("#battle-text").html(pokeInfo.name + " has fled! <button id='battle-fled'>Ok</button>");
		}
	}

});

// $('.type-it').typeIt({
//   speed: 900,
//   lifeLike: false,
//   autoStart: true,
//   cursor: false
// })
// .tiType('A wild Pokemon has appeared')