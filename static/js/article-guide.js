function toggleFaq(btn) {
    const a = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    if (isOpen) {
        btn.classList.remove('open');
        a.classList.remove('open');
    } else {
        btn.classList.add('open');
        a.classList.add('open');
    }
}

// Sticky-nav dynamique : récupère tous les IDs des liens .sn
const navLinks = Array.from(document.querySelectorAll('.sn'));
const ids = navLinks.map(l => l.getAttribute('href') ? l.getAttribute('href').replace('#', '') : null).filter(Boolean);
let ticking = false;
window.addEventListener('scroll', () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
        let cur = ids[0];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el && window.scrollY >= el.offsetTop - 130) cur = id;
        });
        navLinks.forEach(l => {
            const isActive = l.getAttribute('href') === '#' + cur;
            l.classList.toggle('active', isActive);
        });
        ticking = false;
    });
}, { passive: true });