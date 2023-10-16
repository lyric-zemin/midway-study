window.onload = function () {
  // Create WebSocket connection.
  const socket = new WebSocket('ws://127.0.0.1:7001');

  // Connection opened
  socket.addEventListener('open', event => {
    socket.send('Hello Server!');
  });

  socket.addEventListener('error', err => {
    console.log('[ err ]-11', err);
  });

  // Listen for messages
  socket.addEventListener('message', event => {
    console.log('Message from server ', event.data);
  });
};
