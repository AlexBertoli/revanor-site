const toggle = document.querySelector('.menu');
const navigation = document.querySelector('.nav');
toggle.addEventListener('click', () => {
 const open = toggle.getAttribute('aria-expanded') !== 'true';
 toggle.setAttribute('aria-expanded', String(open));
 navigation.classList.toggle('open', open);
});
navigation.addEventListener('click', event => {
 if (event.target.closest('a')) {
  navigation.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
 }
});
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && navigation.classList.contains('open')) {
  navigation.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.focus();
 }
});
