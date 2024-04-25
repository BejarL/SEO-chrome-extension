const socket = new WebSocket('wss://realtime.dataserver.com');

socket.onopen = function(event) {
  console.log('Connection to data server established.');
};

socket.onmessage = function(event) {
  console.log('New data received:', event.data);
  updateLiveDataDisplay(event.data);
};

socket.onerror = function(error) {
  console.error('WebSocket Error:', error);
};

function updateLiveDataDisplay(data) {
  document.getElementById('live-data').textContent = `Live Update: ${data}`;
}