const socket = io(); // Assuming you are hosting the WebSocket server on the same domain

const uniqueUrl = "YOUR_UNIQUE_URL"; // Replace with the specific URL you want to track

const statusElement = document.getElementById("status");
const progressElement = document.getElementById("progress");
const messageElement = document.getElementById("message");

socket.emit('subscribe', uniqueUrl);

socket.on('update', (data) => {
  if (data.uniqueUrl === uniqueUrl) {
    if (data.status) {
      statusElement.textContent = data.status;
    }
    if (typeof data.progress === 'number') {
      progressElement.style.width = `${data.progress * 100}%`;
    }
    if (data.message) {
      messageElement.textContent = data.message;
    }
  }
});
