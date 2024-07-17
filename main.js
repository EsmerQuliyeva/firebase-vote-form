import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyB-I4AhpW-mQvgWtFoOSUacXXDTKnrR0J0",
  authDomain: "user-61fd7.firebaseapp.com",
  databaseURL: "https://user-61fd7-default-rtdb.firebaseio.com",
  projectId: "user-61fd7",
  storageBucket: "user-61fd7.appspot.com",
  messagingSenderId: "75055007302",
  appId: "1:75055007302:web:a982d26b0deb436fd12c47",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const logInBtn = document.getElementById("log-in");
const signInBtn = document.getElementById("sign-in");

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.uid);
      console.log(user.email);
      set(ref(database, `users/${user.uid}`), {
        email: email,
        password: password,
      });

      alert("user created");
    })
    .catch((error) => {
      console.error(error.code, error.message);
    });
});

logInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //Log in
      const user = userCredential.user;

      const dt = new Date();

      update(ref(database, `users/${user.uid}`), {
        last_login: dt
      });
alert("Succesffull")
      window.location.href = "anket.html";
    })
    .catch((error) => {
      console.error(error.code, error.message);
    });
});


