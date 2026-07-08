// Boring Brief — scroll reveal, typewriter and confetti. No framework.
(function () {
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Directional reveal (fade / slide-left / slide-right / drop) ----
  var revealSelectors = ".reveal, .reveal-left, .reveal-right, .reveal-drop";
  var items = document.querySelectorAll(revealSelectors);

  if (prefersReduced || !("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = el.getAttribute("data-delay");
            if (delay) {
              el.style.transitionDelay = (parseInt(delay, 10) * 120) + "ms";
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
  }

  // ---- Typewriter hero ----
  var typeTargets = document.querySelectorAll(".typewriter-text");
  typeTargets.forEach(function (el) {
    var full = el.textContent;
    if (prefersReduced) {
      return;
    }
    el.textContent = "";
    el.parentElement.classList.add("is-typing");
    var i = 0;
    function typeChar() {
      if (i <= full.length) {
        el.textContent = full.slice(0, i);
        i++;
        var char = full.charAt(i - 1);
        var pause = char === "." ? 220 : 28;
        setTimeout(typeChar, pause);
      } else {
        el.parentElement.classList.remove("is-typing");
        el.parentElement.classList.add("typing-done");
      }
    }
    setTimeout(typeChar, 260);
  });

  // ---- CTA wiggle: stagger start so buttons don't wiggle in lockstep ----
  document.querySelectorAll(".btn").forEach(function (btn, i) {
    btn.style.animationDelay = (i % 5) * 0.6 + "s";
  });

  // ---- Confetti burst around the price ----
  var confettiTarget = document.getElementById("confetti-target");
  if (confettiTarget && !prefersReduced) {
    var fired = false;
    var colors = ["#DEFF3C", "#ffffff", "#a9c92c", "#f4f4f0"];
    function burstConfetti() {
      if (fired) return;
      fired = true;
      var count = 36;
      for (var i = 0; i < count; i++) {
        var piece = document.createElement("span");
        piece.className = "confetti-piece";
        var angle = Math.random() * Math.PI * 2;
        var distance = 70 + Math.random() * 110;
        var dx = Math.cos(angle) * distance;
        var dy = Math.sin(angle) * distance - 30;
        piece.style.setProperty("--dx", dx + "px");
        piece.style.setProperty("--dy", dy + "px");
        piece.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
        piece.style.left = "50%";
        piece.style.top = "50%";
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = (Math.random() * 120) + "ms";
        piece.style.width = piece.style.height = (5 + Math.random() * 6) + "px";
        if (Math.random() > 0.5) {
          piece.style.borderRadius = "50%";
        }
        confettiTarget.appendChild(piece);
      }
      setTimeout(function () {
        confettiTarget.innerHTML = "";
      }, 2200);
    }

    if ("IntersectionObserver" in window) {
      var priceObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              burstConfetti();
              priceObserver.disconnect();
            }
          });
        },
        { threshold: 0.6 }
      );
      priceObserver.observe(confettiTarget);
    } else {
      burstConfetti();
    }
  }
})();
