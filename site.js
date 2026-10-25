/* 99DigiProStore shared page script.
   1. Buy clicks: any link with data-buy sends a Meta Pixel InitiateCheckout event, then opens the link.
      Navigation waits a moment so the event can leave the browser before the page unloads.
      data-buy="Product name" and data-value="99" name the product and price; both are optional.
   2. Reveal: elements with class "reveal" fade in as they scroll into view.
   3. Product filter buttons on the home page. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[data-buy]");
    if (!a || !window.fbq) return;
    var data = { currency: "INR" };
    if (a.getAttribute("data-buy")) data.content_name = a.getAttribute("data-buy");
    if (a.getAttribute("data-value")) data.value = Number(a.getAttribute("data-value"));
    try { window.fbq("track", "InitiateCheckout", data); } catch (err) { return; }
    // New tab, or a modified click: the current page stays open, so no need to wait.
    if (a.target === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setTimeout(function () { window.location.href = a.href; }, 300);
  });

  function ready(fn) { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn); else fn(); }

  ready(function () {
    var items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { rootMargin: "0px 0px -8% 0px" });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add("in"); });
    }

    var filters = document.querySelector(".filters");
    if (filters) {
      // Hero tiles with data-jump="study" open the product list with that filter on.
      document.querySelectorAll("[data-jump]").forEach(function (t) {
        t.addEventListener("click", function () {
          var b = filters.querySelector('button[data-filter="' + t.getAttribute("data-jump") + '"]');
          if (b) b.click();
        });
      });
      filters.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-filter]");
        if (!b) return;
        var f = b.getAttribute("data-filter");
        filters.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        document.querySelectorAll(".products .product[data-line]").forEach(function (card) {
          card.hidden = f !== "all" && card.getAttribute("data-line").split(" ").indexOf(f) < 0;
        });
      });
    }
  });
})();
