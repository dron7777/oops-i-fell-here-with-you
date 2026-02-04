// =====================
// Elements
// =====================
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");

const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Music
const musicBefore = document.getElementById("music-before");
const musicAfter = document.getElementById("music-after");

let musicSwitched = false;

// =====================
// Envelope click
// =====================
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    document.querySelector(".letter-window").classList.add("open");
  }, 50);

  musicBefore.volume = 0.4;
  musicBefore.play().catch(() => {});
});

// =====================
// NO button runs away 😈
// =====================
noBtn.addEventListener("mouseover", () => {
  const distance = 200;
  const angle = Math.random() * Math.PI * 2;

  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// =====================
// Smooth crossfade function 🎶
// =====================
function crossFadeMusic(from, to) {
  let fadeOut = from.volume;
  let fadeIn = 0;

  to.volume = 0;
  to.play().catch(() => {});

  const interval = setInterval(() => {
    fadeOut -= 0.5;
    fadeIn += 0.02;

    if (fadeOut <= 0) {
      from.pause();
      from.currentTime = 0;
      to.volume = 0.5;
      clearInterval(interval);
    } else {
      from.volume = fadeOut;
      to.volume = fadeIn;
    }
  }, 100);
}

// =====================
// Confetti explosion 🎉
// =====================
function launchConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 7,
      spread: 70,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// =====================
// YES clicked 💖
// =====================
yesBtn.addEventListener("click", () => {
  if (musicSwitched) return;
  musicSwitched = true;

  title.textContent = "Yippeeee!";
  catImg.src = "WhatsApp Image 2026-02-02 at 23.36.18.jpeg";

  document.querySelector(".letter-window").classList.add("final");
  buttons.style.display = "none";
  finalText.style.display = "block";

  // 🎉 Confetti blast
  launchConfetti();

  // 🎶 Smooth music switch
  crossFadeMusic(musicBefore, musicAfter);
});
