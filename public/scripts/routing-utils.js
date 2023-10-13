import { Tournament } from "./tournament-utils.js";


export let GoToUrl = (pathName) => history.pushState(pathName, "", "#" + pathName);


export function GoToTournament(id) {

    document.getElementById("tourney").style.display = "none";

    var tourneyUI = document.createElement("div");
    var tourneyName = localStorage.getItem(id).split(",")[0];
    var tourneyGame = localStorage.getItem(id).split(",")[1];

    tourneyUI.id = "tourneyviewer"
    tourneyUI.style = "height: 100vh; width: 100vw; background: red; color: white; padding: 5rem; margin: 5rem;";
    tourneyUI.innerHTML = `
    <h1>${tourneyName}</h1>
    <h2>${tourneyGame}</h2>
    <input type="button" id="enterbracket" value="Enter Tournament Bracket">
    `;
    document.getElementById("main").appendChild(tourneyUI);
    document.querySelector("#enterbracket").addEventListener("click", () => {
        AddTounreyEntrant(id);
    });

    firebase.database().ref("/Tournaments/" + id + "/entrants").on("value", ss=>{
        console.log(ss.val());

        var entrantListings = document.createElement("div");
        entrantListings.innerHTML = `Entrants: `;
        Object.values(ss.val()).forEach((prop)=> entrantListings.innerHTML += prop + ",");     

        ss.forEach(function(childNodes){

        });

        document.querySelector("#tourneyviewer").appendChild(entrantListings);
    });
}

export function AddTounreyEntrant(id) {
    console.log("add tourney entrant entered");
    var name = firebase.auth().currentUser.displayName;
    firebase.database().ref("/Tournaments/" + id + "/entrants").push(name);
}

export function GoToHomePage() {
    document.getElementById("tourney").style.display = "";
}