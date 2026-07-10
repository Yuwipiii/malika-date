const couplePhoto = document.getElementById("couplePhoto");
const photoPlaceholder = document.getElementById("photoPlaceholder");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const memeModal = document.getElementById("memeModal");
const memeImage = document.getElementById("memeImage");
const modalClose = document.getElementById("modalClose");
const heartParticles = document.getElementById("heartParticles");

couplePhoto.addEventListener("load", () => {
  couplePhoto.hidden = false;
  photoPlaceholder.hidden = true;
});

couplePhoto.addEventListener("error", () => {
  couplePhoto.hidden = true;
  photoPlaceholder.hidden = false;
});

const memeCandidates = ["meme_cat.jpg", "meme_cat.png", "cat_meme.jpg"];
let memeCandidateIndex = 0;

memeImage.addEventListener("error", () => {
  memeCandidateIndex += 1;
  if (memeCandidateIndex < memeCandidates.length) {
    memeImage.src = memeCandidates[memeCandidateIndex];
  }
});

function showMeme() {
  memeModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeMeme() {
  memeModal.hidden = true;
  document.body.style.overflow = "";
}

noButton.addEventListener("click", showMeme);
modalClose.addEventListener("click", closeMeme);
memeModal.addEventListener("click", (event) => {
  if (event.target === memeModal) closeMeme();
});

function launchHearts() {
  const colors = ["#ffffff", "#ffd5e7", "#ef9ac1", "#d9b1ff"];

  for (let index = 0; index < 42; index += 1) {
    const heart = document.createElement("span");
    heart.className = "flying-heart";
    heart.textContent = index % 6 === 0 ? "♡" : "♥";
    heart.style.setProperty("--x", `${(Math.random() - 0.5) * 390}px`);
    heart.style.setProperty("--y", `${-180 - Math.random() * 470}px`);
    heart.style.setProperty("--r", `${(Math.random() - 0.5) * 240}deg`);
    heart.style.setProperty("--size", `${14 + Math.random() * 24}px`);
    heart.style.setProperty("--duration", `${1.7 + Math.random() * 1.2}s`);
    heart.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
    heart.style.animationDelay = `${Math.random() * .32}s`;
    heartParticles.appendChild(heart);
    setTimeout(() => heart.remove(), 3500);
  }
}

yesButton.addEventListener("click", () => {
  launchHearts();
});
