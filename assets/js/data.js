
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
var provider = new firebase.auth.GoogleAuthProvider();
var fdb = firebase.database();


function playerLogin(player){
  console.log("here");
  console.log("player " + player.uid);
  fdb.ref(player.uid)
  .once("value")
  .then(function(playerShot){
    console.log("shot " + playerShot.val())
    if(!playerShot.val()){
      console.log("here2");
      var playerInfo = {};

      playerInfo = {
        name: player.displayName,
      }

      fdb.ref(player.uid + "/User").set(playerInfo)
    }
  });
}

function foundPokedex(pokeInfo){
  fdb.ref("User/pokedex/")
  .once("value")
  .then(function(pokeShot){
    var pokeSet = [];
    var pokedex = [];
    
    pokeSet = {
      [pokeInfo.id]: {
        image: pokeInfo.sprite
      }
    };

    pokedex = {
      [pokeInfo.id]: {
        caught: "no",
        id: pokeInfo.id,
        name: pokeInfo.name
      }
    };

    if(!pokeShot.val()) {
      console.log("testy1");
      fdb.ref("User/pokedetails").set(pokeSet);
      fdb.ref("User/pokedex/").set(pokedex);
    } else if(!pokeShot.val().id){
      console.log("testy2");
      fdb.ref("User/pokedetails/").update(pokeSet);
      fdb.ref("User/pokedex/").update(pokedex);  
    }
  });
}

function caughtPokedex(){
  var pokeStats = {};
  var pokedex = {};
  var types = {};
  var typeKey;

  pokeStats = {
    image: pokeFoundInfo.sprite,
    stats: {
      height: pokeFoundInfo.height,
      weight: pokeFoundInfo.weight
    }
  };

  pokedex["User/pokedex/" + pokeFoundInfo.id + "/caught"] = "yes";
  console.log("type1 " + pokeFoundInfo["type" + 1]);

  for(var key in pokeFoundInfo){
    if(key.includes("type")){
      console.log("key " + key);
      console.log("value " + pokeFoundInfo[key]);
          
      types = {[key] : pokeFoundInfo[key]};
      fdb.ref("User/pokedetails/" + pokeFoundInfo.id + "/types").update(types);
    }
  }
  

  console.log("types " + JSON.stringify(types));
  fdb.ref("User/pokedetails/" + pokeFoundInfo.id).update(pokeStats);
  console.log("stats complete");
  console.log("types complete");
  fdb.ref().update(pokedex);
}

function viewPokedex(){
  fdb.ref("User/pokedex")
  .once("value")
  .then(function(pokeShot){

    var pokedexHtml = "";
    var previousId = 1;
    var currentId = 1;

    $.each(pokeShot.val(), function(key, value){
      currentId = value.id;
      
      if(currentId - previousId > 1){
        while(currentId - previousId > 1){
          previousId++
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