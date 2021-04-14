const selectors = [
  'html',
  'body',
  'h1',
  'nav',
  'nav ul',
  'header',
  'section.skills',
  'section.projects',
  'section.about',
  'footer',
];

const cache = {};

// populate cache from array
selectors.forEach((sel) => (cache[sel] = document.querySelector(sel)));

// explicit subset of selectors
// used for "discrete scrolling" functionality
const sections = [
  'header',
  'section.skills',
  'section.projects',
  'section.about',
  'footer',
];

_SECTION_INDEX = 0;

const goToSection = (n) => {
  if (0 <= n && n < sections.length) {
    _SECTION_INDEX = n;
    cache[sections[_SECTION_INDEX]].scrollIntoView({ behavior: 'smooth' });
  }
};

const nextSection = () => goToSection(_SECTION_INDEX + 1);

const prevSection = () => goToSection(_SECTION_INDEX - 1);

// handle navigation; replace anchor jumps with scrolling
// (anchors are there for semantic correctness and non-JS users)
cache['nav ul'].addEventListener('click', (event) => {
  const { target } = event;

  if (target.tagName === 'A') {
    event.preventDefault();

    const { hash } = target;

    let sectionIndex;

    switch (hash) {
      case '#skills':
        sectionIndex = 1;
        break;
      case '#projects':
        sectionIndex = 2;
        break;
      case '#about':
        sectionIndex = 3;
        break;
      case '#contact':
        sectionIndex = 4;
        break;
    }

    goToSection(sectionIndex);
  }
});

// onwheel is a built-in event handler for user mouse-wheel scrolling
window.onwheel = (event) => {
  // deltaY is a number representing how far down the user scrolled
  // negative numbers mean the user scrolled up
  const { deltaY } = event;

  if (deltaY > 0) nextSection();
  if (deltaY < 0) prevSection();
};
