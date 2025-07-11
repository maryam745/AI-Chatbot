const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const micBtn = document.getElementById("micBtn");
const themeBtn = document.getElementById("themeBtn");

// Load chat and theme
window.onload = () => {
  const saved = localStorage.getItem("chatHistory");
  if (saved) chatbox.innerHTML = saved;
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    document.querySelector('.chat-container').classList.add("dark-mode");
    chatbox.classList.add("dark-mode");
    userInput.classList.add("dark-mode");
    themeBtn.innerText = "☀️";
    document.querySelectorAll('.quick-replies button').forEach(btn => btn.classList.add("dark-mode"));
  }
};

// Quick reply
function quickReply(text) {
  userInput.value = text;
  sendMessage();
}

// Send message
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  appendMessage("You", text);

  document.getElementById("typing").style.display = "block";

  setTimeout(() => {
    document.getElementById("typing").style.display = "none";
    const reply = getBotResponse(text.toLowerCase());
    appendMessage("Bot", reply);
    speak(reply);
  }, 800);

  userInput.value = "";
  userInput.focus();
}

// Append message
function appendMessage(sender, message) {
  const msg = document.createElement("p");
  msg.className = sender === "You" ? "user-msg" : "bot-msg";
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
  localStorage.setItem("chatHistory", chatbox.innerHTML);
}

// Text-to-speech
function speak(text) {
  window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ''));
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}

// Speech-to-text
function startListening() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser does not support Speech Recognition.");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  micBtn.classList.add("listening");
  userInput.placeholder = "Listening...";
  recognition.onresult = function (event) {
    const voiceInput = event.results[0][0].transcript;
    userInput.value = voiceInput;
    sendMessage();
    userInput.placeholder = "Type or speak...";
    micBtn.classList.remove("listening");
  };
  recognition.onerror = function (event) {
    alert("Speech recognition error: " + event.error);
    micBtn.classList.remove("listening");
    userInput.placeholder = "Type or speak...";
  };
  recognition.onend = function () {
    micBtn.classList.remove("listening");
    userInput.placeholder = "Type or speak...";
  };
  recognition.start();
}

// Clear chat
function clearChat() {
  chatbox.innerHTML = "";
  localStorage.removeItem("chatHistory");
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  document.querySelector('.chat-container').classList.toggle("dark-mode");
  chatbox.classList.toggle("dark-mode");
  userInput.classList.toggle("dark-mode");
  document.querySelectorAll('.quick-replies button').forEach(btn => btn.classList.toggle("dark-mode"));
  if (document.body.classList.contains("dark-mode")) {
    themeBtn.innerText = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.innerText = "🌙";
    localStorage.setItem("theme", "light");
  }
}

// Enter key handler
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

// Bot Responses
const funFacts = [
  "2025 is a perfect square year because 2025 = 45².",
  "A hummingbird can fly backwards and beat its wings up to 80 times per second!",
  "Sloths can hold their breath for 40 minutes underwater!",
  "Octopuses have three hearts. ",
  "Clouds can weigh over 1 million pounds!",
  "Lightning strikes in Canada every 3 seconds in summer.",
  "Dolphins can sleep while swimming!",
  "By 2025, flying taxis might be real in major cities! ",
  "Mars will come close to Earth in 2025 — only 56 million km!",
  "Digital restaurants with robot chefs are emerging fast. "
];

function getBotResponse(input) {
  const now = new Date();

  if (input.includes("hello") || input.includes("hi")) {
    return "Hello!  How can I assist you today?";
  } else if (input.includes("your name")) {
    return "I’m <b>Falcon</b>, your AI chatbot! ";
  } else if (input.includes("time")) {
    return "Current time is: <b>" + now.toLocaleTimeString() + "</b>";
  } else if (input.includes("date")) {
    return "Today's date is: <b>" + now.toLocaleDateString() + "</b>";
  } else if (input.includes("bye")) {
    return "Goodbye!  Take care.";
  } else if (input.includes("how are you")) {
    return "I'm a bot, but I'm functioning perfectly! ";
  } else if (input.includes("your age")) {
    return "I was created in 2025 — so I'm still young! ";
  } else if (input.includes("joke")) {
    const jokes = [
      "Why did the computer go to the doctor? It had a virus! ",
      "Why don’t robots panic? Because they have nerves of steel!",
      "Why did the scarecrow win an award? He was outstanding in his field! ",
      "Why did the chicken join a band? It had the drumsticks! "
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  } else if (input.includes("help") || input.includes("can you do")) {
    return "I can chat, tell jokes, share fun facts, give time/date, and listen to voice! ";
  } else if (input.includes("fact")) {
    return funFacts[Math.floor(Math.random() * funFacts.length)];
  } else if (input.includes("weather")) {
    return "I can't check live weather yet, but I hope it's nice where you are! ";
  } else if (input.includes("quote")) {
    return "“The best way to predict the future is to invent it.” – Alan Kay";
  } else if (input.includes("thank")) {
    return "You're welcome! ";
  } else if (input.includes("book")) {
    return "I love tech books — especially about AI. ";
  } else if (input.includes("movie")) {
    return "I like sci-fi like *The Matrix* or *Interstellar*! ";
  } else if (input.includes("music")) {
    return "Electronic beats and chill synths are my favorite! ";
  } else {
    return "Hmm... I didn’t get that. Try asking something else! ";
  }
}
