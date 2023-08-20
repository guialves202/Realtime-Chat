const body = document.querySelector('body');
const aside = document.querySelector('aside');
const records = document.querySelector('.records');

console.log(body.scrollHeight);
console.log(aside.scrollHeight);

if (body.scrollHeight > aside.scrollHeight) {
  records.style.overflowY = 'scroll';
}
