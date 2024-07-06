import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { GoogleAuthProvider, signOut, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getFirestore, doc, getDoc, updateDoc, collection, getDocs, addDoc, query, where } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"; 

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBE9MbFxykj8R9ChtpIdQs-EHVAgh55wfc",
    authDomain: "patientlogin-3bec9.firebaseapp.com",
    projectId: "patientlogin-3bec9",
    storageBucket: "patientlogin-3bec9.appspot.com",
    messagingSenderId: "126036300888",
    appId: "1:126036300888:web:520ea548156e714fb4a62d",
    measurementId: "G-BM7W3VP9TQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const patientName = localStorage.getItem('patientName');


async function fetchQuery(email) {
    try{
        const patientName = sessionStorage.getItem('userName');
        document.getElementById('welcome-message').innerHTML = `Welcome ${patientName}`;
        const patientCollection = collection(db, "patients");
        const docCollection = query(patientCollection, where("email", "==", email));
        const querySnapshot = await getDocs(docCollection);
        querySnapshot.forEach((doc) => {
            
            // const cardDisplay = document.getElementById("visitCards");
            // const card = document.createElement("div");
            // const doctorName = document.createElement("p");
            // const time = document.createElement("p");
            // const hospital = document.createElement("p");
            // const reportID = document.createElement("p");
            // card.classList.add("visit");
            // card.classList.add("col-sm-4");
            // doctorName.classList.add("doctorName");
            // hospital.classList.add("hospitalName");
            // time.classList.add("time");
            // const id = doc.id;
            // const functionCall = `handleClick('${id}')`;
            // card.setAttribute('onclick', functionCall);
            // doctorName.innerHTML = "Dr. "+doc.data().doctorName;
            // hospital.innerHTML = doc.data().hospital;
            // time.innerHTML = doc.data().time;
            // card.innerHTML = doctorName.outerHTML;
            // card.innerHTML += hospital.outerHTML;
            // card.innerHTML += time.outerHTML;
            
            // cardDisplay.appendChild(card);
            const cardDisplay = document.getElementById("visitCards");
            const innerCard = document.createElement("div");
            const time = document.createElement("div");
            const content = document.createElement("div");
            const card = document.createElement("div");
            const doctorName = document.createElement("p");
            const hospitalName = document.createElement("p");
            const date = document.createElement("li");
            const month = document.createElement("li");
            const ulist = document.createElement("ul");
            innerCard.classList.add("row")
            innerCard.classList.add("visit");
            innerCard.classList.add("col-sm-4");
            time.classList.add("time");
            time.classList.add("col-sm-2");
            date.classList.add("date");
            month.classList.add("month");
            content.classList.add("content");
            date.innerHTML = doc.data().date;
            month.innerHTML = doc.data().month;
            ulist.innerHTML = date.outerHTML;
            ulist.innerHTML += month.outerHTML;
            time.innerHTML = ulist.outerHTML;
            doctorName.classList.add("doctorName");
            hospitalName.classList.add("hospitalName");
            const id = doc.id;
            const functionCall = `handleClick('${id}')`;
            innerCard.setAttribute('onclick', functionCall);
            doctorName.innerHTML = "Dr. "+doc.data().doctorName;
            hospitalName.innerHTML = doc.data().hospital;
            content.innerHTML = doctorName.outerHTML;
            content.innerHTML += hospitalName.outerHTML;
            innerCard.innerHTML = time.outerHTML;
            innerCard.innerHTML += content.outerHTML;
            cardDisplay.appendChild(innerCard);

        }); 
    } catch(e) {

    }
}


const reportView = document.getElementById('reportView');
const userEmail = sessionStorage.getItem('userEmail');
if(!reportView){
document.addEventListener('DOMContentLoaded', async () => {
    try {
        fetchQuery(userEmail);
    } catch (error) {
        console.error('Error fetching patient details or reports:', error);
    }
});
}


if (reportView) {
    try{
        const reportID = sessionStorage.getItem('reportID');
        const patientCollection = collection(db, "patients");
        const docCollection = query(patientCollection, where("email", "==", "deeps@gmail.com"), where("__name__", "==", "EVgJD7zShcPP5crJ59Zj"));
        const querySnapshot = await getDocs(docCollection);
        querySnapshot.forEach((doc) => {
            const name = doc.data().name;
            const age = doc.data().age;
            const weight = doc.data().weight;
            const height = doc.data().height;
            const doctorName = doc.data().doctorName;
            const symptoms = doc.data().symptoms;
            const prescription = doc.data().prescription;
            const diag = doc.data().diag;
            const hospitalName = doc.data().hospital;
            const date = doc.data().date;
            const month = doc.data().month;
            document.getElementById('date').innerHTML = date;
            document.getElementById('month').innerHTML = month;
            document.getElementById('hospital').value = hospitalName;
            document.getElementById('name').value = name;
            document.getElementById('age').value = age;
            document.getElementById('weight').value = weight;
            document.getElementById('height').value = height;
            document.getElementById('doctorName').innerHTML = "Dr. " + doctorName;
            document.getElementById('symp').value = symptoms;
            document.getElementById('diag').value = diag;
            document.getElementById('pres').value = prescription;

        });
    }
    catch(e){
        console.log(e);
    }
}

const scanner = document.getElementById('scanner');
if(scanner) {
    scanner.addEventListener('click', () => {
        window.location.href = "scanner.html";
    });
}