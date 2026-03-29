const STORAGE_KEY = "birthday-card-studio.cards";

const form = document.getElementById("card-form");
const recipientInput = document.getElementById("recipient");
const senderInput = document.getElementById("sender");
const messageInput = document.getElementById("message");
const statusNode = document.getElementById("status");
const previewNode = document.getElementById("card-preview");
const previewRecipient = document.getElementById("preview-recipient");
const previewMessage = document.getElementById("preview-message");
const previewSender = document.getElementById("preview-sender");
const celebrateButton = document.getElementById("celebrate-btn");
const savedCardsNode = document.getElementById("saved-cards");
const savedCardTemplate = document.getElementById("saved-card-template");

const accentThemes = {
  coral: {
    accent: "#f46c65",
    soft: "#ffd2cd",
    strong: "#cf4b45",
    start: "#fff0e2",
    end: "#ffd9d1",
    glow: "rgba(244, 108, 101, 0.24)"
  },
  gold: {
    accent: "#e39b1d",
    soft: "#ffe4a9",
    strong: "#c07b09",
    start: "#fff6d9",
    end: "#ffd7a6",
    glow: "rgba(227, 155, 29, 0.25)"
  },
  mint: {
    accent: "#1c9b7d",
    soft: "#c6f4e6",
    strong: "#15725d",
    start: "#e6fff7",
    end: "#c7efe1",
    glow: "rgba(28, 155, 125, 0.23)"
  },
  berry: {
    accent: "#8e4dff",
    soft: "#e2d6ff",
    strong: "#6e37d4",
    start: "#f4ecff",
    end: "#ffd4ea",
    glow: "rgba(142, 77, 255, 0.22)"
  }
};

function readCards() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function writeCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function getSelectedValue(name) {
  return form.querySelector(`input[name="${name}"]:checked`).value;
}

function currentCard() {
  return {
    id: Date.now(),
    recipient: recipientInput.value.trim() || "Taylor",
    sender: senderInput.value.trim(),
    message: messageInput.value.trim() || "Wishing you the happiest birthday yet.",
    template: getSelectedValue("template"),
    accent: getSelectedValue("accent"),
    createdAt: new Date().toISOString()
  };
}

function applyTheme(accent) {
  const theme = accentThemes[accent];

  document.documentElement.style.setProperty("--accent", theme.accent);
  document.documentElement.style.setProperty("--accent-soft", theme.soft);
  document.documentElement.style.setProperty("--accent-strong", theme.strong);
  document.documentElement.style.setProperty("--card-start", theme.start);
  document.documentElement.style.setProperty("--card-end", theme.end);
  document.documentElement.style.setProperty("--card-glow", theme.glow);
}

function renderPreview() {
  const card = currentCard();

  previewNode.className = `card-preview template-${card.template} accent-${card.accent}`;
  previewRecipient.textContent = card.recipient;
  previewMessage.textContent = card.message;
  previewSender.textContent = card.sender ? `With love, ${card.sender}` : "Made with birthday magic";
  applyTheme(card.accent);
}

function renderSavedCards() {
  const cards = readCards().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  savedCardsNode.innerHTML = "";

  if (cards.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No saved cards yet. Create one above and it will appear here.";
    savedCardsNode.appendChild(empty);
    return;
  }

  cards.forEach((card) => {
    const fragment = savedCardTemplate.content.cloneNode(true);
    const metaPrefix = card.sender ? `From ${card.sender} - ` : "";

    fragment.querySelector(".saved-card-title").textContent = `For ${card.recipient}`;
    fragment.querySelector(".saved-card-message").textContent = card.message;
    fragment.querySelector(".saved-card-meta").textContent =
      `${metaPrefix}${new Date(card.createdAt).toLocaleString()}`;
    fragment.querySelector(".delete-btn").addEventListener("click", () => {
      const nextCards = readCards().filter((entry) => entry.id !== card.id);
      writeCards(nextCards);
      renderSavedCards();
      statusNode.textContent = `Deleted card for ${card.recipient}.`;
    });
    savedCardsNode.appendChild(fragment);
  });
}

function burstConfetti() {
  for (let index = 0; index < 18; index += 1) {
    const piece = document.createElement("span");
    const size = 8 + Math.round(Math.random() * 10);

    piece.style.position = "fixed";
    piece.style.left = `${10 + Math.random() * 80}%`;
    piece.style.top = "-20px";
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 1.4}px`;
    piece.style.borderRadius = "999px";
    piece.style.background = ["#ff6b6b", "#ffd166", "#06d6a0", "#8e4dff"][index % 4];
    piece.style.zIndex = "9999";
    piece.style.opacity = "0.92";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.transition = "transform 1400ms ease-out, top 1400ms ease-out, opacity 1400ms ease-out";
    document.body.appendChild(piece);

    requestAnimationFrame(() => {
      piece.style.top = `${65 + Math.random() * 25}%`;
      piece.style.transform =
        `translateX(${(-120 + Math.random() * 240)}px) rotate(${220 + Math.random() * 360}deg)`;
      piece.style.opacity = "0";
    });

    setTimeout(() => piece.remove(), 1500);
  }

  statusNode.textContent = "Confetti launched. This one feels party-ready.";
}

form.addEventListener("input", renderPreview);
form.addEventListener("change", renderPreview);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const card = currentCard();
  const cards = readCards();

  cards.push(card);
  writeCards(cards);
  renderSavedCards();
  statusNode.textContent = `Saved card for ${card.recipient}.`;
});

celebrateButton.addEventListener("click", burstConfetti);

renderPreview();
renderSavedCards();
