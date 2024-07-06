import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, push, set, orderByChild, equalTo, get, query, update } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD_ilpdaAX4PPH91olq7chMkOvB7DO36Ok",
    authDomain: "doctorlogin-1dec4.firebaseapp.com",
    projectId: "doctorlogin-1dec4",
    storageBucket: "doctorlogin-1dec4.appspot.com",
    messagingSenderId: "491776410264",
    appId: "1:491776410264:web:e067e67cdbf649a1ba46ed",
    measurementId: "G-X3FVXN74MH"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);


const result = document.getElementById("result");
const patientEmail = sessionStorage.getItem('userEmail');
async function fetch(info) {
    try{
        console.log("reached the function");
    const usersRef = ref(db, 'sockets'); // Assuming 'users' is the path where user data is stored
    const usersSnapshot = await get(usersRef);
  
    if (usersSnapshot.exists()) {
      usersSnapshot.forEach((userSnapshot) => {
          const userID = userSnapshot.key; // Get the user ID
          const userData = userSnapshot.val(); // Get the user data
          console.log(userData.doc);
          console.log(info);
          if (userData && userData.doc == info) {
            console.log(userData.doc);
              console.log(`User ID: ${userID}, Email: ${info}`);
              const nodePath = `nsproj/${userID}`;
              const newData = {
              doc: info,
              user: patientEmail
          };
          update(ref(db, nodePath), newData)
              .then(() => {
                  console.log("Attribute updated successfully!");
                  fetch();
              })
              .catch((error) => {
                  console.error("Error updating attribute:", error);
              });
              
          }
      });
    } else {
        console.log("No users found in the database.");
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
  }
}
console.log("helloo");
const scanner = new Html5QrcodeScanner('reader',{
    qrbox:{
        width:250,
        height:250,

    },
    fps:20,
});
scanner.render(success, error);

function success(result){
    console.log(result);
    document.getElementById('result').innerHTML=`<h2>Success</h2>
    <p><a href="${result}">${result}</a></p>`;
    const info = document.getElementById('result').textContent;
    result = info.replace(/^http:\/\//, '');
    console.log(result);
    fetch(result);
    scanner.clear();
    document.getElementById('reader').remove();

}
function error(err){
    console.error(err);
}
