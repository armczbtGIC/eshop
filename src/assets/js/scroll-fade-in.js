const fadeInElements = document.querySelectorAll('.fadeIn');

function isElementInView(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  return (rect.top <= windowHeight);
}

function checkFadeIn() {
  for (let i = 0; i < fadeInElements.length; i++) {
    const element = fadeInElements[i];
    if (isElementInView(element)) {
      element.classList.add('visible');
    }
  }
}

window.addEventListener('scroll', checkFadeIn);