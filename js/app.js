(function() {
"use strict";

var LABEL = "img/teddy-hopper.png";
var cart = [];

var products = [
  {id:1, name:"Teddy Hopper", style:"Double IPA", abv:"7.7", ibu:"15", vol:"330", price:219, stock:342, soldOutAt:20, status:"current", desc:"Our debut. Amarillo, Centennial, Chinook, Columbus and Simcoe hops.", accent:"g", img:LABEL},
  {id:2, name:"Neon Lotus", style:"Fruited Sour", abv:"4.8", ibu:"8", vol:"330", price:199, stock:0, soldOutAt:0, status:"upcoming", desc:"Tart lychee and dragon fruit sour. Light and refreshing.", accent:"p", img:""},
  {id:3, name:"Midnight Pho", style:"Spiced Stout", abv:"6.8", ibu:"25", vol:"330", price:219, stock:0, soldOutAt:0, status:"upcoming", desc:"Chocolate stout with star anise and cinnamon.", accent:"o", img:""},
  {id:4, name:"Saigon Session", style:"Rice Lager", abv:"4.5", ibu:"12", vol:"330", price:179, stock:0, soldOutAt:0, status:"past", desc:"Clean crisp rice lager with jasmine rice.", accent:"c", img:""}
];

/* ---- AGE GATE ---- */
function enterSite() {
  var el = document.getElementById("ageGate");
  if (el) el.classList.add("hidden");
  localStorage.setItem("cw_age", "1");
}

function leaveSite() {
  window.location.href = "https://www.google.com";
}

if (localStorage.getItem("cw_age") === "1") {
  var ae = document.getElementById("ageGate");
  if (ae) ae.classList.add("hidden");
}

/* ---- LANGUAGE ---- */
function setLang(lang) {
  var btns = document.querySelectorAll(".lang-btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
    if (btns[i].getAttribute("data-lang") === lang) btns[i].classList.add("active");
  }
  var els = document.querySelectorAll("[data-" + lang + "]");
  for (var j = 0; j < els.length; j++) {
    var v = els[j].getAttribute("data-" + lang);
    if (v) els[j].innerHTML = v;
  }
}

/* ---- NAV SCROLL ---- */
window.addEventListener("scroll", function() {
  var n = document.getElementById("navbar");
  if (n) {
    if (window.scrollY > 50) n.classList.add("scrolled");
    else n.classList.remove("scrolled");
  }
});

/* ---- AUTH ---- */
function switchTab(tab) {
  var tabs = document.querySelectorAll(".auth-tab");
  var forms = document.querySelectorAll(".auth-form");
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove("active");
  for (var j = 0; j < forms.length; j++) forms[j].classList.remove("active");
  if (tab === "login") {
    tabs[0].classList.add("active");
    document.getElementById("loginForm").classList.add("active");
  } else {
    tabs[1].classList.add("active");
    document.getElementById("registerForm").classList.add("active");
  }
}

function doLogin(e) {
  e.preventDefault();
  document.getElementById("authForms").style.display = "none";
  document.getElementById("dashboardView").classList.add("active");
}

function doRegister(e) {
  e.preventDefault();
  document.getElementById("authForms").style.display = "none";
  document.getElementById("dashboardView").classList.add("active");
}

function doLogout() {
  document.getElementById("authForms").style.display = "block";
  document.getElementById("dashboardView").classList.remove("active");
  document.getElementById("loginForm").classList.add("active");
  switchTab("login");
}

/* ---- 3D CAN ---- */
function buildCan(url) {
  var c = document.getElementById("canCylinder");
  if (!c) return;
  c.innerHTML = "";
  for (var i = 0; i < 24; i++) {
    var a = (360 / 24) * i;
    var p = document.createElement("div");
    p.className = "can-panel";
    p.style.width = "28px";
    p.style.transform = "rotateY(" + a + "deg) translateZ(110px)";
    var bg = document.createElement("div");
    bg.className = "label-bg";
    if (url) {
      bg.style.backgroundImage = "url(" + url + ")";
      bg.style.backgroundSize = "2400% 100%";
      bg.style.backgroundPosition = ((i / 23) * 100) + "% 50%";
    } else {
      bg.style.background = "linear-gradient(" + (130 + a) + "deg, #0a0a2e, #1a0a3e, #0d2847, #0a3d2e)";
    }
    var sh = document.createElement("div");
    sh.className = "shine";
    var el1 = document.createElement("div");
    el1.className = "edge edge-l";
    var el2 = document.createElement("div");
    el2.className = "edge edge-r";
    p.appendChild(bg);
    p.appendChild(sh);
    p.appendChild(el1);
    p.appendChild(el2);
    c.appendChild(p);
  }
}

buildCan(LABEL);

/* ---- RELEASES ---- */
function renderReleases(filter) {
  filter = filter || "all";
  var grid = document.getElementById("relGrid");
  if (!grid) return;
  grid.innerHTML = "";
  for (var idx = 0; idx < products.length; idx++) {
    var p = products[idx];
    if (filter !== "all" && p.status !== filter) continue;
    var bc = p.status === "upcoming" ? "up" : p.status === "current" ? "cr" : "sd";
    var bt = p.status === "upcoming" ? "Coming Soon" : p.status === "current" ? "Available Now" : "Sold Out";
    var bb = "";
    if (p.status === "current") {
      bb = '<button class="btn-buy" data-add="' + p.id + '">Add to Cart - ' + p.price + 'K</button>';
    } else if (p.status === "past") {
      bb = '<button class="btn-buy sold-out" disabled>Sold Out</button>';
    }
    var ih = "";
    if (p.img) {
      ih = '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy" width="200" height="350">';
    } else {
      var gr = {g:"#0a3d2e,#0d2847,#0a0a2e", p:"#2a0a4e,#1a0a3e,#0d0a2e", o:"#2a1500,#1a0a0a,#0d0a0a", c:"#0a2a3e,#0a1a2e,#0a0a1e"};
      ih = '<div class="placeholder-can" style="background:linear-gradient(135deg,' + (gr[p.accent] || gr.g) + ');color:var(--neon)">' + p.name + '</div>';
    }
    var card = document.createElement("article");
    card.className = "rel-card reveal";
    card.setAttribute("data-accent", p.accent);
    card.setAttribute("data-status", p.status);
    card.style.transitionDelay = (idx * 0.08) + "s";
    card.innerHTML = '<div class="rel-badge ' + bc + '"><span class="badge-dot-sm"></span>' + bt + '</div><div class="rel-card-can">' + ih + '</div><div class="rel-card-info"><h3>' + p.name.toUpperCase() + '</h3><div class="rel-style">' + p.style + '</div><p class="rel-desc">' + p.desc + '</p><div class="rel-meta"><span>' + p.abv + '% ABV</span><span>IBU ' + p.ibu + '</span><span>' + p.vol + 'ml</span></div>' + bb + '</div>';
    grid.appendChild(card);
  }
  observeReveal();
  bindAdd();
}

/* ---- CART ---- */
function addToCart(id) {
  var p = null;
  for (var i = 0; i < products.length; i++) { if (products[i].id === id) { p = products[i]; break; } }
  if (!p || p.stock <= 0) return;
  var f = null;
  for (var j = 0; j < cart.length; j++) { if (cart[j].id === id) { f = cart[j]; break; } }
  if (f) {
    if (f.qty >= p.stock) { showToast("Max stock reached", "info"); return; }
    f.qty++;
  } else {
    cart.push({id:p.id, name:p.name, price:p.price, qty:1});
  }
  updateCartCount();
  showToast(p.name + " added!", "success");
  p.stock--;
  if (p.soldOutAt > 0 && p.stock <= p.soldOutAt) {
    p.status = "past";
    showToast(p.name + " SOLD OUT!", "info");
    var ab = document.querySelector(".filter-btn.active");
    if (ab) renderReleases(ab.getAttribute("data-filter"));
  }
}

function updateCartCount() {
  var c = 0;
  for (var i = 0; i < cart.length; i++) c += cart[i].qty;
  var el = document.getElementById("cartCount");
  if (el) el.textContent = c;
}

function bindAdd() {
  var btns = document.querySelectorAll("[data-add]");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      addToCart(parseInt(this.getAttribute("data-add")));
    });
  }
}

/* ---- CHECKOUT ---- */
function openCheckout() {
  renderCart();
  document.getElementById("checkoutModal").classList.add("open");
  goToStep(1);
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("open");
}

function goToStep(step) {
  var ss = document.querySelectorAll(".checkout-step");
  var nb = document.querySelectorAll(".checkout-nav-btn");
  for (var i = 0; i < ss.length; i++) ss[i].classList.remove("active");
  for (var j = 0; j < nb.length; j++) nb[j].classList.remove("active");
  var ts = document.getElementById("step" + step);
  if (ts) ts.classList.add("active");
  for (var k = 0; k < nb.length; k++) {
    if (nb[k].getAttribute("data-step") === String(step)) nb[k].classList.add("active");
  }
  if (step === 3) renderSummary();
}

function renderCart() {
  var ie = document.getElementById("cartItems");
  var ee = document.getElementById("cartEmpty");
  var ce = document.getElementById("cartContent");
  if (!ie) return;
  if (cart.length === 0) {
    ee.style.display = "block";
    ce.style.display = "none";
    return;
  }
  ee.style.display = "none";
  ce.style.display = "block";
  ie.innerHTML = "";
  var sub = 0;
  for (var i = 0; i < cart.length; i++) {
    var it = cart[i];
    var itT = it.price * it.qty;
    sub += itT;
    var r = document.createElement("div");
    r.className = "cart-item";
    r.innerHTML = '<div class="cart-item-info"><div class="cart-item-name">' + it.name + '</div><div class="cart-item-price">' + it.price + 'K x ' + it.qty + ' = ' + itT + 'K</div></div><div class="cart-item-qty"><button class="qty-btn" data-qi="' + i + '" data-qd="-1">-</button><span>' + it.qty + '</span><button class="qty-btn" data-qi="' + i + '" data-qd="1">+</button></div><button class="cart-item-remove" data-ri="' + i + '">x</button>';
    ie.appendChild(r);
  }
  var ship = sub >= 1000 ? 0 : 50;
  document.getElementById("cartSubtotal").textContent = sub + "K VND";
  document.getElementById("cartShipping").textContent = ship === 0 ? "FREE" : ship + "K VND";
  document.getElementById("cartTotal").textContent = (sub + ship) + "K VND";
  var qb = ie.querySelectorAll(".qty-btn");
  for (var q = 0; q < qb.length; q++) {
    qb[q].addEventListener("click", function() {
      var idx = parseInt(this.getAttribute("data-qi"));
      cart[idx].qty += parseInt(this.getAttribute("data-qd"));
      if (cart[idx].qty <= 0) cart.splice(idx, 1);
      updateCartCount();
      renderCart();
    });
  }
  var rb = ie.querySelectorAll(".cart-item-remove");
  for (var r2 = 0; r2 < rb.length; r2++) {
    rb[r2].addEventListener("click", function() {
      cart.splice(parseInt(this.getAttribute("data-ri")), 1);
      updateCartCount();
      renderCart();
    });
  }
}

function renderSummary() {
  var el = document.getElementById("orderSummary");
  if (!el) return;
  var nm = document.getElementById("shipName") ? document.getElementById("shipName").value : "";
  var ph = document.getElementById("shipPhone") ? document.getElementById("shipPhone").value : "";
  var ad = document.getElementById("shipAddress") ? document.getElementById("shipAddress").value : "";
  var di = document.getElementById("shipDistrict") ? document.getElementById("shipDistrict").value : "";
  var ci = document.getElementById("shipCity") ? document.getElementById("shipCity").value : "";
  var sub = 0;
  var ih = "";
  for (var i = 0; i < cart.length; i++) {
    var t = cart[i].price * cart[i].qty;
    sub += t;
    ih += '<div style="display:flex;justify-content:space-between;padding:.3rem 0;font-size:.82rem"><span>' + cart[i].name + ' x ' + cart[i].qty + '</span><span>' + t + 'K</span></div>';
  }
  var ship = sub >= 1000 ? 0 : 50;
  var tot = sub + ship;
  el.innerHTML = '<div style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid var(--border)"><h4 style="font-size:.85rem;margin-bottom:.5rem;color:var(--neon)">Items</h4>' + ih + '</div><div style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid var(--border)"><h4 style="font-size:.85rem;margin-bottom:.5rem;color:var(--neon)">Shipping</h4><div style="font-size:.82rem;color:var(--txt2);line-height:1.8">' + (nm || "-") + "<br>" + ph + "<br>" + ad + (di ? ", " + di : "") + (ci ? ", " + ci : "") + '</div></div><div style="display:flex;justify-content:space-between;padding:.3rem 0;font-size:.82rem"><span>Subtotal</span><span>' + sub + 'K</span></div><div style="display:flex;justify-content:space-between;padding:.3rem 0;font-size:.82rem"><span>Shipping</span><span>' + (ship === 0 ? "FREE" : ship + "K") + '</span></div><div style="display:flex;justify-content:space-between;padding:.5rem 0;font-size:1rem;font-weight:700;border-top:1px solid var(--border);margin-top:.5rem"><span>Total</span><span style="color:var(--neon)">' + tot + 'K VND</span></div>';
}

function placeOrder() {
  var nm = document.getElementById("shipName") ? document.getElementById("shipName").value : "";
  var ph = document.getElementById("shipPhone") ? document.getElementById("shipPhone").value : "";
  var ad = document.getElementById("shipAddress") ? document.getElementById("shipAddress").value : "";
  if (!nm || !ph || !ad) { showToast("Fill all fields", "error"); return; }
  var oid = "CW-" + Math.floor(1000 + Math.random() * 9000);
  document.getElementById("orderIdDisplay").textContent = "#" + oid;
  goToStep(4);
  cart = [];
  updateCartCount();
}

/* ---- TOAST ---- */
function showToast(msg, type) {
  var c = document.getElementById("toastContainer");
  if (!c) return;
  var t = document.createElement("div");
  var clr = type === "success" ? "#39ff14" : type === "error" ? "#ff3b3b" : "#00d4ff";
  t.style.cssText = "padding:.8rem 1.2rem;background:#111;border:1px solid #2a2a38;border-radius:10px;font-size:.82rem;color:#f0f0f5;box-shadow:0 10px 30px rgba(0,0,0,.4);margin-bottom:.5rem;transition:all .3s;border-left:3px solid " + clr + ";max-width:300px";
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(function() {
    t.style.opacity = "0";
    t.style.transform = "translateX(30px)";
    setTimeout(function() { t.remove(); }, 300);
  }, 3000);
}

/* ---- SCROLL REVEAL ---- */
function observeReveal() {
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    for (var i = 0; i < els.length; i++) els[i].classList.add("visible");
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) entries[i].target.classList.add("visible");
    }
  }, { threshold: 0.1 });
  for (var j = 0; j < els.length; j++) obs.observe(els[j]);
}

/* ---- CAN TILT ---- */
var ca = document.querySelector(".hero-can-area");
if (ca) {
  ca.addEventListener("mousemove", function(e) {
    var r = ca.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    var cf = document.getElementById("canFloat");
    if (cf) cf.style.transform = "translateY(-9px) rotateY(" + (x * 20) + "deg) rotateX(" + (-y * 12) + "deg)";
  });
  ca.addEventListener("mouseleave", function() {
    var cf = document.getElementById("canFloat");
    if (cf) cf.style.transform = "";
  });
}

/* ---- SMOOTH SCROLL ---- */
var sLinks = document.querySelectorAll('a[href^="#"]');
for (var si = 0; si < sLinks.length; si++) {
  sLinks[si].addEventListener("click", function(e) {
    var h = this.getAttribute("href");
    if (h && h.length > 1) { e.preventDefault(); var tgt = document.querySelector(h); if (tgt) tgt.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });
}

/* =============================================
   EVENT BINDINGS
   ============================================= */
document.getElementById("ageYes").addEventListener("click", enterSite);
document.getElementById("ageNo").addEventListener("click", leaveSite);

var _lb = document.querySelectorAll(".lang-btn");
for (var i = 0; i < _lb.length; i++) {
  _lb[i].addEventListener("click", function() { setLang(this.getAttribute("data-lang")); });
}

var _at = document.querySelectorAll(".auth-tab");
for (var i = 0; i < _at.length; i++) {
  _at[i].addEventListener("click", function() { switchTab(this.getAttribute("data-tab")); });
}

document.getElementById("loginForm").addEventListener("submit", doLogin);
document.getElementById("registerForm").addEventListener("submit", doRegister);
document.getElementById("logoutBtn").addEventListener("click", doLogout);
document.getElementById("cartBtn").addEventListener("click", openCheckout);
document.getElementById("closeCheckout").addEventListener("click", closeCheckout);
document.getElementById("toStep2").addEventListener("click", function() { goToStep(2); });
document.getElementById("toStep3").addEventListener("click", function() { goToStep(3); });
document.getElementById("backToStep1").addEventListener("click", function() { goToStep(1); });
document.getElementById("backToStep2").addEventListener("click", function() { goToStep(2); });
document.getElementById("placeOrderBtn").addEventListener("click", placeOrder);
document.getElementById("continueShopping").addEventListener("click", closeCheckout);

var _fb = document.querySelectorAll(".filter-btn");
for (var i = 0; i < _fb.length; i++) {
  _fb[i].addEventListener("click", function() {
    var all = document.querySelectorAll(".filter-btn");
    for (var j = 0; j < all.length; j++) all[j].classList.remove("active");
    this.classList.add("active");
    renderReleases(this.getAttribute("data-filter"));
  });
}

var _cnb = document.querySelectorAll(".checkout-nav-btn");
for (var i = 0; i < _cnb.length; i++) {
  _cnb[i].addEventListener("click", function() { goToStep(parseInt(this.getAttribute("data-step"))); });
}

var _popts = document.querySelectorAll(".payment-option");
for (var i = 0; i < _popts.length; i++) {
  _popts[i].addEventListener("click", function() {
    var all = document.querySelectorAll(".payment-option");
    for (var j = 0; j < all.length; j++) all[j].classList.remove("active");
    this.classList.add("active");
  });
}

document.getElementById("checkoutModal").addEventListener("click", function(e) {
  if (e.target === this) closeCheckout();
});

/* ---- INIT ---- */
renderReleases();
observeReveal();

})();
