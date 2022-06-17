const body = document.querySelector("body");

const makeOverlay = () => {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.classList.add("hidden");

  body.append(overlay);
  return overlay;
};

const makeModal = (whoWon) => {
  const overlay = makeOverlay();
  const modal = document.createElement("div");
  modal.classList.add("modal-start");
  modal.classList.add("fadeUp");

  //header
  const h3 = document.createElement("h3");
  h3.textContent = whoWon === "White" ? "White wins!" : "Black wins!";
  modal.append(h3);

  //description
  const p = document.createElement("p");
  p.textContent = "Who plays first?";
  modal.append(p);

  //buttons
  const again = document.createElement("button");
  again.textContent = "Again";

  again.onclick = () => {
    location.reload();
    overlay.remove();
  };
  modal.append(again);

  overlay.append(modal);
};

export default makeModal;
