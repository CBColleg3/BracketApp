import { Tournament } from "./tournament-utils.js";
import { AddTounreyEntrant, DisplayBracket } from "./tournament-showcase.js";

export let GoToUrl = (pathName) => history.pushState(pathName, "", "#" + pathName);


export function GoToTournament(id) {

    document.getElementById("tourney").style.display = "none";

    var tourneyUI = document.createElement("div");
    //var tourneyName = localStorage.getItem(id).split(",")[0];
    //var tourneyGame = localStorage.getItem(id).split(",")[1];

    tourneyUI.id = "tourneyviewer"
    tourneyUI.style = "height: 200vh; width: 100vw; background: red; color: white; padding: 5rem; margin: 5rem;";
    
    tourneyUI.innerHTML = `
    <h1>Sample Title</h1>
    <h2>Sample Game</h2>
    <input type="button" id="enterbracket" value="Enter Tournament Bracket">
    `;
    
    document.getElementById("main").appendChild(tourneyUI);
    document.querySelector("#enterbracket").addEventListener("click", () => {
        AddTounreyEntrant(id);
    });

    DisplayBracket(id);
}

export function GoToHomePage() {
    document.getElementById("tourney").style.display = "";
}

export function routeToPage(urlParts) {

    console.log("routeToPage called! parameters: " + urlParts);
    if(urlParts.length < 3) {
        GoToHomePage();
    }
    else if(urlParts[1]==="#Tournaments" && urlParts[2].length > 1) {
        console.log("Tournament URL detected, entering in GoToTournament with URL: " + urlParts[2]);
        GoToTournament(urlParts[2]);
    } 
    else {
        GoToHomePage();
    }
}