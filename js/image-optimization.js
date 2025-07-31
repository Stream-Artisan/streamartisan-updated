// Minimal image optimization - no interference with content
document.addEventListener('DOMContentLoaded', function() {
  // Only handle images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  lazyImages.forEach(img => {
    // Simple lazy loading without affecting other content
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });
  
  // Don't modify any existing images or content
});
