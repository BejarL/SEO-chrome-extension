const setupAccessibilityFeatures = () => {
    document.querySelectorAll('.button').forEach(button => {
      button.setAttribute('role', 'button');
      button.setAttribute('tabindex', '0');
      button.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          button.click();
        }
      });
    });
  };
  
  document.addEventListener('DOMContentLoaded', setupAccessibilityFeatures);