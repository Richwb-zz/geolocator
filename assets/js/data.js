
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
var fdb = firebase.database;


function foundPokedex(pokeInfo){
  fdb.ref("User/PokeList/" + pokeInfo.id)
  .once("value")
  .then(function(snapshot){
    if(!(snapshot.val())){
      
      var pokeSet[pokeInfo.id] = {
        pokedex: {
          caught: "no",
          id: pokeInfo.id,
          name: pokeInfo.name
        },
        image: pokeInfo.image
      };


      fdb.ref("User/PokeList").set(pokeSet);
    }
  });
}

function caughtPokedex(pokeInfo){

  var pokeSet[pokeInfo.id] = {
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

  fdb.ref("User/PokeList/" + pokeInfo.id).update(pokeSet);

}