/* 
scrolling/focusing behaviour:

when an element is focused:

  if element not in view:

    scroll up or down until element is about 2/3rds of the way up the screen


*/
const selectors = ['html', 'body', 'h1', 'nav', 'nav ul'];

const cache = {};

// populate cache from array
selectors.forEach((sel) => (cache[sel] = document.querySelector(sel)));

// get window height from root html 'clientHeight' property
const { clientHeight } = cache['html'];

cache.h1.focus();
window.setTimeout(() => cache.h1.blur(), 1000);

// handle navigation; replace anchor jumps with smooth scrolling
// anchors are there for semantic correctness and non-JS users
cache['nav ul'].addEventListener('click', (event) => {
  const { target } = event;

  if (target.tagName === 'A') {
    event.preventDefault();

    // remove leading '#'
    const id = target.hash.slice(1);

    const destination = document.getElementById(id);
    const h2 = document.querySelector(`#${id} h2`);
    h2.focus();
    // destination.scrollIntoView({ behavior: 'smooth' });
  }
});

// scroll height at which nav is flush with top of viewport
const NAV_SCROLL_Y = 583;

// custom (re-)implementation of sticky positioning (for nav bar)
// gets rid of the 'lower bound'
window.onscroll = () => {
  const { nav } = cache;

  // is the view currently below nav's default position?
  const belowNav = window.scrollY > NAV_SCROLL_Y;

  // is the nav currently sticky?
  const sticky = nav.className === 'sticky';

  if (!belowNav && sticky) {
    nav.className = '';
  }

  if (belowNav && !sticky) {
    nav.className = 'sticky';
  }
};

// custom replacement of tabbing behaviour
// if element being tabbed to is out of bounds, scroll to it instead of default jumping behaviour
cache['body'].addEventListener('focusin', (event) => {
  const { target } = event;
  // const { y } = target.getBoundingClientRect();

  // const bounds = {
  //   upper: window.scrollY,
  //   lower: window.scrollY + clientHeight,
  // };

  // console.log('bounds:', bounds);
  // console.log('y:', y);

  // if (y < bounds.upper || y > bounds.lower) {
  //   event.preventDefault();
  //   target.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'center',
  //   });
  // }

  target.scrollIntoView({ behviour: 'smooth' });
});

/**
 * @function inView
 * calculates whether an element is within bounds
 * @param {Element} element an element on the page
 * @returns true if element is within vertical screen bounds
 */
const inView = (element) => {
  const { top, bottom } = element.getBoundingClientRect();

  const upper = window.scrollY;
  const lower = window.scrollY + window.innerHeight;

  return upper <= top && bottom <= lower;
};

/**
 * @function scrollIntoViewIfNeeded
 * custom implementation of Element.scrollIntoViewIfNeeded()
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded
 * @param {Element} element an element on the page
 */
function scrollIntoViewIfNeeded(element) {
  if (!inView(element)) {
    element.scrollIntoView({ behviour: 'smooth' });
  }
}
