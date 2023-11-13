/*
Need to open the connection to the correct URL and path
*/

const socket = io(); // Assuming you are hosting the WebSocket server on the same domain
const pathArray = window.location.pathname.split('/');
const uniqueUrl = pathArray[pathArray.length - 1]; // This will give you the last element in the URL path

const statusElement = document.getElementById("status");
const progressElement = document.getElementById("progress");
const messageElement = document.getElementById("message");

socket.emit('subscribe', uniqueUrl);

socket.on('update', (data) => {
  if (data.unique_id === uniqueUrl) {
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
