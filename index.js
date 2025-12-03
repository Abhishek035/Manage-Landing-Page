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
const mediaQuery = window.matchMedia('(max-width: 1023px)');

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


document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.testimonials_list');
  const slides = Array.from(track.children);
  const navContainer = document.querySelector('.carousel-nav');
  
  // Configuration
  const autoPlayDelay = 8000; // 8 seconds
  let slideIndex = 0;
  let autoPlayInterval;

  // Function to determine how many slides are visible at once
  const getSlidesPerView = () => {
    return window.innerWidth >= 1023 ? 2 : 1;
  };

  // Function to update the UI (Slide position and active dot)
  const updateCarousel = () => {
    const slidesPerView = getSlidesPerView();
    const slideWidth = 100 / slidesPerView;
    
    // Move the track
    track.style.transform = `translateX(-${slideIndex * slideWidth}%)`;

    // Update Dots
    const dots = Array.from(navContainer.children);
    dots.forEach((dot, index) => {
      if (index === slideIndex) {
        dot.classList.add('current-slide');
      } else {
        dot.classList.remove('current-slide');
      }
    });
  };

  // Setup Dots based on total slides and view mode
  const setupDots = () => {
    navContainer.innerHTML = '';
    const slidesPerView = getSlidesPerView();
    // Calculate how many 'stops' the slider has. 
    // Example: 3 items, showing 2 at a time -> We need index 0 and 1. (Index 2 would show whitespace)
    const totalStops = slides.length - slidesPerView + 1;

    for (let i = 0; i < totalStops; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-indicator');
      if (i === slideIndex) dot.classList.add('current-slide');
      
      dot.addEventListener('click', () => {
        slideIndex = i;
        updateCarousel();
        resetTimer(); // Reset timer on manual interaction
      });
      
      navContainer.appendChild(dot);
    }
  };

  // Logic to go to next slide
  const moveToNextSlide = () => {
    const slidesPerView = getSlidesPerView();
    const totalStops = slides.length - slidesPerView + 1;
    
    slideIndex++;
    
    // Circular logic: If we reach the end, go back to 0
    if (slideIndex >= totalStops) {
      slideIndex = 0;
    }
    
    updateCarousel();
  };

  // Timer Management
  const startTimer = () => {
    autoPlayInterval = setInterval(moveToNextSlide, autoPlayDelay);
  };

  const resetTimer = () => {
    clearInterval(autoPlayInterval);
    startTimer();
  };

  // Handle Window Resize (Switching between 1 card and 2 cards view)
  window.addEventListener('resize', () => {
    // Reset to start to avoid index bounds errors during resize
    slideIndex = 0; 
    setupDots();
    updateCarousel();
    resetTimer();
  });

  // Initialization
  setupDots();
  startTimer();
});