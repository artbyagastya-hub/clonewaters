(function() {
  "use strict";

  var LABEL = "img/teddy-hopper-front.png";
  var cart = [];

  var products = [
    {id:1, name:"Teddy Hopper", style:"Double IPA", abv:"7.7", ibu:"15", vol:"330", price:219, stock:342, soldOutAt:20, status:"current", desc:"Our debut. Amarillo, Centennial, Chinook, Columbus and Simcoe hops.", accent:"g", img:LABEL},
    {id:2, name:"Neon Lotus", style:"Fruited Sour", abv:"4.8", ibu:"8", vol:"330", price:199, stock:0, soldOutAt:0, status:"upcoming", desc:"Tart lychee and dragon fruit sour.", accent:"p", img:""},
    {id:3, name:"Midnight Pho", style:"Spiced Stout", abv:"6.8", ibu:"25", vol:"330", price:219, stock:0, soldOutAt:0, status:"upcoming", desc:"Chocolate stout with star anise and cinnamon.", accent:"o", img:""},
    {id:4, name:"Saigon Session", style:"Rice Lager", abv:"4.5", ibu:"12", vol:"330", price:179, stock:0, soldOutAt:0, status:"past", desc:"Clean crisp rice lager.", accent:"c", img:""}
  ];

  function enterSite() {
    var el = document.getElementById("ageGate");
    if (el) {
      el.classList.add("hidden");
    }
    localStorage.setItem("cw_age", "1");
  }

  function leaveSite() {
    window.location.href = "https://www.google.com";
  }

  if (localStorage.getItem("cw_age") === "1") {
    var ae = document.getElementById("ageGate");
    if (ae) {
      ae.classList.add("hidden");
    }
  }

  function setLang(lang) {
    var btns = document.querySelectorAll(".lang-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.remove("active");
      if (btns[i].getAttribute("data-lang") === lang) {
        btns[i].classList.add("active");
      }
    }
  }

  window.addEventListener("scroll", function() {
    var n = document.getElementById("navbar");
    if (n) {
      if (window.scrollY > 50) {
        n.classList.add("scrolled");
      } else {
        n.classList.remove("scrolled");
      }
    }
  });

  function switchTab(tab) {
    var tabs = document.querySelectorAll(".auth-tab");
    var forms = document.querySelectorAll(".auth-form");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("active");
    }
    for (var j = 0; j < forms.length; j++) {
      forms[j].classList.remove("active");
    }
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

  function initCan() {
    var container = document.getElementById("canCanvas");
    if (!container) {
      return;
    }
    if (typeof THREE === "undefined") {
      return;
    }

    var w = container.clientWidth;
    var h = container.clientHeight;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    camera.position.set(0, 0.5, 5);
    camera.lookAt(0, 0, 0);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    var keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    var fillLight = new THREE.DirectionalLight(0x8888ff, 0.4);
    fillLight.position.set(-3, 2, 3);
    scene.add(fillLight);

    var backLight = new THREE.DirectionalLight(0x39ff14, 0.3);
    backLight.position.set(0, 2, -4);
    scene.add(backLight);

    var rimPt = new THREE.PointLight(0xffffff, 0.6, 10);
    rimPt.position.set(-3, 0, 2);
    scene.add(rimPt);

    try {
      var pmrem = new THREE.PMREMGenerator(renderer);
      var envScene = new THREE.Scene();
      envScene.background = new THREE.Color(0x111111);
      envScene.add(new THREE.AmbientLight(0x404040, 1));
      var ep1 = new THREE.PointLight(0xffffff, 100, 0);
      ep1.position.set(5, 5, 5);
      envScene.add(ep1);
      var ep2 = new THREE.PointLight(0x8888ff, 50, 0);
      ep2.position.set(-5, 3, -5);
      envScene.add(ep2);
      var ep3 = new THREE.PointLight(0x39ff14, 30, 0);
      ep3.position.set(0, -3, 5);
      envScene.add(ep3);
      scene.environment = pmrem.fromScene(envScene, 0.04).texture;
      pmrem.dispose();
    } catch (e) {
    }

    var texLoader = new THREE.TextureLoader();
    var labelTex = texLoader.load(LABEL);
    labelTex.encoding = THREE.sRGBEncoding;

    var can = new THREE.Group();

    var bodyGeo = new THREE.CylinderGeometry(0.85, 0.85, 2.8, 64, 1, true);
    var bodyMat = new THREE.MeshStandardMaterial({
      map: labelTex,
      metalness: 0.3,
      roughness: 0.35,
      side: THREE.DoubleSide
    });
    can.add(new THREE.Mesh(bodyGeo, bodyMat));

    var metalMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.15
    });

    var topGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.04, 64);
    var topMesh = new THREE.Mesh(topGeo, metalMat);
    topMesh.position.y = 1.4;
    can.add(topMesh);

    var rimGeo = new THREE.TorusGeometry(0.85, 0.025, 8, 64);
    var rimMesh = new THREE.Mesh(rimGeo, metalMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 1.42;
    can.add(rimMesh);

    var tabMat = new THREE.MeshStandardMaterial({
      color: 0xbbbbbb,
      metalness: 0.9,
      roughness: 0.2
    });

    var tabGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.015, 16);
    var tabMesh = new THREE.Mesh(tabGeo, tabMat);
    tabMesh.position.set(0.15, 1.43, 0);
    can.add(tabMesh);

    var tabRingGeo = new THREE.TorusGeometry(0.08, 0.012, 8, 24);
    var tabRingMesh = new THREE.Mesh(tabRingGeo, tabMat);
    tabRingMesh.rotation.x = Math.PI / 2;
    tabRingMesh.position.set(0.15, 1.44, 0);
    can.add(tabRingMesh);

    var botMat = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa,
      metalness: 0.95,
      roughness: 0.2
    });

    var botGeo = new THREE.CylinderGeometry(0.85, 0.82, 0.04, 64);
    var botMesh = new THREE.Mesh(botGeo, botMat);
    botMesh.position.y = -1.4;
    can.add(botMesh);

    var indGeo = new THREE.SphereGeometry(0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    var indMesh = new THREE.Mesh(indGeo, botMat);
    indMesh.rotation.x = Math.PI;
    indMesh.position.y = -1.38;
    indMesh.scale.y = 0.15;
    can.add(indMesh);

    can.position.y = 0.1;
    scene.add(can);

    var mouseDown = false;
    var speed = 0.008;
    var target = 0.008;

    renderer.domElement.addEventListener("mousedown", function() {
      mouseDown = true;
    });
    renderer.domElement.addEventListener("mouseup", function() {
      mouseDown = false;
      target = 0.008;
    });
    renderer.domElement.addEventListener("mouseleave", function() {
      mouseDown = false;
      target = 0.008;
    });
    renderer.domElement.addEventListener("mousemove", function(e) {
      if (mouseDown) {
        var rect = renderer.domElement.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        target = x * 0.06;
      }
    });
    renderer.domElement.addEventListener("touchstart", function() {
      mouseDown = true;
    }, { passive: true });
    renderer.domElement.addEventListener("touchend", function() {
      mouseDown = false;
      target = 0.008;
    });
    renderer.domElement.addEventListener("touchmove", function(e) {
      if (mouseDown && e.touches.length > 0) {
        var rect = renderer.domElement.getBoundingClientRect();
        var x = (e.touches[0].clientX - rect.left) / rect.width - 0.5;
        target = x * 0.06;
      }
    }, { passive: true });

    var ft = 0;

    function animate() {
      requestAnimationFrame(animate);
      speed = speed + (target - speed) * 0.05;
      can.rotation.y = can.rotation.y + speed;
      ft = ft + 0.015;
      can.position.y = 0.1 + Math.sin(ft) * 0.08;
      can.rotation.x = Math.sin(ft * 0.7) * 0.03;
      can.rotation.z = Math.cos(ft * 0.5) * 0.02;
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", function() {
      w = container.clientWidth;
      h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  function renderReleases(filter) {
    if (!filter) {
      filter = "all";
    }
    var grid = document.getElementById("relGrid");
    if (!grid) {
      return;
    }
    grid.innerHTML = "";
    for (var idx = 0; idx < products.length; idx++) {
      var p = products[idx];
      if (filter !== "all" && p.status !== filter) {
        continue;
      }

      var bc = "sd";
      var bt = "Sold Out";
      if (p.status === "upcoming") {
        bc = "up";
        bt = "Coming Soon";
      }
      if (p.status === "current") {
        bc = "cr";
        bt = "Available Now";
      }

      var bb = "";
      if (p.status === "current") {
        bb = '<button class="btn-buy" data-add="' + p.id + '">Add to Cart - ' + p.price + 'K</button>';
      }
      if (p.status === "past") {
        bb = '<button class="btn-buy sold-out" disabled>Sold Out</button>';
      }

      var ih = "";
      if (p.img) {
        ih = '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy" width="200" height="350">';
      } else {
        var gc = "#0a3d2e,#0d2847,#0a0a2e";
        if (p.accent === "p") {
          gc = "#2a0a4e,#1a0a3e,#0d0a2e";
        }
        if (p.accent === "o") {
          gc = "#2a1500,#1a0a0a,#0d0a0a";
        }
        if (p.accent === "c") {
          gc = "#0a2a3e,#0a1a2e,#0a0a1e";
        }
        ih = '<div class="placeholder-can" style="background:linear-gradient(135deg,' + gc + ');color:var(--neon)">' + p.name + '</div>';
      }

      var card = document.createElement("article");
      card.className = "rel-card reveal";
      card.setAttribute("data-accent", p.accent);
      card.setAttribute("data-status", p.status);
      card.style.transitionDelay = (idx * 0.08) + "s";

      var html = "";
      html += '<div class="rel-badge ' + bc + '"><span class="badge-dot-sm"></span>' + bt + '</div>';
      html += '<div class="rel-card-can">' + ih + '</div>';
      html += '<div class="rel-card-info">';
      html += '<h3>' + p.name.toUpperCase() + '</h3>';
      html += '<div class="rel-style">' + p.style + '</div>';
      html += '<p class="rel-desc">' + p.desc + '</p>';
      html += '<div class="rel-meta">';
      html += '<span>' + p.abv + '% ABV</span>';
      html += '<span>IBU ' + p.ibu + '</span>';
      html += '<span>' + p.vol + 'ml</span>';
      html += '</div>';
      html += bb;
      html += '</div>';

      card.innerHTML = html;
      grid.appendChild(card);
    }
    observeReveal();
    bindAdd();
  }

  function addToCart(id) {
    var p = null;
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        p = products[i];
        break;
      }
    }
    if (!p) {
      return;
    }
    if (p.stock <= 0) {
      return;
    }

    var f = null;
    for (var j = 0; j < cart.length; j++) {
      if (cart[j].id === id) {
        f = cart[j];
        break;
      }
    }

    if (f) {
      if (f.qty >= p.stock) {
        showToast("Max stock reached", "info");
        return;
      }
      f.qty = f.qty + 1;
    } else {
      cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
    }

    updateCartCount();
    showToast(p.name + " added!", "success");

    p.stock = p.stock - 1;
    if (p.soldOutAt > 0 && p.stock <= p.soldOutAt) {
      p.status = "past";
      showToast(p.name + " SOLD OUT!", "info");
      var ab = document.querySelector(".filter-btn.active");
      if (ab) {
        renderReleases(ab.getAttribute("data-filter"));
      }
    }
  }

  function updateCartCount() {
    var c = 0;
    for (var i = 0; i < cart.length; i++) {
      c = c + cart[i].qty;
    }
    var el = document.getElementById("cartCount");
    if (el) {
      el.textContent = c;
    }
  }

  function bindAdd() {
    var btns = document.querySelectorAll("[data-add]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var pid = parseInt(this.getAttribute("data-add"));
        addToCart(pid);
      });
    }
  }

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
    for (var i = 0; i < ss.length; i++) {
      ss[i].classList.remove("active");
    }
    for (var j = 0; j < nb.length; j++) {
      nb[j].classList.remove("active");
    }
    var ts = document.getElementById("step" + step);
    if (ts) {
      ts.classList.add("active");
    }
    for (var k = 0; k < nb.length; k++) {
      if (nb[k].getAttribute("data-step") === String(step)) {
        nb[k].classList.add("active");
      }
    }
    if (step === 3) {
      renderSummary();
    }
  }

  function renderCart() {
    var ie = document.getElementById("cartItems");
    var ee = document.getElementById("cartEmpty");
    var ce = document.getElementById("cartContent");
    if (!ie) {
      return;
    }

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
      sub = sub + itT;

      var r = document.createElement("div");
      r.className = "cart-item";

      var rh = "";
      rh += '<div class="cart-item-info">';
      rh += '<div class="cart-item-name">' + it.name + '</div>';
      rh += '<div class="cart-item-price">' + it.price + 'K x ' + it.qty + ' = ' + itT + 'K</div>';
      rh += '</div>';
      rh += '<div class="cart-item-qty">';
      rh += '<button class="qty-btn" data-qi="' + i + '" data-qd="-1">-</button>';
      rh += '<span>' + it.qty + '</span>';
      rh += '<button class="qty-btn" data-qi="' + i + '" data-qd="1">+</button>';
      rh += '</div>';
      rh += '<button class="cart-item-remove" data-ri="' + i + '">x</button>';

      r.innerHTML = rh;
      ie.appendChild(r);
    }

    var ship = 50;
    if (sub >= 1000) {
      ship = 0;
    }
    var shipText = ship + "K VND";
    if (ship === 0) {
      shipText = "FREE";
    }

    document.getElementById("cartSubtotal").textContent = sub + "K VND";
    document.getElementById("cartShipping").textContent = shipText;
    document.getElementById("cartTotal").textContent = (sub + ship) + "K VND";

    var qb = ie.querySelectorAll(".qty-btn");
    for (var q = 0; q < qb.length; q++) {
      qb[q].addEventListener("click", function() {
        var idx = parseInt(this.getAttribute("data-qi"));
        var delta = parseInt(this.getAttribute("data-qd"));
        cart[idx].qty = cart[idx].qty + delta;
        if (cart[idx].qty <= 0) {
          cart.splice(idx, 1);
        }
        updateCartCount();
        renderCart();
      });
    }

    var rb = ie.querySelectorAll(".cart-item-remove");
    for (var r2 = 0; r2 < rb.length; r2++) {
      rb[r2].addEventListener("click", function() {
        var idx = parseInt(this.getAttribute("data-ri"));
        cart.splice(idx, 1);
        updateCartCount();
        renderCart();
      });
    }
  }

  function renderSummary() {
    var el = document.getElementById("orderSummary");
    if (!el) {
      return;
    }

    var nmEl = document.getElementById("shipName");
    var phEl = document.getElementById("shipPhone");
    var adEl = document.getElementById("shipAddress");
    var diEl = document.getElementById("shipDistrict");
    var ciEl = document.getElementById("shipCity");

    var nm = "";
    var ph = "";
    var ad = "";
    var di = "";
    var ci = "";

    if (nmEl) { nm = nmEl.value; }
    if (phEl) { ph = phEl.value; }
    if (adEl) { ad = adEl.value; }
    if (diEl) { di = diEl.value; }
    if (ciEl) { ci = ciEl.value; }

    var sub = 0;
    var ih = "";

    for (var i = 0; i < cart.length; i++) {
      var t = cart[i].price * cart[i].qty;
      sub = sub + t;
      ih += '<div style="display:flex;justify-content:space-between;padding:.3rem 0;font-size:.82rem">';
      ih += '<span>' + cart[i].name + ' x ' + cart[i].qty + '</span>';
      ih += '<span>' + t + 'K</span>';
      ih += '</div>';
    }

    var ship = 50;
    if (sub >= 1000) {
      ship = 0;
    }
    var shipText = ship + "K";
    if (ship === 0) {
      shipText = "FREE";
    }

    var tot = sub + ship;
    var addr = nm + "<br>" + ph + "<br>" + ad;
    if (di) {
      addr = addr + ", " + di;
    }
    if (ci) {
      addr = addr + ", " + ci;
    }

    var sh = "";
    sh += '<div style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid var(--border)">';
    sh += '<h4 style="font-size:.85rem;margin-bottom:.5rem;color:var(--neon)">Items</h4>';
    sh += ih;
    sh += '</div>';
    sh += '<div style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid var(--border)">';
    sh += '<h4 style="font-size:.85rem;margin-bottom:.5rem;color:var(--neon)">Shipping To</h4>';
    sh += '<div style="font-size:.82rem;color:var(--txt2);line-height:1.8">' + addr + '</div>';
    sh += '</div>';
    sh += '<div style="display:flex;justify-content:space-between;padding:.3rem 0;font-size:.82rem"><span>Subtotal</span><span>' + sub + 'K</span></div>';
    sh += '<div style="display:flex;justify-content:space-between;padding:.3rem 0;font-size:.82rem"><span>Shipping</span><span>' + shipText + '</span></div>';
    sh += '<div style="display:flex;justify-content:space-between;padding:.5rem 0;font-size:1rem;font-weight:700;border-top:1px solid var(--border);margin-top:.5rem"><span>Total</span><span style="color:var(--neon)">' + tot + 'K VND</span></div>';

    el.innerHTML = sh;
  }

  function placeOrder() {
    var nmEl = document.getElementById("shipName");
    var phEl = document.getElementById("shipPhone");
    var adEl = document.getElementById("shipAddress");
    var nm = nmEl ? nmEl.value : "";
    var ph = phEl ? phEl.value : "";
    var ad = adEl ? adEl.value : "";
    if (!nm || !ph || !ad) {
      showToast("Fill all fields", "error");
      return;
    }
    var oid = "CW-" + Math.floor(1000 + Math.random() * 9000);
    document.getElementById("orderIdDisplay").textContent = "#" + oid;
    goToStep(4);
    cart = [];
    updateCartCount();
  }

  function showToast(msg, type) {
    var c = document.getElementById("toastContainer");
    if (!c) {
      return;
    }
    var t = document.createElement("div");
    var clr = "#00d4ff";
    if (type === "success") {
      clr = "#39ff14";
    }
    if (type === "error") {
      clr = "#ff3b3b";
    }
    t.style.cssText = "padding:.8rem 1.2rem;background:#111;border:1px solid #2a2a38;border-radius:10px;font-size:.82rem;color:#f0f0f5;box-shadow:0 10px 30px rgba(0,0,0,.4);margin-bottom:.5rem;transition:all .3s;border-left:3px solid " + clr + ";max-width:300px";
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(function() {
      t.style.opacity = "0";
      t.style.transform = "translateX(30px)";
      setTimeout(function() {
        t.remove();
      }, 300);
    }, 3000);
  }

  function observeReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      for (var i = 0; i < els.length; i++) {
        els[i].classList.add("visible");
      }
      return;
    }
    var obs = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("visible");
        }
      }
    }, { threshold: 0.1 });
    for (var j = 0; j < els.length; j++) {
      obs.observe(els[j]);
    }
  }

  var sLinks = document.querySelectorAll('a[href^="#"]');
  for (var si = 0; si < sLinks.length; si++) {
    sLinks[si].addEventListener("click", function(e) {
      var h = this.getAttribute("href");
      if (h) {
        if (h.length > 1) {
          e.preventDefault();
          var tgt = document.querySelector(h);
          if (tgt) {
            tgt.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    });
  }

  document.getElementById("ageYes").addEventListener("click", enterSite);
  document.getElementById("ageNo").addEventListener("click", leaveSite);

  var _lb = document.querySelectorAll(".lang-btn");
  for (var i = 0; i < _lb.length; i++) {
    _lb[i].addEventListener("click", function() {
      setLang(this.getAttribute("data-lang"));
    });
  }

  var _at = document.querySelectorAll(".auth-tab");
  for (var i = 0; i < _at.length; i++) {
    _at[i].addEventListener("click", function() {
      switchTab(this.getAttribute("data-tab"));
    });
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
      for (var j = 0; j < all.length; j++) {
        all[j].classList.remove("active");
      }
      this.classList.add("active");
      renderReleases(this.getAttribute("data-filter"));
    });
  }

  var _cnb = document.querySelectorAll(".checkout-nav-btn");
  for (var i = 0; i < _cnb.length; i++) {
    _cnb[i].addEventListener("click", function() {
      goToStep(parseInt(this.getAttribute("data-step")));
    });
  }

  var _popts = document.querySelectorAll(".payment-option");
  for (var i = 0; i < _popts.length; i++) {
    _popts[i].addEventListener("click", function() {
      var all = document.querySelectorAll(".payment-option");
      for (var j = 0; j < all.length; j++) {
        all[j].classList.remove("active");
      }
      this.classList.add("active");
    });
  }

  document.getElementById("checkoutModal").addEventListener("click", function(e) {
    if (e.target === this) {
      closeCheckout();
    }
  });

  initCan();
  renderReleases();
  observeReveal();

})();
