
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
var pokedex = "";
var test = "";

//var fbu = firebase.auth().currentUser;
function pokedexList(){
  var loop = 1;
  
  
  pokedex = "<table>";

  while(loop < 152){
    pokedex += "<tr>";
    
    
    fdb.ref( "User/PokeList/" + loop + "/Pokedex")
    .once("value")
    .then(function(pokeshot){
      pokedex += "<td> N<sub>o</sub> ";

      if(pokeshot.hasChild("name")){
       
        test += pokeshot.val().id;
        pokedex += "</td>";
        pokedex += "<td>";
        pokedex += pokeshot.val().name;
        pokedex += "</td>";

        console.log("info " + JSON.stringify(pokeshot.val()));
      
      }else{
        pokedex += loop
        pokedex += "</td>";
        pokedex += "<td>_ _ _ _ _ _</td>";
        console.log(loop + ":  ?????");
      }
    });
    loop++;
    
    pokedex += "</tr>"
  }


  pokedex += "</table>";
  console.log("test2 " + test);
  console.log("test" + pokedex);
  $("#test").html(pokedex);
}

pokedexList();