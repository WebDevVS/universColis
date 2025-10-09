document.addEventListener('DOMContentLoaded', function () {
  console.log('articleShare.js chargé');
  const btn = document.getElementById('share-article');
  if (!btn) return;
  btn.addEventListener('click', function () {
    const url = window.location.href;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(() => {
        showCopied(btn);
      }, () => {
        fallbackCopy(url, btn);
      });
    } else {
      fallbackCopy(url, btn);
    }
  });

  function fallbackCopy(text, btn) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // évite le scroll
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      showCopied(btn);
    } catch (err) {
      alert('Impossible de copier le lien');
    }
    document.body.removeChild(textarea);
  }

  function showCopied(btn) {
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-share"></i>';
      btn.classList.remove('copied');
    }, 1500);
  }
});