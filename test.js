import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, push, set, orderByChild, equalTo, get, query, update, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyARXkfgelSp_BiBTzJSUgKlbIfDGnIbXxo",
    authDomain: "nsproj-952d7.firebaseapp.com",
    databaseURL: "https://nsproj-952d7-default-rtdb.firebaseio.com",
    projectId: "nsproj-952d7",
    storageBucket: "nsproj-952d7.appspot.com",
    messagingSenderId: "538649995856",
    appId: "1:538649995856:web:c809202b6c5a2e899d7f55"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle email sign-in with Firebase
function signInWithEmailLink1() {
  const email = document.getElementById("email").value; // Replace with user's email
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://www.google.com/',
    handleCodeInApp: true,
  };

  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // Save email to localStorage for later verification
      window.localStorage.setItem('emailForSignIn', email);
      // Notify user that the link has been sent
      alert("An email with the sign-in link has been sent to your email address.");
    })
    .catch((error) => {
      console.error(error);
      alert("Error sending email link:", error.message);
    });
}

// Check if the current URL has a sign-in link, and complete sign-in process
if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    // Prompt user to enter their email again if not found in localStorage
    email = window.prompt('Please provide your email for confirmation');
  }

  // Sign-in with email and link
  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      // Clear the email from storage
      window.localStorage.removeItem('emailForSignIn');
      // You can redirect the user or do other operations here upon successful sign-in
      console.log("Sign-in successful:", result.user);
    })
    .catch((error) => {
      console.error(error);
      alert("Error signing in with email link:", error.message);
    });
}

const submit = document.getElementById("submit");
submit.addEventListener("click", function(e) {
    e.preventDefault();
    signInWithEmailLink1();
});