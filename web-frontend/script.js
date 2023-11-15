/*
Need to open the connection to the correct URL and path
*/

const socket = io(); // Assuming you are hosting the WebSocket server on the same domain
const pathArray = window.location.pathname.split('/');
const uniqueUrl = pathArray[pathArray.length - 1]; // This will give you the last element in the URL path

const statusElement = document.getElementById("status");
const progressElement = document.getElementById("progress");
const messageElement = document.getElementById("message");
const titleElement = document.getElementById("title");
socket.emit('subscribe', uniqueUrl);


const update_status = (status_value) => {
  // update the text val
  statusElement.textContent = status_value;
  // update color
  const color_map = {
    'PENDING': '#a9a9a9',
    'IN_PROGRESS': '#2ecc71',
    'STALLED':'#cc5b2e',
    'FAILED':'#cc2e2e',
    'FINISHED':'#2e6dcc'
  }
  const color = color_map[status_value];
  if (color){
    progressElement.style.backgroundColor = color;
  }
}

const update = (data) => {
  if (data.unique_id === uniqueUrl) {
    if (data.status) {
      update_status(data.status);
    }
    if (typeof data.progress === 'number') {
      progressElement.style.width = `${data.progress * 100}%`;
    }
    if (data.message) {
      let messageLines = data.message.split('\n');
      messageElement.innerHTML = messageLines.join('<br/>');
    }
    if (data.title) {
      titleElement.textContent = data.title;
      document.title = data.title;
    }
  }
}

socket.on('update', update);
