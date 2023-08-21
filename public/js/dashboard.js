const socket = io('http://localhost:3003');

const body = document.querySelector('body');
const aside = document.querySelector('aside');
const records = document.querySelector('.records');

if (body.scrollHeight > aside.scrollHeight) {
  records.style.overflowY = 'scroll';
}

socket.on('updateUserCount', (quantity) => {
  const userCount = document.querySelector('.user-count');

  userCount.textContent = quantity;
});
