// Boring Brief — subtle scroll reveal, no framework.
(function () {
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.getAttribute("data-delay");
          if (delay) {
            el.style.transitionDelay = (parseInt(delay, 10) * 90) + "ms";
          }
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach(function (el) {
    observer.observe(el);
  });
})();
