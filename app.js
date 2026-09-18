// --- ROSTER DATA CONFIGURATION ---
const roster = [
  { id: 1, name: "Andrew", number: "01", file: "audio/andrew-final.mp3" },
  { id: 2, name: "August", number: "02", file: "temp/announcer/test-august.mp3" },
  { id: 3, name: "Bear", number: "03", file: "temp/announcer/test-bear.mp3" },
  { id: 4, name: "Benjamin", number: "04", file: "temp/announcer/test-benjamin.mp3" },
  { id: 5, name: "Cole", number: "05", file: "temp/announcer/test-cole.mp3" },
  { id: 6, name: "James P", number: "06", file: "temp/announcer/test-james-p.mp3" },
  { id: 7, name: "James R", number: "07", file: "temp/announcer/test-james-r.mp3" },
  { id: 8, name: "Jonah", number: "08", file: "temp/announcer/test-jonah.mp3" },
  { id: 9, name: "Logan", number: "09", file: "temp/announcer/test-logan.mp3" },
  { id: 10, name: "Rally", number: "10", file: "temp/announcer/test-rally.mp3" },
  { id: 11, name: "Riichi", number: "11", file: "temp/announcer/test-riichi.mp3" },
  { id: 12, name: "Winston", number: "12", file: "temp/announcer/test-winston.mp3" }
  // Add remaining team players here...
];

const temp/announcer = new temp/announcer();
let currentPlayingId = null;
let fadeInterval = null;

const grid = document.getElementById("roster-grid");
const stopBtn = document.getElementById("stop-btn");
const fadeBtn = document.getElementById("fade-btn");

// 1. Build UI Grid
roster.forEach(player => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = player.id;
  card.innerHTML = `
    <div class="number">#${player.number}</div>
    <div class="name">${player.name}</div>
  `;
  card.addEventListener("click", () => playSong(player));
  grid.appendChild(card);
});

// 2. Play temp/announcer Logic
function playSong(player) {
  clearInterval(fadeInterval);
  temp/announcer.volume = 1.0;

  // If clicking currently playing player, restart track
  if (currentPlayingId === player.id) {
    temp/announcer.currentTime = 0;
    temp/announcer.play();
    return;
  }

  currentPlayingId = player.id;
  updateActiveCard();

  temp/announcer.src = player.file;
  temp/announcer.play().catch(err => console.error("temp/announcer playback error:", err));
}

// 3. Stop temp/announcer
function stoptemp/announcer() {
  clearInterval(fadeInterval);
  temp/announcer.pause();
  temp/announcer.currentTime = 0;
  temp/announcer.volume = 1.0;
  currentPlayingId = null;
  updateActiveCard();
}

// 4. Smooth 2-Second Fade Out
function fadetemp/announcer() {
  if (!currentPlayingId || temp/announcer.paused) return;
  
  clearInterval(fadeInterval);
  const fadeStepMs = 100;
  const fadeDurationMs = 2000;
  const volumeStep = temp/announcer.volume / (fadeDurationMs / fadeStepMs);

  fadeInterval = setInterval(() => {
    if (temp/announcer.volume > volumeStep) {
      temp/announcer.volume -= volumeStep;
    } else {
      stoptemp/announcer();
    }
  }, fadeStepMs);
}

// Highlight active playing button
function updateActiveCard() {
  document.querySelectorAll(".card").forEach(card => {
    if (parseInt(card.dataset.id) === currentPlayingId) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
}

// Event Listeners
stopBtn.addEventListener("click", stoptemp/announcer);
fadeBtn.addEventListener("click", fadetemp/announcer);

// Register Service Worker for Offline Playback
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .then(reg => console.log("Service Worker registered successfully."))
      .catch(err => console.error("Service Worker registration failed:", err));
  });
}