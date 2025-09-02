document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('share-article');
  if (!btn) return;
  btn.addEventListener('click', function () {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-share"></i>';
          btn.classList.remove('copied');
        }, 1500);
      });
    }
  });
});