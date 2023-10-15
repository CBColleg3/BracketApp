
import { Games } from "./tournament-utils.js";
import { Tournament, Player } from "./tournament-utils.js";
import { GoToUrl, GoToTournament } from "./routing-utils.js";

let tourney = false;

export function ShowTournaments() {

    console.log("Show Tournaments Called");
    var div = document.createElement("div");
    div.style.background = "red";
    div.style.color = "white";
    div.style.width = "100wh";
    div.style.height = "200vh";
    div.style.padding = "5rem";
    div.style.margin = "5rem";
    div.id = "tourney";
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
    tourneytableLayout.id = "tableLayoutDiv";
    document.getElementById("tourney").appendChild(tourneytableLayout);

    firebase.database().ref("/Tournaments").on("value", ss=>{
        //console.log(ss.val());
        document.getElementById("tourneyTableLayout").querySelector("tbody").innerHTML = "";
        ss.forEach(function(childNodes){

            var nodeValue = childNodes.val()
            AddTourneyRow(nodeValue.name, nodeValue.game, nodeValue.id);      
            //localStorage.setItem(nodeValue.id, nodeValue.name + "," + nodeValue.game);
            
        });

        let joinTourneyButtons  = document.getElementById("tourneyTableLayout").querySelectorAll("input");
        //console.log(joinTourneyButtons);
        
        joinTourneyButtons.forEach(el => {
            el.addEventListener("click", (event) => {
                // Something happens on click
                var pathname = "Tournaments/"+ el.id;
                GoToUrl(pathname);
                console.log(el.id);
                GoToTournament(el.id);
            })
        });
    });
}


function AddTourneyRow(name, game, id) {
    
    var tourneytable = document.createElement("tr");
    tourneytable.innerHTML = `
    <tr>
      <td>${name}</td>
      <td>${game}</td>
      <td><input name="${name}" id=${id} type="button" value="View Tournament"></td>
    </tr>
    `;
    //console.log(document.getElementById("tourneyTableLayout").querySelector("tbody"));
    document.getElementById("tourneyTableLayout").querySelector("tbody").appendChild(tourneytable);
}


function CreateTournament() {
    console.log(document.getElementById("tourney").querySelector("input"));
    var tourneyName = document.getElementById("tourney").querySelector("input").value;
    //console.log(tourneyName);

    alert("Successfully added the Tournament!");

    //console.log(document.getElementById("games").value);
    var gameName = document.getElementById("games").value;

    tourney = new Tournament(tourneyName, gameName, []);
    console.log(tourney);
    var tourneyRef = firebase.database().ref("/Tournaments").push();
    tourneyRef.set({"name": tourney.name, "game": tourney.game, "id": tourneyRef.key, "entrants": [], "creationDate": tourney.creationDate});
    tourney.id = tourneyRef.key;
}

export function AddTounreyEntrant(id) {
    console.log("add tourney entrant entered");
    var name = firebase.auth().currentUser.displayName;
    var uid = firebase.auth().currentUser.uid;

    var player = new Player(name, uid);

    firebase.database().ref("/Tournaments/" + id + "/entrants").push(player);
}


export function DisplayBracket(id) {

    var entrantListings = document.createElement("div");
    var bracket = document.createElement("div");  

    firebase.database().ref("/Tournaments/" + id).on("value", ss=>{
        console.log(ss.val());

        let curTournament = ss.val() || {};
        let allEntrants = curTournament.entrants;
        console.log("allENtrants: " + allEntrants);

        let totalEntrants = Object.keys(allEntrants).length;
        entrantListings.innerHTML = `Entrants: ${totalEntrants}`;
        MakeBracket(allEntrants);
        document.querySelector("#tourneyviewer").appendChild(entrantListings);
    });

    document.querySelector("#tourneyviewer").appendChild(bracket);

}


function MakeBracket(allEntrants) {

        let totalEntrants = Object.keys(allEntrants).length;

        let trackRounds = totalEntrants;
        let roundCount = 0;
        while(trackRounds > 0) {
            //console.log("trackRounds: " + trackRounds);
            trackRounds = Math.floor(trackRounds / 2);
            roundCount += 1;
        }
        //console.log(roundCount);

        let pvpList = [];
        let pvpCount = 0;
        let pvpString = "";
        console.log(allEntrants);
        Object.keys(allEntrants).map((eid, i) => {

            let theEntrant = allEntrants[eid].name;
            console.log(theEntrant);
            console.log("pvpCount: " + pvpCount);
            console.log("i: " + i);

            pvpString += theEntrant;
            if(pvpCount==0) pvpString += "/";
            pvpCount++;
            if(pvpCount >= 2) 
            {
                pvpList.push(pvpString);
                pvpString = "";
                pvpCount = 0;
            }

            if(i == totalEntrants - 1 && pvpCount > 0) 
            {
                console.log("this happened");
                pvpList.push(theEntrant);
            }
        });
        console.log(pvpList);

        var bracketBox = document.createElement("table");
        bracketBox.innerHTML += `            
        <tr>
        <th>Round 1.</th>
        </tr>`;
        for(let j = 0; j < pvpList.length; j++) {

            bracketBox.innerHTML += `  
            <tr>
            <th>${pvpList[j]}</th>
            </tr>`;
        }
        document.querySelector("#tourneyviewer").appendChild(bracketBox);

        var whoWonUI = document.createElement("div");
        whoWonUI.innerHTML=`Who Won?:`;
        document.querySelector("#tourneyviewer").appendChild(whoWonUI);

}