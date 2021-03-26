const selectors = [
  'h1',
  'nav ul',
  'nav',
];

const cache = {};

// populate cache from array
selectors.forEach(sel => cache[sel] = document.querySelector(sel));

cache['h1'].focus({ preventScroll: true });

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
    destination.scrollIntoView({ behavior: 'smooth' });
  }
});

// nav scrolling