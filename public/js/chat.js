const socket = io('http://localhost:3003');

class Chat {
  constructor() {
    this.chat = document.querySelector('.chat');
  }

  renderMessage(message) {
    const div = document.createElement('div');
    const strong = document.createElement('strong');
    const small = document.createElement('small');
    const p = document.createElement('p');
    const date = new Date();

    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    // Format the time to always have two digits
    hours = hours.length == '1' ? '0' + hours : hours;
    minutes = minutes.length == '1' ? '0' + minutes : minutes;

    // Put the color in username
    strong.style.color = message.color;

    // Add the message
    small.textContent = `${hours}:${minutes}`;
    strong.textContent = message.username;
    p.textContent = message.message;
    div.classList.add('messages');
    div.append(strong);
    div.append(small);
    div.append(p);
    this.chat.append(div);

    // Automatically scroll top when a message is send
    this.chat.scrollTop = this.chat.scrollHeight;
  }
}

const chat = new Chat();

const form = document.querySelector('#send-message-form');
const signIn = document.querySelector('.signin');
const closeBtn = document.querySelector('.close');

// Receive message from broadcast
socket.on('receivedMessage', function (message) {
  chat.renderMessage(message);
});

// Displays the modal when the user tries to send a message without being logged
socket.on('login', () => {
  document.querySelector('.blur').style.display = 'flex';
});

// Render the message after having validated the user and filtered the message
socket.on('okmessage', (message) => {
  chat.renderMessage(message);

  // Clear the input
  const input = document.querySelector('#message');
  input.value = '';
  input.placeholder = '';
  input.classList.remove('danger');
});

// Warns user when he try to send some forbidden word or phrase
socket.on('forbiddenWord', () => {
  const input = document.querySelector('#message');
  input.value = '';
  input.placeholder = 'Your message was blocked for containing inappropriate content';
  input.classList.add('danger');
});

// Send message when user clicks the send button
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const input = document.querySelector('#message');
  const message = input.value;

  if (!message) return;

  socket.emit('sendMessage', message);
});

// Check if the signin button exists and adds the event of opening the modal to it
if (signIn) {
  signIn.addEventListener('click', () => {
    const modal = document.querySelector('.blur');

    if (modal.style.display != 'flex') modal.style.display = 'flex';
  });
}

// Adds the event for close modal
closeBtn.addEventListener('click', () => {
  const modal = document.querySelector('.blur');

  if (modal.style.display != 'none') modal.style.display = 'none';
});
