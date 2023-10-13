
import { ShowTournaments } from "./tournament-showcase.js";

document.querySelector("#login").addEventListener("click", LogInClicked);
document.querySelector("#logout").addEventListener("click", LogOutClicked);

let loggedInUser = false;

document.addEventListener("DOMContentLoaded", function() {
    LoadAuthentication();
  });

function LoadAuthentication() {
    console.log("loaded auth");
    firebase.auth().onAuthStateChanged(user => {
        if(!!user) {
            loggedInUser = user;

            if(localStorage.getItem("name")) {
                document.querySelector("#welcomeText").innerHTML = `Welcome ${localStorage.getItem("name")}!`;
                document.querySelector("#login").style.display = "none";
                document.querySelector("#logout").style.display = "";
                console.log(localStorage.getItem("id"));

                ShowTournaments();
            }

        } else {

        }
    }); //Needed to do this to get firebase to automatically log u in???;
}

export function LogInClicked() {
    console.log("log in clicked!");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        var user = result.user;

        var playerInfo = {
            name: user.displayName,
            email: user.email
        }

        var playerRef = firebase.database().ref(`/Users`).push();
        playerRef.set({"name": playerInfo.name, "email": playerInfo.email, "id": playerRef.key});


        document.querySelector("#welcomeText").innerHTML = `Welcome ${user.displayName}!`;
        document.querySelector("#login").style.display = "none";
        document.querySelector("#logout").style.display = "";
        console.log("user has logged in!");

        localStorage.setItem("name", user.displayName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("id", playerRef.key);
        ShowTournaments();

        console.log(localStorage.getItem("name"));
    }).catch((error) => {
        console.log(error);
        alert("unable to log in...");
    });
}

export function LogOutClicked() {
    console.log("LogOut Clicked!");
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        document.querySelector("#welcomeText").innerHTML = "Please Log In Below";
        document.querySelector("#login").style = "";
        document.querySelector("#logout").style = "visibility: hidden";
    
        localStorage.setItem("name", "");
        localStorage.setItem("email", "");
        //var tourneyDiv = document.getElementById("tourney");
        //tourneyDiv.style.background = "white";
        //tourneyDiv.innerHTML = "";
        location.reload();
      }, function(error) {
        console.error('Sign Out Error', error);
      });
}