(function () {
  var root = document.documentElement;

  /* ---------- theme ---------- */
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("theme", t); } catch (e) {}
  }
  function toggleTheme() { setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"); }
  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  /* ---------- search ---------- */
  var dialog = document.querySelector(".search-dialog");
  var input = document.getElementById("search-input");
  var list = dialog ? dialog.querySelector(".search-results") : null;
  var index = null, selected = 0, lastFocus = null;

  function loadIndex() {
    if (index) return Promise.resolve(index);
    return fetch(dialog.getAttribute("data-index"))
      .then(function (r) { return r.json(); })
      .then(function (d) { index = d || []; return index; })
      .catch(function () { index = []; return index; });
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function score(item, terms) {
    var t = item.t.toLowerCase(), g = (item.g || "").toLowerCase(),
        s = (item.s || "").toLowerCase(), b = (item.b || "").toLowerCase(), total = 0;
    for (var i = 0; i < terms.length; i++) {
      var q = terms[i], hit = 0;
      if (t.indexOf(q) > -1) hit += 10;
      if (g.indexOf(q) > -1) hit += 5;
      if (s.indexOf(q) > -1) hit += 3;
      if (b.indexOf(q) > -1) hit += 1;
      if (!hit) return 0;
      total += hit;
    }
    return total;
  }
  function render() {
    var q = input.value.trim().toLowerCase();
    var items;
    if (!q) {
      items = index.slice(0, 8);
    } else {
      var terms = q.split(/\s+/);
      items = index.map(function (it) { return { it: it, s: score(it, terms) }; })
        .filter(function (x) { return x.s > 0; })
        .sort(function (a, b) { return b.s - a.s; })
        .slice(0, 10).map(function (x) { return x.it; });
    }
    selected = 0;
    if (!items.length) {
      list.innerHTML = '<li class="search-empty">Nothing matches "' + esc(input.value) + '". Try another word.</li>';
      return;
    }
    list.innerHTML = items.map(function (it, i) {
      return '<li><a role="option" href="' + esc(it.u) + '"' + (i === 0 ? ' aria-selected="true"' : "") + '>' +
        '<span class="r-title">' + esc(it.t) + '</span><span class="r-kind">' + it.k + '</span>' +
        '<span class="r-sum">' + esc(it.s) + '</span></a></li>';
    }).join("");
  }
  function move(d) {
    var links = list.querySelectorAll("a");
    if (!links.length) return;
    links[selected].removeAttribute("aria-selected");
    selected = (selected + d + links.length) % links.length;
    links[selected].setAttribute("aria-selected", "true");
    links[selected].scrollIntoView({ block: "nearest" });
  }
  function openSearch() {
    if (!dialog) return;
    lastFocus = document.activeElement;
    dialog.classList.add("open");
    document.body.style.overflow = "hidden";
    input.value = "";
    input.focus();
    loadIndex().then(render);
  }
  function closeSearch() {
    dialog.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (dialog) {
    var searchBtn = document.querySelector(".search-btn");
    if (searchBtn) searchBtn.addEventListener("click", openSearch);
    input.addEventListener("input", function () { if (index) render(); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter") {
        var a = list.querySelector('a[aria-selected="true"]');
        if (a) { e.preventDefault(); location.href = a.href; }
      }
    });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) closeSearch(); });
  }

  /* ---------- keyboard shortcuts ---------- */
  var pendingG = false;
  document.addEventListener("keydown", function (e) {
    if (dialog && dialog.classList.contains("open")) {
      if (e.key === "Escape") { e.preventDefault(); closeSearch(); }
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
      return;
    }
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;
    if (pendingG) {
      pendingG = false;
      var map = { h: "/", p: "/posts/", r: "/projects/", a: "/about/", t: "/tags/" };
      if (map[e.key]) location.href = map[e.key];
      return;
    }
    if (e.key === "/") { e.preventDefault(); openSearch(); }
    else if (e.key === "g") { pendingG = true; setTimeout(function () { pendingG = false; }, 900); }
    else if (e.key === "t") toggleTheme();
  });

  /* ---------- reading progress (posts & projects) ---------- */
  var bar = document.querySelector(".progress");
  if (bar && document.querySelector("article .prose")) {
    var onScroll = function () {
      var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- heading anchors ---------- */
  document.querySelectorAll(".prose h2[id], .prose h3[id]").forEach(function (h) {
    var a = document.createElement("a");
    a.className = "anchor"; a.href = "#" + h.id; a.textContent = "#";
    a.setAttribute("aria-label", "Link to this section");
    h.appendChild(a);
  });

  /* ---------- copy buttons ---------- */
  document.querySelectorAll(".highlight, .prose > pre").forEach(function (block) {
    if (!navigator.clipboard) return;
    var wrap = block;
    if (block.tagName === "PRE") {
      wrap = document.createElement("div");
      wrap.className = "highlight";
      block.parentNode.insertBefore(wrap, block);
      wrap.appendChild(block);
    }
    var b = document.createElement("button");
    b.type = "button"; b.className = "copy-btn"; b.textContent = "copy";
    b.addEventListener("click", function () {
      var code = wrap.querySelector("code");
      navigator.clipboard.writeText(code ? code.innerText : "").then(function () {
        b.textContent = "copied!";
        setTimeout(function () { b.textContent = "copy"; }, 1400);
      });
    });
    wrap.appendChild(b);
  });
})();
