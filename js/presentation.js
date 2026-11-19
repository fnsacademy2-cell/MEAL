// Presentation Navigation & Controls
document.addEventListener('DOMContentLoaded', () => {
  const totalSlides = 19;
  const currentPath = window.location.pathname;
  let currentSlide = 1;
  
  // Extract current slide number from filename (e.g. slide4.html -> 4)
  const match = currentPath.match(/slide(\d+)\.html/i);
  if (match) {
    currentSlide = parseInt(match[1], 10);
  } else if (currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '') {
    currentSlide = 1;
  }
  
  // Populate slide selector if it exists
  const selector = document.getElementById('slideSelector');
  if (selector) {
    const titles = [
      "1. Cover - MEAL For Impact",
      "2. What is MEAL? (Foundational Definition)",
      "3. Framework Architecture & Roadmap",
      "4. The Management Case (Mission to Change)",
      "5. The MEAL Model (4 Core Pillars)",
      "6. The MALC Context & Stakeholder Value",
      "7. Results Logic & The Results Chain",
      "8. Design for Results (ToC & Logframe)",
      "9. The 5-Phase MEAL Operating Cycle",
      "10. Phase 3: Field Data Collection & Ethics",
      "11. Data Quality Assurance (6 DQA Standards)",
      "12. Beneficiary Accountability & 8-Step CFM",
      "13. Control & Risk (MEAL vs Audit & Finance)",
      "14. Digital MEAL Technology Stack",
      "15. Core Challenges & Practical Mitigations",
      "16. Action Register & Continuous Improvement",
      "17. 12-Month Phased Strategic Roadmap",
      "18. The Ultimate Purpose of MEAL",
      "19. Closing - Thank You & Discussion"
    ];
    
    for (let i = 1; i <= totalSlides; i++) {
      const opt = document.createElement('option');
      opt.value = `slide${i}.html`;
      opt.textContent = titles[i - 1] || `Slide ${i} of ${totalSlides}`;
      if (i === currentSlide) opt.selected = true;
      selector.appendChild(opt);
    }
    selector.addEventListener('change', (e) => {
      window.location.href = e.target.value;
    });
  }
  
  // Keyboard Navigation: Arrow Left / Arrow Right / Space
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
      return;
    }

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      if (currentSlide < totalSlides) {
        window.location.href = `slide${currentSlide + 1}.html`;
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      if (currentSlide > 1) {
        window.location.href = `slide${currentSlide - 1}.html`;
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      window.location.href = 'slide1.html';
    } else if (e.key === 'End') {
      e.preventDefault();
      window.location.href = `slide${totalSlides}.html`;
    }
  });
  
  // Touch Swipe Navigation for Tablets & Mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 60) {
      if (diff < 0 && currentSlide < totalSlides) {
        window.location.href = `slide${currentSlide + 1}.html`;
      } else if (diff > 0 && currentSlide > 1) {
        window.location.href = `slide${currentSlide - 1}.html`;
      }
    }
  }
});
