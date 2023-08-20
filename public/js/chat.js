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

    hours = hours.length == '1' ? '0' + hours : hours;
    minutes = minutes.length == '1' ? '0' + minutes : minutes;

    strong.style.color = message.color;

    small.textContent = `${hours}:${minutes}`;
    strong.textContent = message.username;
    p.textContent = message.message;
    div.classList.add('messages');
    div.append(strong);
    div.append(small);
    div.append(p);
    this.chat.append(div);
    this.chat.scrollTop = this.chat.scrollHeight;
  }
}

const chat = new Chat();

socket.on('receivedMessage', function (message) {
  chat.renderMessage(message);
});

socket.on('login', () => {
  document.querySelector('.blur').style.display = 'flex';
});

const form = document.querySelector('#send-message-form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const input = document.querySelector('#message');
  const message = input.value;

  if (!message) return;

  socket.emit('sendMessage', message);
});

socket.on('okmessage', (message) => {
  chat.renderMessage(message);
  const input = document.querySelector('#message');
  input.value = '';
  input.placeholder = '';
  input.classList.remove('danger');
});

const signIn = document.querySelector('.signin');

if (signIn) {
  signIn.addEventListener('click', () => {
    const modal = document.querySelector('.blur');

    if (modal.style.display != 'flex') modal.style.display = 'flex';
  });
}

const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', () => {
  const modal = document.querySelector('.blur');

  if (modal.style.display != 'none') modal.style.display = 'none';
});

socket.on('forbiddenWord', () => {
  const input = document.querySelector('#message');
  input.value = '';
  input.placeholder = 'You typed a forbidden word';
  input.classList.add('danger');
});
