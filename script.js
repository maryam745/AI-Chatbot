<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Falcon AI Chatbot</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="chat-container">
    <h2>🤖 Falcon AI Chatbot</h2>

    <div id="chatbox"></div>
    <div id="typing" style="display: none;"><em>Bot is typing...</em></div>

    <div class="quick-replies">
      <button onclick="quickReply('Hello')">Hello</button>
      <button onclick="quickReply('What can you do?')">What can you do?</button>
      <button onclick="quickReply('Tell me a joke')">Tell me a joke</button>
      <button onclick="quickReply('What is the time?')">Time?</button>
      <button onclick="quickReply('What is today\'s date?')">Date?</button>
    </div>

    <input id="userInput" placeholder="Type a message..." />
    <button id="micBtn" onclick="startListening()">🎤</button>
    <button id="themeBtn" onclick="toggleTheme()">🌙</button>

    <div class="bottom-buttons">
      <button onclick="clearChat()">🗑️ Clear Chat</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
