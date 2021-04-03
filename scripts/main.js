const selectors = ['html', 'body', 'h1', 'nav', 'nav ul'];

const cache = {};

// populate cache from array
selectors.forEach((sel) => (cache[sel] = document.querySelector(sel)));

// handle focusing; replace focus jumps with smooth scrolling
cache.body.addEventListener('focusin', (event) => {
  // event.preventDefault();
  scrollIntoViewIfNeeded(event.target);
});

// handle navigation; replace anchor jumps with smooth scrolling
// anchors are there for semantic correctness and non-JS users
cache['nav ul'].addEventListener('click', (event) => {
  const { target } = event;

  if (target.tagName === 'A') {
    event.preventDefault();

    const id = target.hash.slice(1);

    const section = document.getElementById(id);
    scrollIntoViewIfNeeded(section);

    const h2 = document.querySelector(`#${id} h2`);
    h2.focus({ preventScroll: true });
  }
});

/**
 * @function isInView
 * @param {Element} element a DOM element
 * @returns true if the given element is fully visible on the screen
 */
function isInView(element) {
  const { top, bottom } = element.getBoundingClientRect();

  const upper = window.scrollY;
  const lower = window.scrollY + window.innerHeight;

  return upper <= top && bottom <= lower;
}

/**
 * @function scrollIntoViewIfNeeded
 * calculates whether an element is in view (see isInView), and scrolls to it if it isn't
 * @param {Element} element a DOM element
 */
function scrollIntoViewIfNeeded(element) {
  if (!isInView(element)) {
    element.scrollIntoView({ behaviour: 'smooth' });
  }
}
