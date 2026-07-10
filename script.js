const meetingDate = new Date("2026-07-11T19:00:00+06:00");
const countdown = document.getElementById("countdown");
const finished = document.getElementById("finished");
const actions = document.getElementById("actions");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const answerResult = document.getElementById("answerResult");
const noModal = document.getElementById("noModal");
const modalClose = document.getElementById("modalClose");
const isMobileDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

function updateCountdown() {
  const distance = meetingDate.getTime() - Date.now();

  if (distance <= 0) {
    countdown.hidden = true;
    finished.hidden = false;
    return;
  }

  const values = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };

  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, "0");
  });
}

function overlapsYes(left, top) {
  const gap = 8;
  const yesLeft = yesButton.offsetLeft;
  const yesTop = yesButton.offsetTop;
  return !(
    left + noButton.offsetWidth + gap < yesLeft ||
    left > yesLeft + yesButton.offsetWidth + gap ||
    top + noButton.offsetHeight + gap < yesTop ||
    top > yesTop + yesButton.offsetHeight + gap
  );
}

function moveNoButton() {
  const maxLeft = Math.max(0, actions.clientWidth - noButton.offsetWidth);
  const maxTop = Math.max(0, actions.clientHeight - noButton.offsetHeight);
  let left = maxLeft;
  let top = 0;

  for (let attempt = 0; attempt < 24; attempt += 1) {
    const candidateLeft = Math.random() * maxLeft;
    const candidateTop = Math.random() * maxTop;
    if (!overlapsYes(candidateLeft, candidateTop)) {
      left = candidateLeft;
      top = candidateTop;
      break;
    }
  }

  noButton.style.right = "auto";
  noButton.style.left = `${left}px`;
  noButton.style.top = `${top}px`;
}

function runAway(event) {
  event.preventDefault();
  moveNoButton();
}

if (isMobileDevice) {
  noButton.addEventListener("click", () => {
    noModal.hidden = false;
    document.body.style.overflow = "hidden";
  });
} else {
  noButton.addEventListener("pointerenter", runAway);
  noButton.addEventListener("pointerdown", runAway);
  noButton.addEventListener("click", runAway);

  actions.addEventListener("pointermove", (event) => {
    const buttonRect = noButton.getBoundingClientRect();
    const distance = Math.hypot(
      event.clientX - (buttonRect.left + buttonRect.width / 2),
      event.clientY - (buttonRect.top + buttonRect.height / 2)
    );
    if (distance < 76) moveNoButton();
  });
}

function closeNoModal() {
  noModal.hidden = true;
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeNoModal);
noModal.addEventListener("click", (event) => {
  if (event.target === noModal) closeNoModal();
});

function celebrate() {
  for (let i = 0; i < 26; i += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.textContent = i % 4 === 0 ? "✦" : "♥";
    particle.style.setProperty("--x", `${(Math.random() - 0.5) * 330}px`);
    particle.style.setProperty("--y", `${-80 - Math.random() * 310}px`);
    particle.style.setProperty("--r", `${(Math.random() - 0.5) * 160}deg`);
    particle.style.animationDelay = `${Math.random() * 0.25}s`;
    document.getElementById("particles").appendChild(particle);
    setTimeout(() => particle.remove(), 2500);
  }
}

yesButton.addEventListener("click", () => {
  actions.hidden = true;
  document.querySelector(".question").hidden = true;
  answerResult.hidden = false;
  celebrate();
});

updateCountdown();
setInterval(updateCountdown, 1000);
