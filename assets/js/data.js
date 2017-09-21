
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
var userId;


function playerLogin(player){
  userId = player.uid;
  fdb.ref(player.uid)
  .once("value")
  .then(function(playerShot){

    if(!playerShot.val()){
      var playerInfo = {};

      playerInfo = {
        name: player.displayName,
      }

      fdb.ref(player.uid + "/User").set(playerInfo)
    }
  });
}

function foundPokedex(pokeInfo){
  fdb.ref(userId + "/pokedex/")
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
      fdb.ref(userId + "/pokedetails").set(pokeSet);
      fdb.ref(userId + "/pokedex/").set(pokedex);
    } else if(!pokeShot.val().id){
      fdb.ref(userId + "/pokedetails/").update(pokeSet);
      fdb.ref(userId + "/pokedex/").update(pokedex);  
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

  pokedex[userId + "/pokedex/" + pokeFoundInfo.id + "/caught"] = "yes";
 
  for(var key in pokeFoundInfo){
    if(key.includes("type")){
      types = {[key] : pokeFoundInfo[key]};
      fdb.ref(userId + "/pokedetails/" + pokeFoundInfo.id + "/types").update(types);
    }
  }
  
  fdb.ref(userId + "/pokedetails/" + pokeFoundInfo.id).update(pokeStats);
  fdb.ref().update(pokedex);

}

function viewPokedex(){
  fdb.ref(userId + "/pokedex")
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
  var pokeDetails;
  var pokeDex;

  fdb.ref(userId + "/pokedex/" + id)
  .once("value")
  .then(function(pokeShot){
    pokeDex = pokeShot.val();
  
    fdb.ref(userId + "/pokedetails/" + id)
    .once("value")
    .then(function(pokeShot){
      pokeDetails = pokeShot.val();
    
      
      $("#sprite").html("<img src='" + pokeDetails.image + "'>");

      $("#pokedex-id").append(" " + pokeDex.id);
      $("#pokedex-name").append(" " + pokeDex.name);
      $("#pokedex-caught").append(" " + pokeDex.caught);

      $("#pokedex-height").append(" " + pokeDetails.stats.height);
      $("#pokedex-weight").append(" " + pokeDetails.stats.weight);



      for(var key in pokeDetails.types){
        $("#pokedex-type").append("<div>" + key + ": " + pokeDetails["types"][key] + "<div>");
      }
    });
  });
}