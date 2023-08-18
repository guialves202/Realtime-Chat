const earth = document.querySelector('.earth-gif');

earth.addEventListener('mouseover', () => {
  earth.style.transform = 'scale( 1.3, 1.3 )';
});

earth.addEventListener('mouseout', () => {
  earth.style.transform = 'scale( 1, 1 )';
});
