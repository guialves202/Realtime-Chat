const alertMsg = document.querySelector('.alert-msg-div');

// If there is some alert message, set a timeout for it to disappear
if (alertMsg) {
  setTimeout(() => {
    alertMsg.style.opacity = '0';
    setTimeout(() => {
      alertMsg.style.display = 'none';
    }, 2000);
  }, 3500);

  // Define the button to close the message
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
