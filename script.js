import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  push,
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
const database = getDatabase(app);
const createBtn = document.querySelector(".createBtn");
const form = document.querySelector(".new-form");
createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const questionEl = document.getElementById("question").value;
  const answerFirst = document.querySelector(".answer-first").value;
  const answerSecond = document.querySelector(".answer-second").value;
  const newQuestion = ref(database, "questions");
  const newQuestionRef = push(newQuestion);
  set(newQuestionRef, {
    question: questionEl,
    answerF: {
      text: answerFirst,
      count: 0,
    },
    answerS: {
      text: answerSecond,
      count: 0,
    },
  });
  alert("Successfull");
  const formEl = document.createElement("div");

  formEl.innerHTML = `<p class="form-question">${questionEl}</p>
  <button class="btn-result-first">${answerFirst} <span class="count-first">0</span></button>
  <button class="btn-result-second">${answerSecond} <span class="count-second">0</span></button>`;
  formEl.classList.add("result-form");
  form.append(formEl);
  const btnFirst = document.querySelector(".btn-result-first");
  const btnSecond = document.querySelector(".btn-result-second");
  const countSpanFirst = document.querySelector(".count-first");
  const countSpanSecond = document.querySelector(".count-second");
  btnFirst.addEventListener("click", (e) => {
    e.preventDefault();
    let newCountFirst = parseInt(countSpanFirst.textContent) + 1;
    countSpanFirst.textContent = newCountFirst;
    update(newQuestionRef, {
      "answerF/count": newCountFirst,
    });
  });
  btnSecond.addEventListener("click", (e) => {
    e.preventDefault();
    let newCountSecond = parseInt(countSpanSecond.textContent) + 1;
    countSpanSecond.textContent = newCountSecond;
    update(newQuestionRef, {
      "answerS/count": newCountSecond,
    });
  });
});
