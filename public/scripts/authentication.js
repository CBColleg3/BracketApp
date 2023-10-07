


document.querySelector("#login").addEventListener("click", LogInClicked);
document.querySelector("#logout").addEventListener("click", LogOutClicked);

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

        var playersRef = firebase.database().ref(`/${user.uid}`).set(playerInfo);
        document.querySelector("#welcomeText").innerHTML = `Welcome ${user.displayName}!`;
        document.querySelector("#login").style = "visibility: hidden";
        document.querySelector("#logout").style = "";
        console.log("user has logged in!");
    }).catch((error) => {
        console.log("user unable to log in!");
        alert("unable to log in...");
    });
}

export function LogOutClicked() {

    console.log("LogOut Clicked!");

}