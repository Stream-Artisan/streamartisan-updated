// Complete Image Optimization System
document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for lazy loading
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Load optimized image based on device
        if (img.dataset.src) {
          let src = img.dataset.src;
          
          // Aggressive compression for mobile
          if (window.innerWidth <= 480) {
            src = optimizeImageUrl(src, 400, 35);
          } else if (window.innerWidth <= 768) {
            src = optimizeImageUrl(src, 600, 45);
          } else if (window.innerWidth <= 1200) {
            src = optimizeImageUrl(src, 800, 55);
          } else {
            src = optimizeImageUrl(src, 1200, 65);
          }
          
          img.src = src;
          img.removeAttribute('data-src');
        }
        
        img.addEventListener('load', function() {
          this.classList.add('loaded');
          this.style.opacity = '1';
        });
        
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  // Enhanced image optimization function
  function optimizeImageUrl(url, width, quality) {
    if (url.includes('unsplash.com')) {
      return url.replace(/w=\d+/, `w=${width}`).replace(/q=\d+/, `q=${quality}`);
    }
    if (url.includes('images.pexels.com')) {
      return `${url}?auto=compress&cs=tinysrgb&w=${width}&q=${quality}`;
    }
    // Add WebP support if available
    if (supportsWebP()) {
      return url.replace(/\.(jpg|jpeg|png)/, '.webp');
    }
    return url;
  }

  // Check WebP support
  function supportsWebP() {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  // Apply lazy loading to all images
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    imageObserver.observe(img);
  });

  // Optimize existing images immediately
  const existingImages = document.querySelectorAll('img:not([data-src])');
  existingImages.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Compress portfolio images aggressively
    if (img.closest('.portfolio_box')) {
      const currentSrc = img.src;
      if (currentSrc) {
        if (window.innerWidth <= 768) {
          img.src = optimizeImageUrl(currentSrc, 400, 40);
        } else {
          img.src = optimizeImageUrl(currentSrc, 600, 50);
        }
      }
    }
  });

  // Preload critical images
  const criticalImages = document.querySelectorAll('.banner_main img, .logo img');
  criticalImages.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  });
});
