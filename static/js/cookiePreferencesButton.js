(function(){
  function openPreferences(e){
    if (e) e.preventDefault();
    if (window.silktideCookieBannerManager && typeof window.silktideCookieBannerManager.showPreferences === 'function'){
      window.silktideCookieBannerManager.showPreferences();
    } else {
      // If widget not ready yet, open once it loads
      document.addEventListener('silktideCookieBannerLoaded', function once(){
        document.removeEventListener('silktideCookieBannerLoaded', once);
        if (window.silktideCookieBannerManager && typeof window.silktideCookieBannerManager.showPreferences === 'function'){
          window.silktideCookieBannerManager.showPreferences();
        }
      });
    }
  }

  function bindDelegation(){
    if (document.__uc_cookie_pref_bound) return;
    document.__uc_cookie_pref_bound = true;
    document.addEventListener('click', function(ev){
      const trigger = ev.target && ev.target.closest('#open-cookie-preferences, .open-cookie-preferences');
      if (trigger) openPreferences(ev);
    });
  }

  function bindDirect(){
    const nodes = document.querySelectorAll('#open-cookie-preferences, .open-cookie-preferences');
    nodes.forEach(node => {
      if (node.__uc_pref_bound) return;
      node.__uc_pref_bound = true;
      node.addEventListener('click', openPreferences);
    });
  }

  function normalizeSilktideHeadings() {
    const containers = [document.getElementById('silktide-modal'), document.getElementById('silktide-banner')];
    containers.forEach(c => {
      if (!c) return;
      const h1s = c.querySelectorAll('h1');
      h1s.forEach(h1 => {
        const h2 = document.createElement('h2');
        h2.innerHTML = h1.innerHTML;
        for (let i = 0; i < h1.attributes.length; i++) {
          const attr = h1.attributes[i];
          h2.setAttribute(attr.name, attr.value);
        }
        h1.parentNode.replaceChild(h2, h1);
      });
    });
  }

  function init(){
    bindDelegation();
    bindDirect();
    if (window.silktideCookieBannerManager && document.getElementById('silktide-wrapper')) {
      normalizeSilktideHeadings();
    } else {
      document.addEventListener('silktideCookieBannerLoaded', normalizeSilktideHeadings);
    }
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
