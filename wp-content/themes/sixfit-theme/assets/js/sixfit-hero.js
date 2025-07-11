function checkWrap() {
  const wrapper = document.querySelector('.sixfit-hero-wrapper');
  const children = Array.from(wrapper.children);
  const separator = document.querySelector('.sixfit-hero-separator');


  let rowTop = children[0].offsetTop;

  const wrapped = children.some(child => child.offsetTop > rowTop + 80);
  console.log('Is wrapping:', wrapped);

  if(wrapped) {
    separator.style.display = 'none';
  } else {
    separator.style.display = 'block';
  }
}

window.addEventListener('resize', checkWrap);
window.addEventListener('DOMContentLoaded', checkWrap);