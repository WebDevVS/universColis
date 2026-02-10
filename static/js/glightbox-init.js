document.addEventListener('DOMContentLoaded', function() {
  if (typeof GLightbox !== 'function') return;
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: false,
    autoplayVideos: false,
    zoomable: true,
    draggable: true,
    closeButton: true,
    closeOnOutsideClick: true
  });
});