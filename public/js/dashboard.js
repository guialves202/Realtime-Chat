const socket = io('http://localhost:3003');

const body = document.querySelector('body');
const aside = document.querySelector('aside');
const records = document.querySelector('.records');

// Put and overflow on the blocked message log after reach some height
if (body.scrollHeight > aside.scrollHeight) {
  records.style.overflowY = 'scroll';
}

// Update the active user count in dashboard
socket.on('updateUserCount', (quantity) => {
  const userCount = document.querySelector('.user-count');

  userCount.textContent = quantity;
});
