const alertMsg = document.querySelector('.alert-msg-div');

if (alertMsg) {
  setTimeout(() => {
    alertMsg.style.opacity = '0';
    setTimeout(() => {
      alertMsg.style.display = 'none';
    }, 2000);
  }, 3500);

  const alertCloseBtn = document.querySelectorAll('.closebtn');
  alertCloseBtn.forEach((element) => {
    element.addEventListener('click', (event) => {
      const div = event.target.parentNode;
      div.style.opacity = '0';
      setTimeout(function () {
        div.style.display = 'none';
      }, 600);
    });
  });
}
