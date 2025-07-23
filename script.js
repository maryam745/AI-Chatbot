const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const micBtn = document.getElementById("micBtn");
const themeBtn = document.getElementById("themeBtn");

// Load saved chat and theme on page load
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

// Quick reply buttons
function quickReply(text) {
  userInput.value = text;
  sendMessage();
}

// Send user message
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("You", text);
  const typing = document.getElementById("typing");
  if (typing) typing.style.display = "block";

  setTimeout(() => {
    if (typing) typing.style.display = "none";
    const reply = getBotResponse(text.toLowerCase());
    appendMessage("Bot", reply);
    speak(reply);
  }, 1800);

  userInput.value = "";
  userInput.focus();
}

// Add message to chatbox
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

// Toggle dark/light theme
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  document.querySelector('.chat-container').classList.toggle("dark-mode");
  chatbox.classList.toggle("dark-mode");
  userInput.classList.toggle("dark-mode");

  document.querySelectorAll('.quick-replies button').forEach(btn =>
    btn.classList.toggle("dark-mode")
  );

  if (document.body.classList.contains("dark-mode")) {
    themeBtn.innerText = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.innerText = "🌙";
    localStorage.setItem("theme", "light");
  }
}

// Send message on Enter key
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

// Bot response logic
function getBotResponse(input) {
  const now = new Date();
  const jokes = [
    "Why did the computer go to the doctor? It had a virus!",
    "Why don’t robots panic? Because they have nerves of steel!",
    "Why did the scarecrow win an award? He was outstanding in his field!",
    "Why did the chicken join a band? It had the drumsticks!"
  ];

  const funFacts = [
    "A group of flamingos is called a flamboyance.",
    "Sea otters hold hands while sleeping so they don’t drift apart.",
    "Octopuses have three hearts and blue blood.",
    "Cows have best friends and get stressed when separated.",
    "Sloths can take up to a month to digest one leaf.",
    "2025 is a perfect square year because 2025 = 45².",
    "A hummingbird can fly backwards and beat its wings up to 80 times per second!",
    "Sloths can hold their breath for 40 minutes underwater!",
    "Clouds can weigh over 1 million pounds!",
    "Lightning strikes in Canada every 3 seconds in summer.",
    "Dolphins can sleep while swimming!",
    "By 2025, flying taxis might be real in major cities!",
    "Mars will come close to Earth in 2025 — only 56 million km!",
    "Digital restaurants with robot chefs are emerging fast.",
    "Honey never spoils — archaeologists found 3000-year-old honey still edible.",
    "The Sahara Desert used to be a lush, green area with lakes and forests.",
    "A single tree can absorb up to 48 pounds of carbon dioxide a year.",
    "There are more trees on Earth than stars in the Milky Way."
  ];

  if (input.includes("hello") || input.includes("hi")) return "Hello! How can I assist you today?";
  if (input.includes("your name") || input.includes("what is your name")) return "I’m <b>Falcon</b>, your AI chatbot!";
  if (input.includes("time") || input.includes("what is the time")) return "Current time is: <b>" + now.toLocaleTimeString() + "</b>";
  if (input.includes("date")) return "Today's date is: <b>" + now.toLocaleDateString() + "</b>";
  if (input.includes("bye")) return "Goodbye! Take care.";
  if (input.includes("how are you")) return "I'm a bot, but I'm functioning perfectly!";
  if (input.includes("your age") || input.includes("what is your age")) return "I was created in 2025 — so I'm still young!";
  if (input.includes("joke") || input.includes("can you tell me a joke")) return jokes[Math.floor(Math.random() * jokes.length)];
  if (input.includes("help") || input.includes("can you do")) return "I can chat, tell jokes, share fun facts, give time/date, and listen to voice!";
  if (input.includes("funfact") || input.includes("tell me something interesting")) return funFacts[Math.floor(Math.random() * funFacts.length)];
  if (input.includes("weather")) return "I can't check live weather yet, but I hope it's nice where you are!";
  if (input.includes("quote")) return "“The best way to predict the future is to invent it.” – Alan Kay";
  if (input.includes("thank")) return "You're welcome!";
  if (input.includes("book")) return "I love tech books — especially about AI.";
  if (input.includes("movie")) return "I like sci-fi like *The Matrix* or *Interstellar*!";
  if (input.includes("music")) return "Electronic beats and chill synths are my favorite!";
  if (input.includes("api")) return "API means Application Programming Interface – a way for programs to talk.";
  if (input.includes("html")) return "HTML stands for HyperText Markup Language – it structures web pages.";
  if (input.includes("css")) return "CSS means Cascading Style Sheets – it styles the HTML.";
  if (input.includes("chatgpt")) return "ChatGPT is an advanced AI model developed by OpenAI.";
  if (input.includes("pakistan")) return "Pakistan is a beautiful country in South Asia with rich culture.";
  if (input.includes("programming")) return "Programming is writing instructions for computers. Popular languages: Python, Java, C++.";
  if (input.includes("ai")) return "AI means Artificial Intelligence — machines that simulate human intelligence.";
  if (input.includes("robot")) return "Robots are smart machines that can perform tasks automatically.";
  if (input.includes("language")) return "I speak English (for now).";
  if (input.includes("science")) return "Science is the pursuit of knowledge through observation and experiments.";
  if (input.includes("math")) return "Math is the study of numbers, shapes, and logic.";
  if (input.includes("color")) return "I like blue — it's calm and techy!";
  if (input.includes("computer")) return "A computer is an electronic device that processes data.";
  if (input.includes("game")) return "Try playing chess — it's great for your brain!";
  if (input.includes("virus")) return "A virus is a small infectious agent that replicates inside living cells.";
  if (input.includes("space")) return "Space is the vast universe beyond Earth’s atmosphere.";
  if (input.includes("sleep")) return "Sleep helps your body and mind recharge!";
  if (input.includes("eat")) return "Bots don’t eat, but I hear pizza is amazing!";
  if (input.includes("live")) return "I live inside your browser — no rent needed!";
  if (input.includes("friends")) return "My best friends are smart humans like you!";
  if (input.includes("creator")) return "I was created by a smart developer in 2025.";
  if (input.includes("outstanding")) return "Scarecrow won because he was standing out — get it?";
  if (input.includes("fire")) return "Fire is a chemical reaction called combustion — hot and bright!";
  if (input.includes("earth")) return "Earth is our home planet, the 3rd from the Sun.";
  if (input.includes("sun")) return "Yes! The sun is a giant star at the center of our solar system.";
  if (input.includes("moon")) return "The Moon is Earth’s natural satellite. It reflects sunlight.";
  if (input.includes("stars")) return "Stars are massive balls of burning gas in space.";
  if (input.includes("mars")) return "NASA and SpaceX are planning Mars missions!";
  if (input.includes("whatsapp")) return "WhatsApp is a popular messaging app owned by Meta.";
  if (input.includes("facebook")) return "Facebook is a social media platform by Meta.";
  if (input.includes("youtube")||inputs.includes("what is youtube")) return "YouTube is a video-sharing platform — watch, learn, or chill!";
  if (input.includes("instagram")||inputs.includes("what is instagram")) return "Instagram is a photo and video sharing app.";
  if (input.includes("google")) return "Google helps you find anything online. Just type and search!";

  return "Hmm... I didn’t get that. Try asking something else!";
}
