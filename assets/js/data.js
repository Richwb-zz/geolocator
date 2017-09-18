
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAssCeoOtANMy-rGq_rvzt91IrNai-UjLM",
  authDomain: "geolocator-94d73.firebaseapp.com",
  databaseURL: "https://geolocator-94d73.firebaseio.com",
  projectId: "geolocator-94d73",
  storageBucket: "geolocator-94d73.appspot.com",
  messagingSenderId: "244188749521"
};

firebase.initializeApp(config);
var fdb = firebase.database();


function foundPokedex(pokeInfo){
  fdb.ref("User/Pokedex/" + pokeInfo.id)
  .once("value")
  .then(function(pokeShot){
    if(!(pokeShot.val())) {
      var pokeSet = [];
      
      pokeSet[pokeInfo.id] = {
        pokedex: {
          caught: "no",
          id: pokeInfo.id,
          name: pokeInfo.name
        },
        image: pokeInfo.image
      };


      fdb.ref("User/Pokedex").set(pokeSet);
    }
  });
}

function caughtPokedex(pokeInfo){
  var pokeSet = {};
  
  pokeSet[pokeInfo.id] = {
    pokedex: {
      caught: yes
    },
    stats: {
      height: pokeInfo.height,
      weight: pokeInfo.weight
    }
  };

  for (var i = 5; i < pokeInfo.length; i++) {
    pokeSet[pokeInfo.id][types]["type" + 1] = pokeInfo[i];
  }


  fdb.ref("User/pokedetails/" + pokeInfo.id).update(pokeSet);
}

function viewPokedex(){
  fdb.ref("User/pokedex")
  .once("value")
  .then(function(pokeShot){

    var pokedexHtml = "";
    var previousId = 1;
    var currentId = 1;

    $.each(pokeShot.val(), function(key, value){
      pokedexHtml += "valueId " + value.id;
      currentId = value.id;
      pokedexHtml += "math " + (currentId - previousId);
      
      if(currentId - previousId > 1){
        while(currentId - previousId > 1){
          previousId++
          pokedexHtml += "test" + previousId;
          pokedexHtml += "<div class='row'>";
          pokedexHtml += "<div class='col'>N<sub>o</sub>" + previousId + "</div>";
          pokedexHtml += "<div class='col'>?????</div>"
          pokedexHtml += "</div>";
        }
      }

      pokedexHtml += "<div class='row'>";
      pokedexHtml += "<div class='col'>N<sub>o</sub><span class='pokedex-id'>" + value.id + "</span></div>";
      pokedexHtml += "<div class='col pokemon'>" + value.name + "</div>"
      pokedexHtml += "</div>";

      previousId = currentId;
    });

    if(currentId < 152){
      currentId ++
      while(currentId < 152){
        pokedexHtml += "<div class='row'>";
        pokedexHtml += "<div class='col'>N<sub>o</sub>" + currentId + "</div>";
        pokedexHtml += "<div class='col'>?????</div>"
        pokedexHtml += "</div>";

        currentId++
      }
    }

    $("#pokedex-window").html(pokedexHtml);
  });
}

function viewPokemon(id){
  var pokeStats;

  fdb.ref("User/pokedex/" + id)
  .once("value")
  .then(function(pokedex){
    pokeStats = pokeShot;
    console.log(JSON.stringify(pokedex));
  
    fdb.ref("User/pokedetails/" + id)
    .once("value")
    .then(function(pokeStats){
    pokeStats = pokeShot;
    console.log(JSON.stringify(pokeStats));

    });



  });


}

viewPokemon(7);