import renderApp from "./gamelogic.js";

const appElement = document.getElementById("app");

const body = document.querySelector("body");

const makeOverlay = () => {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.classList.add("hidden");

  body.append(overlay);
  return overlay;
};

const makeModal = () => {
  const overlay = makeOverlay();
  const modal = document.createElement("div");
  modal.classList.add("modal-start");

  //header
  const h3 = document.createElement("h3");
  h3.textContent = "Welcome to Chess!";
  modal.append(h3);

  //description
  const p = document.createElement("p");
  p.textContent = "Who plays first?";
  modal.append(p);

  //buttons
  const coinToss = document.createElement("button");
  coinToss.textContent = "Coin Toss";
  let whoStartsFirst;

  coinToss.onclick = () => {
    whoStartsFirst = Math.floor(Math.random() * 2) + 1 === 1 ? true : false;
    console.log(whoStartsFirst === true ? "White Start" : "Black Start");
    renderApp(appElement, whoStartsFirst);
    overlay.remove();
    modal.remove();
  };

  modal.append(coinToss);

  overlay.append(modal);
};

const startScreen = () => {
  return makeModal();
};

export default startScreen;
