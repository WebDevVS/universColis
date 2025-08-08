// Widgets HTML à injecter selon le choix
const trackerWidgets = {
  'parcelsapp': num => `<iframe src="https://parcelsapp.com/widget?num=${encodeURIComponent(num)}" style="height:600px;" loading="lazy" frameborder="0"></iframe>`,
  'trackglobal': num => `
    <iframe src='https://track.global/fr/iframe?wuid=0&init_params=eyJoZWlnaHQiOiI0MHB4In0='
            id='track-widget' frameborder='0' style='height: 140px;'></iframe>
    <div style='margin-top:135px;'></div>
  `,
  'track123': num => `<div id="track123-tracking-widget"></div>`,
  'postalninja': num => `
    <iframe title="Postal Ninja" 
            src="https://postal.ninja/widget/tracker?lc=fr&autoSize=true&num=${encodeURIComponent(num)}"
            style="width: 100%; min-height: 120px;"
            frameborder="0" scrolling="no">
    </iframe>`
};

const trackerLogos = {
  '17track': '../static/img/trackers/17Track.jpg',
  'trackglobal': '../static/img/trackers/TrackGlobal.jpg',
  'parcelsapp': '../static/img/trackers/Parcelsapp.jpg',
  'postalninja': '../static/img/trackers/PostalNinja.jpg',
  'track123': '../static/img/trackers/Track123.jpg' 
};

function doTrack() {
  const num = document.getElementById("YQNum").value.trim();
  if (num === "") {
    alert("Veuillez entrer un numéro de suivi.");
    return; 
  }
  const tracker = document.getElementById('trackerSelect').value;
  if (tracker === '17track') {
    if (typeof YQV5 !== "undefined") {
      YQV5.trackSingle({
        YQ_ContainerId: "YQContainer",
        YQ_Height: 600,
        YQ_Lang: "fr",
        YQ_Fc: "0",
        YQ_Num: num
      });
    } else {
      alert("Le widget 17Track n'est pas chargé.");
    }
  }
}

function changeTracker() {
  const select = document.getElementById('trackerSelect');
  const seventeenTrackInputs = document.getElementById('17track-inputs');
  const otherContainer = document.getElementById('other-tracker-container');
  if (select.value === '17track') {
    seventeenTrackInputs.classList.add('active');
    otherContainer.classList.remove('active');
    otherContainer.innerHTML = '';
  } else {
    seventeenTrackInputs.classList.remove('active');
    otherContainer.classList.add('active');
    otherContainer.innerHTML = trackerWidgets[select.value];
    if (select.value === 'trackglobal') {
      setupTrackGlobalResize();
    }
    if (select.value === 'track123') {
      loadTrack123ScriptOnce();
    }
  }
}

function showWidget() {
  const tracker = document.getElementById('trackerSelect').value;
  const num = document.getElementById('trackingNumber').value.trim();
  const container = document.getElementById('tracker-widget-container');
  if (tracker === '17track') {
    container.innerHTML = `<div id="YQContainer"></div>`;
    if (typeof YQV5 !== "undefined" && num) {
      YQV5.trackSingle({
        YQ_ContainerId: "YQContainer",
        YQ_Height: 600,
        YQ_Lang: "fr",
        YQ_Fc: "0",
        YQ_Num: num
      });
    }
  } else {
    container.innerHTML = trackerWidgets[tracker](num);
    if (tracker === 'trackglobal') setupTrackGlobalResize();
    if (tracker === 'track123') loadTrack123ScriptOnce();
  }
}

function setupTrackGlobalResize() {
  window.onmessage = (e) => {
    const frame = document.querySelector('iframe#track-widget');
    const size = e.data;
    if (frame && size.height) {
      const heightToSet = size.height > 80 ? size.height : 80;
      frame.style.height = (heightToSet + 30) + 'px';
    }
  };
}

function loadTrack123ScriptOnce() {
  if (document.getElementById("track123-tracking-widget-script")) return;
  window.track123WidgetConfig = {
    api_base: "https://www.track123.com",
    provider_type: 3,
    language: "en_US",
    theme_color: "#5B62FF",
    width_type: "auto",
    width_value: ""
  };
  const script = document.createElement("script");
  script.id = "track123-tracking-widget-script";
  script.type = "text/javascript";
  script.src = "https://www.track123.com/track123-widget.min.js";
  document.body.appendChild(script);
}

window.addEventListener('DOMContentLoaded', function () {
  const trackBtn = document.getElementById('trackBtn');
  const trackerSelect = document.getElementById('trackerSelect');
  const trackingNumber = document.getElementById('trackingNumber');
  const trackerLogo = document.getElementById('trackerLogo');

  trackBtn.addEventListener('click', function () {
    const input = trackingNumber;
    if (input.value.trim() === '') {
      input.focus();
      input.style.borderColor = 'var(--accent-color)';
      setTimeout(() => {
        input.style.borderColor = '';
      }, 2000);
      return;
    }
    // Animation de chargement
    trackBtn.classList.add('loading');
    trackBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Recherche...';

    // Affiche le widget
    showWidget();

    setTimeout(() => {
      trackBtn.classList.remove('loading');
      trackBtn.innerHTML = '<i class="fa-solid fa-search"></i> Suivre';
    }, 2000);
  });

  trackerSelect.addEventListener('change', function () {
    trackerLogo.src = trackerLogos[trackerSelect.value];
    trackerLogo.alt = trackerSelect.options[trackerSelect.selectedIndex].text + ' logo';
    showWidget();
  });

  trackingNumber.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      showWidget();
    }
  });

  // FAQ toggle
  document.querySelectorAll('.faq-question').forEach(function (question) {
    question.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
        this.classList.remove('open');
      } else {
        answer.style.display = 'block';
        this.classList.add('open');
      }
    });
  });
  document.querySelectorAll('.faq-answer').forEach(function (answer) {
    answer.style.display = 'none';
  });
});

