
import { Games } from "./tournament-utils.js";
import { Tournament } from "./tournament-utils.js";


export function ShowTournaments() {

    console.log("Show Tournaments Called");
    var div = document.createElement("div");
    div.style.background = "red";
    div.style.color = "white";
    div.style.width = "100wh";
    div.style.height = "100vh";
    div.style.padding = "5rem";
    div.style.margin = "5rem";
    div.id = "tourney"
    div.innerHTML = "Current Tournaments:";

    var crtourney = document.createElement("div");
    crtourney.innerHTML = `
    <input id="createTourneyInput" type="text">
    <input id="createTourney" type="button" value="Create Tournament">
    `; 

    var gameSelection = document.createElement("div");
    gameSelection.innerHTML = 
    `<select name="games" id="games">  
    <option value="Mario Kart">Mario Kart</option>
    <option value="Smash Bros">Smash Bros</option>
    <option value="Andy Novocin">Andy Novocin</option>
    <option value="Clash Royale">Clash Royale</option>
    </select>`;

    document.getElementById("main").appendChild(div);
    document.getElementById("tourney").appendChild(gameSelection);
    document.getElementById("tourney").appendChild(crtourney);
    document.querySelector("#createTourney").addEventListener("click", CreateTournament);

    AddTourneyTable();
}

function AddTourneyTable() {

    var tourneytableLayout = document.createElement("div");
    tourneytableLayout.innerHTML = 
    `
    <table id="tourneyTableLayout" style="width:100%;">
    <tr>
      <th>Tournament</th>
      <th>Game</th>
      <th>Entrants</th>
    </tr>
    </table>`;
    tourneytableLayout.id = "tableLayoutDiv"
    document.getElementById("tourney").appendChild(tourneytableLayout);

    firebase.database().ref("/Tournaments").on("value", ss=>{
        console.log(ss.val());
        document.getElementById("tourneyTableLayout").querySelector("tbody").innerHTML = "";
        ss.forEach(function(childNodes){
            //This loop iterates over children of Tournaments
            //childNodes.key is key of the children of userid such as (20170710)
            //childNodes.val().name;
            //childNodes.val().time;
            //childNodes.val().rest_time;
            //childNodes.val().interval_time;

            var nodeValue = childNodes.val()
            AddTourneyRow(nodeValue.name, nodeValue.game);     
      
        });

    });
}


function AddTourneyRow(name, game) {
    
    var tourneytable = document.createElement("tr");
    tourneytable.innerHTML = `
    <tr>
      <td>${name}</td>
      <td>${game}</td>
      <td><input id="joinTournament" type="button" value="Join Tournament">(83 entrants)</td>
    </tr>
    `;
    console.log(document.getElementById("tourneyTableLayout").querySelector("tbody"));
    document.getElementById("tourneyTableLayout").querySelector("tbody").appendChild(tourneytable);
}


function CreateTournament() {
    console.log(document.getElementById("tourney").querySelector("input"));
    var tourneyName = document.getElementById("tourney").querySelector("input").value;
    console.log(tourneyName);

    alert("Successfully added the Tournament!");

    console.log(document.getElementById("games").value);
    var gameName = document.getElementById("games").value;

    var tourney = new Tournament(tourneyName, gameName, []);
    console.log(tourney);
    firebase.database().ref("/Tournaments").push(tourney);
}