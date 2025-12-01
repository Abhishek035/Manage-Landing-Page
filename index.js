const navToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');

navToggle.addEventListener('click', () => {
  // Get current state
  const isOpened = nav.getAttribute('data-visible');

  if (isOpened === "false" || !isOpened) {
    // Open Menu
    nav.setAttribute('data-visible', true);
    overlay.setAttribute('data-visible', true);
    navToggle.setAttribute('aria-expanded', true);

    nav.className = 'nav text-preset-4-bold font-blue';
    
    // Optional: Stop background scrolling
    document.body.style.overflow = 'hidden'; 
  } else {
    // Close Menu
    nav.setAttribute('data-visible', false);
    overlay.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);

    nav.className = 'nav text-preset-5-medium font-blue';
    
    // Restore scrolling
    document.body.style.overflow = 'auto';
  }
});

const heading = document.getElementById("hero-title");
const mediaQuery = window.matchMedia('(max-width: 1024px)');

function handleScreenChange(e) {
  if (e.matches) {
    // Screen is mobile/tablet: Switch to Preset 2
    heading.classList.replace('text-preset-1', 'text-preset-2');
  } else {
    // Screen is desktop: Switch back to Preset 1
    heading.classList.replace('text-preset-2', 'text-preset-1');
  }
  console.log(e);
}

handleScreenChange(mediaQuery);

mediaQuery.addEventListener('change', handleScreenChange);
