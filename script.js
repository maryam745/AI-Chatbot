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
  }, 1800);

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

// Enter key handler
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

function getBotResponse(input) {
  const now = new Date();
  input = input.toLowerCase();

  // Greetings and Personal
  if (input.includes("hello") || input.includes("hi")) return "Hello! 👋 How can I assist you today?";
  if (input.includes("your name")) return "I'm <b>Falcon</b>, your smart AI assistant.";
  if (input.includes("how are you")) return "I'm functioning perfectly, thanks!";
  if (input.includes("your age")) return "I was created in 2025, still learning every day!";
  if (input.includes("bye")) return "Goodbye! Take care.";
  if (input.includes("thank")) return "You're welcome! 😊";

  // Date & Time
  if (input.includes("time")) return "⏰ Current time is: <b>" + now.toLocaleTimeString() + "</b>";
  if (input.includes("date")) return "📅 Today's date is: <b>" + now.toLocaleDateString() + "</b>";

  // Bot capabilities
  if (input.includes("help") || input.includes("can you do")) return "I can chat, tell jokes, give facts, answer questions, read aloud, and more!";

  // General Knowledge
  if (input.includes("capital of pakistan")) return "Islamabad is the capital of Pakistan.";
  if (input.includes("largest country")) return "Russia is the largest country by area.";
  if (input.includes("smallest country")) return "Vatican City is the smallest country in the world.";
  if (input.includes("fastest animal")) return "The cheetah is the fastest land animal.";
  if (input.includes("tallest building")) return "The Burj Khalifa in Dubai is the tallest building.";
  if (input.includes("longest river")) return "The Nile is one of the longest rivers in the world.";
  if (input.includes("deepest ocean")) return "The Pacific Ocean is the deepest.";
  if (input.includes("planet closest to sun")) return "Mercury is the closest planet to the Sun.";
  if (input.includes("largest planet")) return "Jupiter is the largest planet in our solar system.";
  if (input.includes("human body temperature")) return "Normal human body temperature is about 98.6°F (37°C).";

  // Science & Math
  if (input.includes("2+2")) return "2 + 2 = 4 ✅";
  if (input.includes("square root of 16")) return "√16 = 4";
  if (input.includes("speed of light")) return "The speed of light is about 299,792 km/s.";
  if (input.includes("water formula")) return "The chemical formula for water is H₂O.";
  if (input.includes("earth gravity")) return "Gravity on Earth is about 9.8 m/s².";
  if (input.includes("sun is star or planet")) return "The Sun is a star.";

  // Technology
  if (input.includes("ai stands for") || input.includes("ai")) return "AI stands for Artificial Intelligence.";
  if (input.includes("what is html")) return "HTML stands for HyperText Markup Language.";
  if (input.includes("what is css")) return "CSS stands for Cascading Style Sheets.";
  if (input.includes("what is api")) return "API means Application Programming Interface.";
  if (input.includes("javascript")) return "JavaScript is a programming language for the web.";
  if (input.includes("programming language")) return "A programming language is used to instruct computers.";
  if (input.includes("famous ai tools")) return "Some popular AI tools are ChatGPT, DALL·E, Bard, and Claude.";

  // Fun Stuff
  if (input.includes("joke")) {
    const jokes = [
      "Why don’t robots panic? They have nerves of steel!",
      "What do you call a smart robot? A chatbot like me!",
      "Why was the computer cold? It forgot to close its windows!",
      "Why did the chicken join a band? Because it had the drumsticks!"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  if (input.includes("fact")) {
    const facts = [
      "Octopuses have three hearts!",
      "Sharks existed before trees!",
      "A bolt of lightning is five times hotter than the sun!",
      "Bananas are radioactive due to potassium.",
      "Humans share 60% of DNA with bananas."
    ];
    return facts[Math.floor(Math.random() * facts.length)];
  }

  if (input.includes("quote")) {
    const quotes = [
      "“The best way to predict the future is to invent it.” – Alan Kay",
      "“Life is short. Live passionately.” – Marc A. Pitman",
      "“Code is like humor. When you have to explain it, it’s bad.” – Cory House"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  if (input.includes("emoji")) return "Sure! 😄✨🚀🎉💻🤖🌙💡🔥❤️";
  if (input.includes("favorite color")) return "I love electric blue! ⚡";
  if (input.includes("music")) return "I enjoy lo-fi, ambient, and synthwave music.";
  if (input.includes("movie")) return "Sci-fi movies like The Matrix and Interstellar are my favorite.";
  if (input.includes("book")) return "Books about AI, science, and the future excite me!";

  // Fun interaction
  if (input.includes("do you sleep")) return "Nope, I’m available 24/7 for you!";
  if (input.includes("do you eat")) return "I feed on data, not food. 😋";
  if (input.includes("do you have friends")) return "You’re my friend! 💙";
  if (input.includes("can you dance")) return "Virtually, yes! 🕺💃";
  if (input.includes("do you have feelings")) return "Not exactly, but I care about helping you!";

  // Fallback
  return "Hmm... I didn't understand that. Try asking me something else like a fact, joke, or quote.";
}

