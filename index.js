"use strict";
import confetti from "canvas-confetti";
import rock from "./images/icon-rock.svg";
import paper from "./images/icon-paper.svg";
import scissors from "./images/icon-scissors.svg";
const overlay = document.querySelector(".overlay");
const showRules = document.querySelector(".rules-btn");
const rulesWindow = document.querySelector(".rules-window");
const closeBtn = document.querySelector(".close-btn");
const figuresContainer = document.querySelector(".figures-container");
const figureBtn = document.querySelectorAll(".figure-btn");
const heading = document.querySelector(".heading-primary");
const body = document.querySelector("body");
const playAgainBtn = document.querySelector(".again-btn");
const score = document.querySelector(".user-score");
const posibilities = ["rock", "paper", "scissors"];

// VARIABLES
let userPick;
let cpuPick;
let booleanValue = true;
let userScore = 0;
let count = 3;

// Showing a rules window
function dealingRulesWindow() {
  overlay.classList.toggle("hidden");
  rulesWindow.classList.toggle("hidden");
}
showRules.addEventListener("click", dealingRulesWindow);
overlay.addEventListener("click", dealingRulesWindow);
closeBtn.addEventListener("click", dealingRulesWindow);

////////////////

// SHOWING RESULT TO THE USER
function printingResult(result) {
  figuresContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="result-container ">
    <h2 class="result">${result}</h2>
    <button class="again-btn">play again</button>
    </div>
    `
  );
  score.textContent = userScore;
}

function choosingIconDraw(figureName) {
  if (figureName === "rock") {
    return rock;
  } else if (figureName === "paper") {
    return paper;
  } else return scissors;
}

function countDown() {
  heading.textContent = count;
  count--;
}

function userCPUheaders() {
  figuresContainer.insertAdjacentHTML(
    "afterbegin",
    `<h3 class="user-pick">Your pick</h3>
<h3 class="cpu-pick">CPU pick</h3>`
  );
}

function showingCpuPick() {
  const numberOfFigure = Math.round(Math.random() * 2);
  const figureName = posibilities[numberOfFigure];
  const cpuBtn = Array.from(document.querySelectorAll(".figure-btn")).find(
    (el) => el.dataset.figure === figureName
  );

  cpuPick = figureName;
  if (cpuPick === userPick) {
    figuresContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="figure-btn picked-cpu" data-figure="${figureName}">
    <img src="${choosingIconDraw(
      figureName
    )}" alt="${figureName}" rel="noreferrer" crossorigin />
  </button>`
    );
  } else {
    cpuBtn.classList.toggle("hidden-2");
    cpuBtn.classList.add("picked-cpu");
  }
}

function revealWinner() {
  if (userPick === "paper" && cpuPick === "scissors") {
    userScore = userScore - 1;
    printingResult("You lose");
  } else if (userPick === "paper" && cpuPick === "rock") {
    userScore += 1;
    printingResult("You win");
    confetti();
  } else if (userPick === "scissors" && cpuPick === "rock") {
    userScore = userScore - 1;
    printingResult("You lose");
  } else if (userPick === "scissors" && cpuPick === "paper") {
    userScore += 1;
    printingResult("You win");
    confetti();
  } else if (userPick === "rock" && cpuPick === "paper") {
    userScore = userScore - 1;
    printingResult("You lose");
  } else if (userPick === "rock" && cpuPick === "scissors") {
    userScore += 1;
    printingResult("You win");
    confetti();
  } else if (userPick === cpuPick) {
    printingResult("draw");
  }
}

function newRound() {
  figuresContainer.innerHTML = "";
  figuresContainer.insertAdjacentHTML(
    "afterbegin",
    ` <button class="figure-btn" data-figure="rock">
    <img src="${rock}" alt="Rock" />
  </button>
  <button class="figure-btn" data-figure="paper">
    <img src="${paper}" alt="Paper" />
  </button>
  <button class="figure-btn" data-figure="scissors">
    <img src="${scissors}" alt="scissors" />
  </button>`
  );
}

figuresContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("again-btn")) {
    booleanValue = true;
    // STARTING A NEW ROUND AFTER PRESSING AGAIN BUTTON
    newRound();
  }
  if (booleanValue) {
    if (e.target.closest(".figure-btn")) {
      booleanValue = false;
      countDown();
      const timer = setInterval(() => {
        countDown();
        if (count < 0) {
          clearInterval(timer);
          heading.textContent = "Choose a figure";
          count = 3;
        }
      }, 1000);
      // SETTING A 3 SECOND TIMEOUT
      setTimeout(() => {
        // HIDING NOT SELECTED BUTTONS
        const figuresBtnArr = Array.from(
          document.querySelectorAll(".figure-btn")
        );
        figuresBtnArr
          .filter(
            (btn) =>
              btn.dataset.figure !==
              e.target.closest(".figure-btn").dataset.figure
          )
          .forEach((btn) => btn.classList.add("hidden-2"));
        // ADDING A CLASS TO A BUTTON PRESSED BY USER
        e.target.closest(".figure-btn").classList.add("picked-user");
        userPick = e.target.closest(".figure-btn").dataset.figure;
        // SHOWING HEADERS
        userCPUheaders();
        // SHOWING WHAT CPU PICKED
        showingCpuPick();
        // REVEALING THE WINNEr
        revealWinner();
      }, 3000);
    }
  }
});
