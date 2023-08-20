const socket = io('http://localhost:3003');

class Chat {
  constructor() {
    this.chat = document.querySelector('.chat');
  }

  renderMessage(message) {
    const div = document.createElement('div');
    div.classList.add('messages');
    div.textContent = message;
    this.chat.append(div);
    this.chat.scrollTop = this.chat.scrollHeight;
  }
}

const chat = new Chat();

socket.on('receivedMessage', function (message) {
  chat.renderMessage(message);
});

const form = document.querySelector('#send-message-form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const input = document.querySelector('#message');
  input.placeholder = '';
  const message = input.value;

  if (!message) return;

  chat.renderMessage(message);

  socket.emit('sendMessage', message);

  input.value = '';
});

const signIn = document.querySelector('.btn-primary');

signIn.addEventListener('click', () => {
  const modal = document.querySelector('.blur');

  if (modal.style.display != 'flex') modal.style.display = 'flex';
});

const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', () => {
  const modal = document.querySelector('.blur');

  if (modal.style.display != 'none') modal.style.display = 'none';
});
