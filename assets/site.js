// Progressive enhancement: tabs + no-js detection. No external requests.
(function () {
  "use strict";
  document.body.classList.remove("no-js");

  var tablists = document.querySelectorAll('[role="tablist"]');
  tablists.forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function panels(tab) {
      var p = document.getElementById(tab.getAttribute("aria-controls"));
      return p;
    }
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var p = panels(t);
        if (p) p.hidden = !on;
      });
      tab.focus();
    }
    tabs.forEach(function (t, i) {
      var p = panels(t);
      if (p) p.hidden = i !== 0;
      t.tabIndex = i === 0 ? 0 : -1;
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var idx = null;
        if (e.key === "ArrowRight") idx = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") idx = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") idx = 0;
        else if (e.key === "End") idx = tabs.length - 1;
        if (idx !== null) { e.preventDefault(); select(tabs[idx]); }
      });
    });
  });

  // Hero face carousel — cross-fade every ~3.5 s, sync the example result card.
  // Progressive enhancement: no JS or reduced motion → first face stays static.
  var slides = document.querySelectorAll(".face-slide");
  var card = document.getElementById("rc-card");
  if (slides.length > 1 && card &&
      !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    var EXAMPLES = [
      { pulse: "72 bpm", hrv: "48 ms", stress: "Settled" },  // Daylight
      { pulse: "68 bpm", hrv: "52 ms", stress: "Calm" },     // Indoor warm
      { pulse: "79 bpm", hrv: "36 ms", stress: "Settled" },  // Office light
      { pulse: "65 bpm", hrv: "41 ms", stress: "Calm" },     // Evening lamp
      { pulse: "84 bpm", hrv: "30 ms", stress: "Settled" },  // Window side light
      null                                                  // Low light → quality gate
    ];
    var rcBody = document.getElementById("rc-body");
    var rcWarn = document.getElementById("rc-warn");
    var rcPulse = document.getElementById("rc-pulse");
    var rcHrv = document.getElementById("rc-hrv");
    var rcStress = document.getElementById("rc-stress");
    var idx = 0;
    window.setInterval(function () {
      slides[idx].classList.remove("active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("active");
      var ex = EXAMPLES[idx];
      var weak = ex == null;
      rcBody.hidden = weak;
      rcWarn.hidden = !weak;
      if (!weak) {
        rcPulse.textContent = ex.pulse;
        rcHrv.textContent = ex.hrv;
        rcStress.textContent = ex.stress;
      }
    }, 3500);
  }
})();
