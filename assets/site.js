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
})();
