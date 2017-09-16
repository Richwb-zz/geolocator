var app = angular.module('app', [])
app.controller('ctrl', function($scope, $http) {

	var typeLookup = {
		"normal": "normal",
		"fire": "fire",
		"water": "water",
		"electric": "electric",
		"grass": "grass",
		"fighting": "fighting",
		"poison": "poison",
		"ground": "ground",
		"flying": "flying",
		"bug": "bug",
		"rock": "rock",
		"ghost": "ghost",
		"dragon": "dragon",
		"dark": "dark",
		"steel": "steel",
		"fairy": "fairy",
		"psychic": "psychic"
	};

	$scope.pokemonType = '';
	$scope.isSearching = false;

	$scope.search = function() {
		$http.get('https://pokeapi.co/api/v2/pokemon/' + $scope.searchPokemon)
			.then(function successCallback(res) {
				$scope.pokemon = res.data;
				$scope.isSearching = true;
				$scope.pokemonType = typeLookup[res.data.types[0].type.name];
			});
	};

});