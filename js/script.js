const TEST_MODE = false;
const BIRTHDAY_DAY = 19;
const BIRTHDAY_MONTH = 8; // September: 0-based month index

const giftMessages = {
  health: {
    icon: "💚",
    label: "BONUS BENEFIT UNLOCKED",
    title: "Santé",
    message: "Je te souhaite une excellente santé et beaucoup d'énergie pour cette nouvelle année !"
  },
  peace: {
    icon: "🕊️",
    label: "PEACE ALLOWANCE APPROVED",
    title: "Paix",
    message: "Que la paix accompagne tes journées, même lorsque les demandes RH arrivent toutes en même temps. 😄"
  },
  blessings: {
    icon: "🙏",
    label: "BLESSINGS PACKAGE",
    title: "Bénédictions",
    message: "Que Dieu te bénisse, te protège et guide tes pas dans cette nouvelle année."
  },
  hr: {
    icon: "🧑‍💼",
    label: "HR ADMIN SURVIVAL KIT",
    title: "Kit de survie HR Admin",
    message: "Contient : patience illimitée, café virtuel, dossiers bien classés et zéro urgence de dernière minute. 😂"
  }
};

const $ = (selector) => document.querySelector(selector);

function isBirthdayDate() {
  const today = new Date();
  console.log(today.toLocaleString())
  const bool = today.getDate() === BIRTHDAY_DAY && today.getMonth() === BIRTHDAY_MONTH
  console.log(bool)
  return bool;
}

function showCorrectDateView() {
  const isAllowed = TEST_MODE || isBirthdayDate();

  const birthdayApp = document.getElementById("birthdayApp");
  const dateGuard = document.getElementById("dateGuard");

  birthdayApp.style.display = isAllowed ? "block" : "none";
  dateGuard.style.display = isAllowed ? "none" : "grid";

  if (isAllowed) {
    initializeExperience();
  }
}

function initializeExperience() {
  buildCalendar();
  startSystemLog();
  bindGiftButtons();
  bindCakeButton();
  bindModalButtons();
  bindAudioControls();
  bindFinalCelebration();
}

function buildCalendar() {
  const daysContainer = $("#calendarDays");
  if (daysContainer.children.length) return;

  const firstDay = new Date(2026, 8, 1).getDay();
  const mondayOffset = (firstDay + 6) % 7;
  for (let i = 0; i < mondayOffset; i++) {
    const empty = document.createElement("span");
    daysContainer.appendChild(empty);
  }

  for (let day = 1; day <= 30; day++) {
    const cell = document.createElement("span");
    cell.textContent = day;
    if (day === BIRTHDAY_DAY) {
      cell.className = "birthday-day";
      cell.title = "Anniversaire de Sitraka";
    }
    daysContainer.appendChild(cell);
  }
}

function startSystemLog() {
  const log = $("#systemLog");
  if (log.dataset.started === "true") return;
  log.dataset.started = "true";

  const messages = [
    "Initializing HR Birthday System...",
    "Checking employee records...",
    "Calculating happiness balance...",
    "Verifying birthday authorization...",
    "Birthday celebration request: URGENT 🎂",
    "Workload temporarily replaced by cake.",
    "HR Admin status: OFFICIALLY 26 🎉"
  ];

  log.innerHTML = "";
  messages.forEach((message, index) => {
    window.setTimeout(() => {
      const line = document.createElement("p");
      line.textContent = `> ${message}`;
      log.appendChild(line);
    }, index * 420);
  });
}

function bindGiftButtons() {
  document.querySelectorAll("[data-gift]").forEach((button) => {
    button.addEventListener("click", () => openGift(button.dataset.gift));
  });
}

function openGift(giftKey) {
  const gift = giftMessages[giftKey];
  if (!gift) return;

  $("#giftModalIcon").textContent = gift.icon;
  $("#giftModalLabel").textContent = gift.label;
  $("#giftModalTitle").textContent = gift.title;
  $("#giftModalMessage").textContent = gift.message;

  const modal = $("#giftModal");
  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", "");
  }
  launchConfetti(28);
}

function closeGiftModal() {
  const modal = $("#giftModal");
  if (typeof modal.close === "function") modal.close();
  else modal.removeAttribute("open");
}

function bindModalButtons() {
  $("#closeGiftModal").addEventListener("click", closeGiftModal);
  $("#modalOkay").addEventListener("click", closeGiftModal);
  $("#giftModal").addEventListener("click", (event) => {
    if (event.target === $("#giftModal")) closeGiftModal();
  });
}

function bindCakeButton() {
  $("#blowCandles").addEventListener("click", () => {
    const stage = document.querySelector(".cake-stage");
    if (stage.classList.contains("blown")) return;

    stage.classList.add("blown");
    $("#cakeMessage").hidden = false;
    $("#blowCandles").textContent = "Bougies déjà soufflées 💗";
    launchConfetti(100);
    window.setTimeout(() => launchFireworks(), 650);
  });
}

function launchConfetti(amount = 60) {
  const layer = $("#confettiLayer");
  const fragment = document.createDocumentFragment();
  const colors = ["#e94f9b", "#f477b5", "#ffc4e0", "#ffffff", "#f3c969"];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${2.4 + Math.random() * 2.2}s`;
    piece.style.animationDelay = `${Math.random() * .35}s`;
    piece.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    fragment.appendChild(piece);
  }

  layer.appendChild(fragment);
  window.setTimeout(() => {
    layer.querySelectorAll(".confetti").forEach((node) => node.remove());
  }, 5200);
}

function launchFireworks() {
  const layer = $("#fireworksLayer");
  const fragment = document.createDocumentFragment();

  for (let burst = 0; burst < 4; burst++) {
    const centerX = 20 + Math.random() * 60;
    const centerY = 18 + Math.random() * 35;

    for (let i = 0; i < 24; i++) {
      const spark = document.createElement("span");
      const angle = (Math.PI * 2 * i) / 24;
      const distance = 45 + Math.random() * 90;
      spark.className = "spark";
      spark.style.left = `${centerX}%`;
      spark.style.top = `${centerY}%`;
      spark.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
      spark.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
      spark.style.animationDelay = `${burst * 180}ms`;
      fragment.appendChild(spark);
    }
  }

  layer.appendChild(fragment);
  window.setTimeout(() => {
    layer.querySelectorAll(".spark").forEach((node) => node.remove());
  }, 2200);
}

function bindAudioControls() {
  const audio = $("#birthdayAudio");
  const toggle = $("#musicToggle");

  toggle.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        toggle.innerHTML = '<i class="bi bi-pause-fill"></i><span>Pause</span>';
      } catch {
        toggle.innerHTML = '<i class="bi bi-exclamation-circle"></i><span>Audio absent</span>';
      }
    } else {
      audio.pause();
      toggle.innerHTML = '<i class="bi bi-music-note-beamed"></i><span>Musique</span>';
    }
  });

  audio.addEventListener("error", () => {
    toggle.title = "Ajoutez audio/birthday-music.mp3 pour activer la musique.";
  });
}

function startBirthdayMusic() {
  const audio = document.getElementById("birthdayAudio");

  audio.volume = 0.5;

  audio.play().catch((error) => {
    console.log("Lecture automatique bloquée :", error);
  });
}

function bindFinalCelebration() {
  $("#startCelebration").addEventListener("click", () => {
    $("#celebrationSection").scrollIntoView({ behavior: "smooth" });
    launchConfetti(50);
  });

  $("#finalCelebration").addEventListener("click", () => {
    launchConfetti(150);
    launchFireworks();
    document.querySelector(".final-card").animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.025)" },
        { transform: "scale(1)" }
      ],
      { duration: 850, easing: "ease-out" }
    );
  });
}
document.addEventListener("click", () => {
  startBirthdayMusic();
  const toggle = $("#musicToggle");
  toggle.innerHTML = '<i class="bi bi-pause-fill"></i><span>Pause</span>';
}, { once: true });

document.addEventListener("DOMContentLoaded", showCorrectDateView);
