(function () {
  var root = document.documentElement;

  // theme toggle
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch (e) {}
  }
  function toggle() { setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"); }
  var btn = document.querySelector(".theme-toggle");
  if (btn) btn.addEventListener("click", toggle);

  // keyboard shortcuts: t = theme, g h = home, g p = posts, g a = about
  var pendingG = false;
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;
    if (pendingG) {
      pendingG = false;
      var map = { h: "/", p: "/posts/", a: "/about/", t: "/tags/" };
      if (map[e.key]) location.href = map[e.key];
      return;
    }
    if (e.key === "g") { pendingG = true; setTimeout(function () { pendingG = false; }, 800); }
    else if (e.key === "t") toggle();
  });

  // reading progress (posts only)
  var bar = document.querySelector(".progress");
  var article = document.querySelector("article .prose");
  if (bar && article && document.querySelector(".pager")) {
    var onScroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // copy buttons on code blocks
  document.querySelectorAll(".highlight").forEach(function (block) {
    if (!navigator.clipboard) return;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "copy-btn";
    b.textContent = "copy";
    b.addEventListener("click", function () {
      var code = block.querySelector("code");
      navigator.clipboard.writeText(code ? code.innerText : "").then(function () {
        b.textContent = "copied!";
        setTimeout(function () { b.textContent = "copy"; }, 1400);
      });
    });
    block.appendChild(b);
  });
})();
