
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

$(document).ready(function() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyANCo4S1yMZvhpSDWYKNbozlWOhhEadFEM",
    authDomain: "fbdemo-20825.firebaseapp.com",
    databaseURL: "https://fbdemo-20825-default-rtdb.firebaseio.com",
    projectId: "fbdemo-20825",
    storageBucket: "fbdemo-20825.appspot.com",
    messagingSenderId: "275080195229",
    appId: "1:275080195229:web:6a8152d6bd6662b335f874",
    measurementId: "G-0R61JXEQN8"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    //Listening on a forever callback, if the title updates this runs again (the GET request++)
    firebase.database().ref("/title").on("value", ss=>{
        document.querySelector("body").innerHTML = ss.val() || "...";
    });
    
    //Updating the title directly in code the PUT request
    firebase.database().ref("/title").set("Code-made Title Here");
    
    //pushing data into the DB like a POST request
    firebase.database().ref("/collectionorsomething").push({"hi":"there"});
    
    //deleting data
    firebase.database().ref("/killthis").remove();
});