const dateTarget = new Date("2026-07-11T19:00:00+06:00");
const countdown = document.querySelector(".countdown");
const finished = document.getElementById("finished");

function updateCountdown() {
  const distance = dateTarget.getTime() - Date.now();
  if (distance <= 0) {
    countdown.hidden = true;
    finished.hidden = false;
    return;
  }

  const parts = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };

  Object.entries(parts).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, "0");
  });
}

function celebrate() {
  for (let i = 0; i < 18; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = i % 3 === 0 ? "✦" : "♥";
    heart.style.left = `${45 + Math.random() * 10}%`;
    heart.style.top = `${70 + Math.random() * 10}%`;
    heart.style.setProperty("--x", `${(Math.random() - 0.5) * 260}px`);
    heart.style.animationDelay = `${Math.random() * 0.35}s`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2600);
  }
}

document.getElementById("yesButton").addEventListener("click", () => {
  document.getElementById("answerButtons").hidden = true;
  document.getElementById("answerResult").hidden = false;
  celebrate();
});

document.getElementById("maybeButton").addEventListener("click", (event) => {
  event.currentTarget.textContent = "Я всё-таки согласна ✦";
  event.currentTarget.classList.add("yes-button");
  event.currentTarget.classList.remove("maybe-button");
  event.currentTarget.onclick = () => document.getElementById("yesButton").click();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
updateCountdown();
setInterval(updateCountdown, 1000);
