document.addEventListener('DOMContentLoaded', function () {
  const selector = document.getElementById('article-select');
  if (!selector) return;

  selector.addEventListener('change', function () {
    const selectedValue = this.value;

    document.querySelectorAll('.highlight').forEach(el => {
      el.classList.remove('highlight');
    });

    if (selectedValue) {
      const targetElement = document.querySelector(selectedValue);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        setTimeout(() => {
          targetElement.classList.add('highlight');
        }, 500);
      }
    }
  });
});
