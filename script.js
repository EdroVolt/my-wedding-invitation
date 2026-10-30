(function () {
  // Ceremony start: Saturday 31 October 2026, 4:00 PM in Ismailia (Egypt, UTC+2).
  var WEDDING_DATE = new Date('2026-10-31T16:00:00+02:00');

  // Countdown — only runs while the date is still ahead; otherwise the markup keeps its values.
  var units = {
    days: document.querySelector('[data-unit="days"]'),
    hours: document.querySelector('[data-unit="hours"]'),
    mins: document.querySelector('[data-unit="mins"]'),
    secs: document.querySelector('[data-unit="secs"]')
  };

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    var diff = WEDDING_DATE - Date.now();
    if (diff <= 0) {
      units.days.textContent = units.hours.textContent = units.mins.textContent = units.secs.textContent = '00';
      clearInterval(timer);
      return;
    }
    var s = Math.floor(diff / 1000);
    units.days.textContent = pad(Math.floor(s / 86400));
    units.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    units.mins.textContent = pad(Math.floor((s % 3600) / 60));
    units.secs.textContent = pad(s % 60);
  }

  var timer;
  if (WEDDING_DATE > Date.now()) {
    tick();
    timer = setInterval(tick, 1000);
  }

  // Reveal sections as they scroll into view.
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
