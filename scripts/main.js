const h1 = document.querySelector('h1');

h1.focus();

const navlist = document.querySelector('nav ul');

navlist.addEventListener('click', (event) => {
  const { target } = event;
  if (target.tagName === 'A') {
    event.preventDefault();

    // remove leading '#'
    const id = target.hash.slice(1);

    const destination = document.getElementById(id);
    destination.scrollIntoView({ behavior: 'smooth' });
    console.log(destination);
  }
});