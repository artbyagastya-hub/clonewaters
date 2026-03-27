/* =============================================
   DATA
   ============================================= */
var LABEL_IMAGE = 'img/teddy-hopper.png';

var products = [
  {
    id: 1,
    name: 'Teddy Hopper',
    style: 'Double IPA',
    abv: '7.7',
    ibu: '15',
    vol: '330',
    price: 219,
    stock: 342,
    soldOutAt: 20,
    status: 'current',
    desc: 'Our debut release. Packed with Amarillo, Centennial, Chinook, Columbus and Simcoe hops. A psychedelic explosion of tropical fruit, citrus, and pine.',
    accent: 'g',
    img: LABEL_IMAGE
  },
  {
    id: 2,
    name: 'Neon Lotus',
    style: 'Fruited Sour',
    abv: '4.8',
    ibu: '8',
    vol: '330',
    price: 199,
    stock: 0,
    soldOutAt: 0,
    status: 'upcoming',
    desc: 'Tart lychee and dragon fruit sour with a floral lotus finish. Light, refreshing, dangerously drinkable.',
    accent: 'p',
    img: ''
  },
  {
    id: 3,
    name: 'Midnight Pho',
    style: 'Spiced Stout',
    abv: '6.8',
    ibu: '25',
    vol: '330',
    price: 219,
    stock: 0,
    soldOutAt: 0,
    status: 'upcoming',
    desc: 'Rich chocolate stout brewed with star anise, cinnamon, and a hint of pho spice. Dark as midnight.',
    accent: 'o',
    img: ''
  },
  {
    id: 4,
    name: 'Saigon Session',
    style: 'Rice Lager',
    abv: '4.5',
    ibu: '12',
    vol: '330',
    price: 179,
    stock: 0,
    soldOutAt: 0,
    status: 'past',
    desc: 'Clean, crisp rice lager brewed with jasmine rice. The perfect street-side refreshment.',
    accent: 'c',
    img: ''
  }
];

var cart = [];


/* =============================================
   AGE GATE
   ============================================= */
function enterSite() {
  var el = document.getElementById('ageGate');
  if (el) el.classList.add('hidden');
  localStorage.setItem('cw_age', '1');
}

function leaveSite() {
  window.location.href = 'https://www.google.com';
}

// Auto-check on load
(function() {
  if (localStorage.getItem('cw_age') === '1') {
    var el = document.getElementById('ageGate');
    if (el) el.classList.add('hidden');
  }
})();


/* =============================================
   LANGUAGE
   ============================================= */
function setLang(lang) {
  var btns = document.querySelectorAll('.lang-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
    if (btns[i].getAttribute('data-lang') === lang) {
      btns[i].classList.add('active');
    }
  }
  var els = document.querySelectorAll('[data-' + lang + ']');
  for (var j = 0; j < els.length; j++) {
    var val = els[j].getAttribute('data-' + lang);
    if (val) els[j].innerHTML = val;
  }
}


/* =============================================
   NAV SCROLL
   ============================================= */
window.addEventListener('scroll', function() {
  var nav = document.getElementById('navbar');
  if (nav) {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
});


/* =============================================
   AUTH
   ============================================= */
function switchTab(tab) {
  var tabs = document.querySelectorAll('.auth-tab');
  var forms = document.querySelectorAll('.auth-form');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
  for (var j = 0; j < forms.length; j++) forms[j].classList.remove('active');
  if (tab === 'login') {
    tabs[0].classList.add('active');
    document.getElementById('loginForm').classList.add('active');
  } else {
    tabs[1].classList.add('active');
    document.getElementById('registerForm').classList.add('active');
  }
}

function doLogin(e) {
  e.preventDefault();
  document.getElementById('authForms').style.display = 'none';
  document.getElementById('dashboardView').classList.add('active');
}

function doRegister(e) {
  e.preventDefault();
  document.getElementById('authForms').style.display = 'none';
  document.getElementById('dashboardView').classList.add('active');
}

function doLogout() {
  document.getElementById('authForms').style.display = 'block';
  document.getElementById('dashboardView').classList.remove('active');
  document.getElementById('loginForm').classList.add('active');
  switchTab('login');
}


/* =============================================
   3D CAN
   ============================================= */
function buildCan(imageUrl) {
  var cyl = document.getElementById('canCylinder');
  if (!cyl) return;
  cyl.innerHTML = '';
  var n = 24;
  var w = 28;
  var r = 110;
  for (var i = 0; i < n; i++) {
    var angle = (360 / n) * i;
    var panel = document.createElement('div');
    panel.className = 'can-panel';
    panel.style.width = w + 'px';
    panel.style.transform = 'rotateY(' + angle + 'deg) translateZ(' + r + 'px)';
    var bg = document.createElement('div');
    bg.className = 'label-bg';
    if (imageUrl) {
      bg.style.backgroundImage = 'url(' + imageUrl + ')';
      bg.style.backgroundSize = (n * 100) + '% 100%';
      bg.style.backgroundPosition = ((i / (n - 1)) * 100) + '% 50%';
    } else {
      bg.style.background = 'linear-gradient(' + (130 + angle) + 'deg, #0a0a2e 0%, #1a0a3e 20%, #0d2847 35%, #0a3d2e 50%, #0d2847 65%, #1a0a3e 80%, #0a0a2e 100%)';
    }
    var shine = document.createElement('div');
    shine.className = 'shine';
    var edgeL = document.createElement('div');
    edgeL.className = 'edge edge-l';
    var edgeR = document.createElement('div');
    edgeR.className = 'edge edge-r';
    panel.appendChild(bg);
    panel.appendChild(shine);
    panel.appendChild(edgeL);
    panel.appendChild(edgeR);
    cyl.appendChild(panel);
  }
}

buildCan(LABEL_IMAGE);


/* =============================================
   RELEASES
   ============================================= */
function renderReleases(filter) {
  filter = filter || 'all';
  var grid = document.getElementById('relGrid');
  if (!grid) return;
  grid.innerHTML = '';

  for (var idx = 0; idx < products.length; idx++) {
    var p = products[idx];
    if (filter !== 'all' && p.status !== filter) continue;

    var badgeClass = p.status === 'upcoming' ? 'up' : p.status === 'current' ? 'cr' : 'sd';
    var badgeText = p.status === 'upcoming' ? 'Coming Soon' : p.status === 'current' ? 'Available Now' : 'Sold Out';

    var buyBtn = '';
    if (p.status === 'current') {
      buyBtn = '<button class="btn-buy" data-add="' + p.id + '">Add to Cart — ' + p.price + 'K VND</button>';
    } else if (p.status === 'past') {
      buyBtn = '<button class="btn-buy sold-out" disabled>Sold Out</button>';
    }

    var imgHtml = '';
    if (p.img) {
      imgHtml = '<img src="' + p.img + '" alt="' + p.name + ' — ' + p.style + '" loading="lazy" width="200" height="350">';
    } else {
      var grads = {
        'g': 'linear-gradient(135deg, #0a3d2e, #0d2847, #0a0a2e)',
        'p': 'linear-gradient(135deg, #2a0a4e, #1a0a3e, #0d0a2e)',
        'o': 'linear-gradient(135deg, #2a1500, #1a0a0a, #0d0a0a)',
        'c': 'linear-gradient(135deg, #0a2a3e, #0a1a2e, #0a0a1e)'
      };
      imgHtml = '<div class="placeholder-can" style="background:' + (grads[p.accent] || grads['g']) + ';color:var(--neon)">' + p.name + '</div>';
    }

    var card = document.createElement('article');
    card.className = 'rel-card reveal';
    card.setAttribute('data-accent', p.accent);
    card.setAttribute('data-status', p.status);
    card.style.transitionDelay = (idx * 0.08) + 's';

    card.innerHTML = '<div class="rel-badge ' + badgeClass + '"><span class="badge-dot-sm"></span>' + badgeText + '</div>' +
      '<div class="rel-card-can">' + imgHtml + '</div>' +
      '<div class="rel-card-info">' +
      '<h3>' + p.name.toUpperCase() + '</h3>' +
      '<div class="rel-style">' + p.style + '</div>' +
      '<p class="rel-desc">' + p.desc + '</p>' +
      '<div class="rel-meta"><span>' + p.abv + '% ABV</span><span>IBU ' + p.ibu + '</span><span>' + p.vol + 'ml</span></div>' +
      buyBtn +
      '</div>';

    grid.appendChild(card);
  }

  observeReveal();
  bindAddToCart();
}


/* =============================================
   CART
   ============================================= */
function addToCart(id) {
  var p = null;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) { p = products[i]; break; }
  }
  if (!p || p.stock <= 0) return;

  var found = null;
  for (var j = 0; j < cart.length; j++) {
    if (cart[j].id === id) { found = cart[j]; break; }
  }

  if (found) {
    if (found.qty >= p.stock) { showToast('Maximum stock reached', 'info'); return; }
    found.qty++;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
  }

  updateCartCount();
  showToast(p.name + ' added to cart!', 'success');

  p.stock--;
  if (p.soldOutAt > 0 && p.stock <= p.soldOutAt) {
    p.status = 'past';
    showToast(p.name + ' is now SOLD OUT!', 'info');
    renderReleases(document.querySelector('.filter-btn.active').getAttribute('data-filter'));
  }
}

function updateCartCount() {
  var count = 0;
  for (var i = 0; i < cart.length; i++) count += cart[i].qty;
  var el = document.getElementById('cartCount');
  if (el) el.textContent = count;
}

function bindAddToCart() {
  var btns = document.querySelectorAll('[data-add]');
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
      addToCart(parseInt(this.getAttribute('data-add')));
    });
  }
}


/* =============================================
   CHECKOUT
   ============================================= */
function openCheckout() {
  renderCart();
  document.getElementById('checkoutModal').classList.add('open');
  goToStep(1);
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
}

function goToStep(step) {
  var steps = document.querySelectorAll('.checkout-step');
  var btns = document.querySelectorAll('.checkout-nav-btn');
  for (var i = 0; i < steps.length; i++) steps[i].classList.remove('active');
  for (var j = 0; j < btns.length; j++) btns[j].classList.remove('active');
  document.getElementById('step' + step).classList.add('active');
  for (var k = 0; k < btns.length; k++) {
    if (btns[k].getAttribute('data-step') === String(step)) btns[k].classList.add('active');
  }
  if (step === 3) renderSummary();
}

function renderCart() {
  var itemsEl = document.getElementById('cartItems');
  var emptyEl = document.getElementById('cartEmpty');
  var contentEl = document.getElementById('cartContent');
  if (!itemsEl) return;

  if (cart.length === 0) {
    emptyEl.style.display = 'block';
    contentEl.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  contentEl.style.display = 'block';
  itemsEl.innerHTML = '';
  var subtotal = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var total = item.price * item.qty;
    subtotal += total;
    var row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = '<div class="cart-item-info"><div class="cart-item-name">' + item.name + '</div><div class="cart-item-price">' + item.price + 'K x ' + item.qty + ' = ' + total + 'K VND</div></div>' +
      '<div class="cart-item-qty"><button class="qty-btn" data-qi="' + i + '" data-qd="-1">−</button><span>' + item.qty + '</span><button class="qty-btn" data-qi="' + i + '" data-qd="1">+</button></div>' +
      '<button class="cart-item-remove" data-ri="' + i + '">✕</button>';
    itemsEl.appendChild(row);
  }

  var shipping = subtotal >= 1000 ? 0 : 50;
  document.getElementById('cartSubtotal').textContent = subtotal + 'K VND';
  document.getElementById('cartShipping').textContent = shipping === 0 ? 'FREE' : shipping + 'K VND';
  document.getElementById('cartTotal').textContent = (subtotal + shipping) + 'K VND';

  // Bind qty buttons
  var qtyBtns = itemsEl.querySelectorAll('[data-qi]');
  for (var q = 0; q < qtyBtns.length; q++) {
    qtyBtns[q].addEventListener('click', function() {
      var idx = parseInt(this.getAttribute('data-qi'));
      var delta = parseInt(this.getAttribute('data-qd'));
      cart[idx].qty += delta;
      if (cart[idx].qty <= 0) cart.splice(idx, 1);
      updateCartCount();
      renderCart();
    });
  }

  // Bind remove buttons
  var remBtns = itemsEl.querySelectorAll('[data-ri]');
  for (var r = 0; r < remBtns.length; r++) {
    remBtns[r].addEventListener('click', function() {
      var idx = parseInt(this.getAttribute('data-ri'));
      cart.splice(idx, 1);
      updateCartCount();
      renderCart();
    });
  }
}

function renderSummary() {
  var el = document.getElementById('orderSummary');
  if (!el) return;

  var name = document.getElementById('shipName') ? document.getElementById('shipName').value : '';
  var phone = document.getElementById('shipPhone') ? document.getElementById('shipPhone').value : '';
  var address = document.getElementById('shipAddress') ? document.getElementById('shipAddress').value : '';
  var district = document.getElementById('shipDistrict') ? document.getElementById('shipDistrict').value : '';
  var city = document.getElementById('shipCity') ? document.getElementById('shipCity').value : '';

  var subtotal = 0;
  var itemsHtml = '';
  for (var i = 0; i < cart.length; i++) {
    var t = cart[i].price * cart[i].qty;
    subtotal += t;
    itemsHtml += '<div style="display:flex;justify-content:space-between;padding:.3rem 0;font-size:.82rem"><span>' + cart[i].name + ' × ' + cart[i].qty + '</span><span>' + t + 'K</span></div>';
  }

  var shipping = subtotal >= 1000 ? 0 : 50;
  var total = subtotal + shipping;

  el.innerHTML = '<div style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid var(--border)">' +
    '<h4 style="font-size:.85rem;margin-bottom:.5rem;color:var(--neon)">Items</h4>' + itemsHtml + '</div>' +
    '<div style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid var(--border)">' +
    '<h4 style="font-size:.85rem;margin-bottom:.5rem;color:var(--neon)">Shipping To</h4>' +
    '<div style="font-size:.82rem;color:var(--txt2);line-height:1.8">' + (name || '—') + '<br>' + (phone || '') + '<br>' + (address || '') + (district ? ', ' + district : '') + (city ? ', ' + city : '') + '</div></div>' +
    '<div style="display:flex;justify-content:space-between;padding:.3rem 0;font-size:.82rem"><span>Subtotal</span><span>' + subtotal + 'K VND</span></div>' +
    '<div style="display:flex;justify-content:space-between;padding:.3rem 0;font-size:.82rem"><span>Shipping</span><span>' + (shipping === 0 ? 'FREE' : shipping + 'K VND') + '</span></div>' +
    '<div style="display:flex;justify-content:space-between;padding:.5rem 0;font-size:1rem;font-weight:700;border-top:1px solid var(--border);margin-top:.5rem"><span>Total</span><span style="color:var(--neon)">' + total + 'K VND</span></div>';
}

function placeOrder() {
  var name = document.getElementById('shipName') ? document.getElementById('shipName').value : '';
  var phone = document.getElementById('shipPhone') ? document.getElementById('shipPhone').value : '';
  var address = document.getElementById('shipAddress') ? document.getElementById('shipAddress').value : '';

  if (!name || !phone || !address) {
    showToast('Please fill in all shipping fields', 'error');
    return;
  }

  var orderId = 'CW-' + Math.floor(1000 + Math.random() * 9000);
  document.getElementById('orderIdDisplay').textContent = '#' + orderId;

  // Collect order data for email
  var orderData = {
    orderId: orderId,
    customer: name,
    phone: phone,
    email: document.getElementById('shipEmail') ? document.getElementById('shipEmail').value : '',
    address: address + ', ' + (document.getElementById('shipDistrict') ? document.getElementById('shipDistrict').value : '') + ', ' + (document.getElementById('shipCity') ? document.getElementById('shipCity').value : ''),
    items: cart.slice(),
    total: 0
  };
  for (var i = 0; i < cart.length; i++) {
    orderData.total += cart[i].price * cart[i].qty;
  }

  console.log('ORDER PLACED:', JSON.stringify(orderData, null, 2));

  // To send email via Formspree:
  // 1. Sign up at formspree.io and get your form ID
  // 2. Uncomment the fetch below and replace YOUR_FORM_ID
  /*
  fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: 'New Order: ' + orderId,
      message: JSON.stringify(orderData, null, 2),
      customer: name,
      email: orderData.email
    })
  });
  */

  goToStep(4);
  cart = [];
  updateCartCount();
}


/* =============================================
   TOAST
   ============================================= */
function showToast(msg, type) {
  type = type || 'info';
  var container = document.getElementById('toastContainer');
  if (!container) return;
  var t = document.createElement('div');
  t.className = 'toast toast-' + type;
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(function() {
    t.style.opacity = '0';
    t.style.transform = 'translateX(30px)';
    setTimeout(function() { t.remove(); }, 300);
  }, 3000);
}


/* =============================================
   SCROLL REVEAL
   ============================================= */
function observeReveal() {
  if (!('IntersectionObserver' in window)) {
    var all = document.querySelectorAll('.reveal');
    for (var i = 0; i < all.length; i++) all[i].classList.add('visible');
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) entries[i].target.classList.add('visible');
    }
  }, { threshold: 0.1 });
  var els = document.querySelectorAll('.reveal');
  for (var j = 0; j < els.length; j++) obs.observe(els[j]);
}


/* =============================================
   SMOOTH SCROLL
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var h = this.getAttribute('href');
    if (h && h.length > 1) {
      e.preventDefault();
      var t = document.querySelector(h);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* =============================================
   CAN MOUSE TILT
   ============================================= */
var canArea = document.querySelector('.hero-can-area');
if (canArea) {
  canArea.addEventListener('mousemove', function(e) {
    var rect = canArea.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;
    var cf = document.getElementById('canFloat function() {
    var cf = document.getElementById('canFloat');
    if (cf) cf.style.transform = 'translateY(-9px) rotateY(' + (x * 20) + 'deg) rotateX(' + (-y * 12) + 'deg)';
  });
  canArea.addEventListener('mouseleave',');
    if (cf) cf.style.transform = '';
  });
}


/* =============================================
   EVENT BINDINGS (all via JS, no inline)
   ============================================= */
document.getElementById('ageYes').addEventListener('click', enterSite);
document.getElementById('ageNo').addEventListener('click', leaveSite);

document.querySelectorAll('.lang-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    setLang(this.getAttribute('data-lang'));
  });
});

document.querySelectorAll('.auth-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    switchTab(this.getAttribute('data-tab'));
  });
});

document.getElementById('loginForm').addEventListener('submit', doLogin);
document.getElementById('registerForm').addEventListener('submit', doRegister);
document.getElementById('logoutBtn').addEventListener('click', doLogout);

document.getElementById('cartBtn').addEventListener('click', openCheckout);
document.getElementById('closeCheckout').addEventListener('click', closeCheckout);

document.getElementById('toStep2').addEventListener('click', function() { goToStep(2); });
document.getElementById('toStep3').addEventListener('click', function() { goToStep(3); });
document.getElementById('backToStep1').addEventListener('click', function() { goToStep(1); });
document.getElementById('backToStep2').addEventListener('click', function() { goToStep(2); });
document.getElementById('placeOrderBtn').addEventListener('click', placeOrder);
document.getElementById('continueShopping').addEventListener('click', closeCheckout);

document.querySelectorAll('.filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    this.classList.add('active');
    renderReleases(this.getAttribute('data-filter'));
  });
});

document.querySelectorAll('.checkout-nav-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    goToStep(parseInt(this.getAttribute('data-step')));
  });
});

document.querySelectorAll('.payment-option').forEach(function(opt) {
  opt.addEventListener('click', function() {
    document.querySelectorAll('.payment-option').forEach(function(o) { o.classList.remove('active'); });
    this.classList.add('active');
  });
});

document.getElementById('checkoutModal').addEventListener('click', function(e) {
  if (e.target === this) closeCheckout();
});


/* =============================================
   INIT
   ============================================= */
renderReleases();
observeReveal();
