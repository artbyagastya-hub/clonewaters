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
var currentLang = 'en';


/* =============================================
   AGE GATE
   ============================================= */
function enterSite() {
  var overlay = document.getElementById('ageGate');
  if (overlay) {
    overlay.classList.add('hidden');
  }
  localStorage.setItem('cw_age', '1');
}

function leaveSite() {
  window.location.href = 'https://www.google.com';
}

// Check if already verified
if (localStorage.getItem('cw_age') === '1') {
  var ageOverlay = document.getElementById('ageGate');
  if (ageOverlay) {
    ageOverlay.classList.add('hidden');
  }
}


/* =============================================
   LANGUAGE TOGGLE
   ============================================= */
function setLang(lang) {
  currentLang = lang;
  var btns = document.querySelectorAll('.lang-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }
  var activeBtn = document.querySelector('.lang-btn[onclick="setLang(\'' + lang + '\')"]');
  if (activeBtn) activeBtn.classList.add('active');

  var els = document.querySelectorAll('[data-' + lang + ']');
  for (var j = 0; j < els.length; j++) {
    els[j].innerHTML = els[j].getAttribute('data-' + lang);
  }
}


/* =============================================
   NAVIGATION SCROLL
   ============================================= */
window.addEventListener('scroll', function() {
  var nav = document.getElementById('navbar');
  if (nav) {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});


/* =============================================
   AUTH (LOGIN / REGISTER)
   ============================================= */
function switchTab(tab) {
  var tabs = document.querySelectorAll('.auth-tab');
  var forms = document.querySelectorAll('.auth-form');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
  for (var j = 0; j < forms.length; j++) forms[j].classList.remove('active');

  if (tab === 'login') {
    tabs[0].classList.add('active');
  } else {
    tabs[1].classList.add('active');
    document.getElementById('registerForm').classList.add('active');
  }
}

function doLogin(e) {
  e.preventDefault();
  var authForms = document.getElementById('authForms');
  var dashView = document.getElementById('dashboardView');
  if (authForms) authForms.style.display = 'none';
  if (dashView) dashView.classList.add('active');
}

function doRegister(e) {
  e.preventDefault();
  var authForms = document.getElementById('authForms');
  var dashView = document.getElementById('dashboardView');
  if (authForms) authForms.style.display = 'none';
  if (dashView) dashView.classList.add('active');
}

function doLogout() {
  var authForms = document.getElementById('authForms');
  var dashView = document.getElementById('dashboardView');
  if (authForms) authForms.style.display = 'block';
    document.getElementById('loginForm').classList.add('active');
  if (dashView) dashView.classList.remove('active');
  var forms = document.querySelectorAll('.auth-form');
  for (var i = 0; i < forms.length; i++) forms[i].reset();
  switchTab('login');
}


/* =============================================
   3D CAN
   ============================================= */
function buildCan(imageUrl) {
  var cylinder = document.getElementById('canCylinder');
  if (!cylinder) return;
  cylinder.innerHTML = '';

  var panelCount = 24;
  var panelWidth = 28;
  var radius = 110;

  for (var i = 0; i < panelCount; i++) {
    var angle = (360 / panelCount) * i;

    var panel = document.createElement('div');
    panel.className = 'can-panel';
    panel.style.width = panelWidth + 'px';
    panel.style.transform = 'rotateY(' + angle + 'deg) translateZ(' + radius + 'px)';

    var bg = document.createElement('div');
    bg.className = 'label-bg';

    if (imageUrl) {
      bg.style.backgroundImage = 'url(' + imageUrl + ')';
      bg.style.backgroundSize = (panelCount * 100) + '% 100%';
      bg.style.backgroundPosition = ((i / (panelCount - 1)) * 100) + '% 50%';
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
    cylinder.appendChild(panel);
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

  for (var idx = 0; idx < products.length; idxg': 'linear-gradient(135deg, #0a3d2e, #0d2847, #0a0a2e)',
        'p': 'linear-gradient(135deg, #2a0a4e, #1a0a3e, #0d0a2e)',
        'o': 'linear-gradient(135deg, #2a1500, #1a0a0a, #0d0a0a)',
        'c': 'linear-gradient(135deg, #0a2a3e, #0a1a2e, #0a0a1e)',
        'v': 'linear-gradient(135deg, #2a1a4e, #1a0a2e, #0d0a1e)'
      };
      var grad = gradients[p.accent] || gradients['g'];
      imgHtml = '<div class="placeholder-can" style="background: ' + grad + '; color: var(--neon);">' + p.name + '</div>';
    }

    var card = document.createElement('article');
    card.className = 'rel-card reveal';
    card.setAttribute('data-accent', p.accent);
    card.setAttribute('data-status', p.status);
    card.style.transitionDelay = (idx * 0.08) + 's';

    card.innerHTML =
      '<div class="rel-badge ' + badgeClass + '">' +
        '<span class="badge-dot-sm"></span>' + badgeText +
      '</div>' +
      '<div class="rel-card-can">' + imgHtml + '</div>' +
      '<div class="rel-card-info">' +
        '<h3>' + p.name.toUpperCase() + '</h3>' +
        '<div class="rel-style">' + p.style + '</div>' +
        '<p class="rel-desc">' + p.desc + '</p>' +
        '<div class="rel-meta">' +
          '<span>' + p.abv + '% ABV</span>' +
          '<span>IBU ' + p.ibu + '</span>' +
          '<span>' + p.vol + 'ml</span>' +
        '</div>' +
        buyBtn +
      '</div>';

    grid.appendChild(card);
  }

  observeReveal();
}

function addToCart(id) {
  var p = null;
  for (var i = 0; i < imgHtml = '<img src="' + p.img + '"++) {
    var p = products[idx];
    if (filter !== 'all' && p.status !== filter) continue;

    var badgeClass = p.status === 'upcoming' ? 'up' : p.status === 'current' ? 'cr' : 'sd';
    var badgeText = p.status === 'upcoming' ? 'Coming Soon' : p.status === 'current' ? 'Available Now' : 'Sold Out';

    var buyBtn = '';
    if (p.status === 'current') {
      buyBtn = '<button class="btn-buy" onclick="addToCart(' + p.id + ')">Add to Cart — ' + p.price + 'K VND</button>';
    } else if (p.status === 'past') {
      buyBtn = '<button class="btn-buy sold-out" disabled>Sold Out</button>';
    }

    var imgHtml = '';
    if (p.img) {
      alt="' + p.name + ' — ' + p.style + ' craft beer" loading="lazy" width="200" height="350">';
    } else {
      var gradients = {
        ' OUT!', 'info');
    renderReleases(document.querySelector('.filter-btn.active').getAttribute('data-filter'));
  }
}

function updateCartCount() {
  var count = 0;
  for (var i = 0; i < cart.length; i++) count += cart[i].qty;
  var el = document.getElementById('cartCount');
  if (el) {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  }
}


/* =============================================
   CHECKOUT MODAL
   ============================================= */
function openCheckout() {
  renderCart();
  document.getElementById('checkoutModal').classList.add('open');
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
}

function renderCart() {
  var cartItems = document.getElementById('cartItems');
  var cartEmpty = document.getElementById('cartEmpty');
  var cartContent = document.getElementById('cartContent');

  if (!cartItems) return;

  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.style.display = 'block';
    if (cartContent) cartContent.style.display = 'none';
    return;
  }

  if (cartEmpty) cartEmpty.style.display = 'none';
  if (cartContent) cartContent.style.display = 'block';

  cartItems.innerHTML = '';
  var subtotal = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    var row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML =
      '<div class="cart-item-info">' +
        '<div class="cart-item-name">' + item.name + '</div>' +
        '<div class="cart-item-price">' + item.price + 'K x ' + item.qty + ' = ' + itemTotal + 'K VND</div>' +
      '</div>' +
      '<div class="cart-item-qty">' +
        '<button class="qty-btn" onclick="changeQty(' + i + ', -1)">−</button>' +
        '<span>' + item.qty + '</span>' +
        '<button class="qty-btn" onclick="changeQty(' + i + ', 1)"> products.length; i++) {
    if (products[i].id === id) { p = products[i]; break; }
  }
  if (!p || p.stock <= 0) return;

  // Check if already in cart
  var cartItem = null;
  for (var j = 0; j < cart.length; j++) {
    if (cart[j].id === id) { cartItem = cart[j]; break; }
  }

  if (cartItem) {
    if (cartItem.qty >= p.stock) {
      showToast('Maximum stock reached', 'info');
      return;
    }
    cartItem.qty++;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, qty: 1, img: p.img, accent: p.accent });
  }

  updateCartCount();
  showToast(p.name + ' added to cart!', 'success');

  // Check sold out threshold
  p.stock--;
  if (p.soldOutAt > 0 && p.stock <= p.soldOutAt) {
    p.status = 'past';
    showToast(p.name + ' is now SOLD+</button>' +
      '</div>' +
      '<button class="cart-item-remove" onclick="removeFromCart(' + i + ')">✕</button>';
    cartItems.appendChild(row);
  }

  var shipping = subtotal >= 1000 ? 0 : 50;
  var total = subtotal + shipping;

  document.getElementById('cartSubtotal').textContent = subtotal + 'K VND';
  document.getElementById('cartShipping').textContent = shipping === 0 ? 'FREE' : shipping + 'K VND';
  document.getElementById('cartTotal').textContent = total + 'K VND';
}

function changeQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
  }
  updateCartCount();
  renderCart();
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  updateCartCount();
  renderCart();
}

function goToCheckoutStep(step) {
  document.querySelectorAll('.checkout-step').forEach(function(el) { el.classList.remove('active'); });
  document.getElementById('step' + step).classList.add('active');

  document.querySelectorAll('.checkout-nav-btn').forEach(function(el) { el.classList.remove('active'); });
  document.querySelector('[data-step="' + step + '"]').classList.add('active');

  if (step === 3) {
    renderOrderSummary();
  }
}

function renderOrderSummary() {
  var summary = document.getElementById('orderSummary');
  if (!summary) return;

  var name = document.getElementById('shipName') ? document.getElementById('shipName').value : '';
  var phone = document.getElementById('shipPhone') ? document.getElementById('shipPhone').value : '';
  var address = document.getElementById('shipAddress') ? document.getElementById('shipAddress').value : '';
  var district = document.getElementById('shipDistrict') ? document.getElementById('shipDistrict').value : '';
  var city = document.getElementById('shipCity') ? document.getElementById('shipCity').value : '';

  var subtotal = 0;
  var itemsHtml = '';
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    itemsHtml += '<div style="display:flex;justify-content:space-between;padding:.3rem 0;font-size:.82rem"><span>' + item.name + ' × ' + item.qty + '</span><span>' + itemTotal + 'K</span></div>';
  }

  var shipping = subtotal >= 1000 ? 0 : 50;
  var total = subtotal + shipping;

  summary.innerHTML =
    '<div style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid var(--border)">' +
      '<h4 style="font-size:.85rem;margin-bottom:.5rem;color:var(--neon)">Items</h4>' +
      itemsHtml +
    '</div>' +
    '<div style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid var(--border)">' +
      '<h4 style="font-size:.85rem;margin-bottom:.5rem;color:var(--neon)">Shipping To</h4>' +
      '<div style="font-size:.82rem;color:var(--txt2);line-height:1.8">' +
        (name || '—') + '<br>' +
        (phone || '') + '<br>' +
        (address || '') + (district ? ', ' + district : '') + (city ? ', ' + city : '') +
      '</div>' +
    '</div>' +
    '<div style="display:flex;justify-content:space-between;padding:.3rem 0;font-size:.82rem"><span>Subtotal</span><span>' + subtotal + 'K VND</span></div>' +
    '<div style="display:flex;justify-content:space-between;padding:.3rem 0;font-size:.82rem"><span>Shipping</span><span>' + (shipping === 0 ? 'FREE' : shipping + 'K VND') + '</span></div>' +
    '<div style="display:flex;justify-content:space-between;padding:.5rem 0;font-size:1rem;font-weight:700;border-top:1px solid var(--border);margin-top:.5rem"><span>Total</span><span style="color:var(--neon)">' + total + 'K VND</span></div>';
}

function placeOrder() {
  // Validate
  var name = document.getElementById('shipName') ? document.getElementById('shipName').value : '';
  var phone = document.getElementById('shipPhone') ? document.getElementById('shipPhone').value : '';
  var address = document.getElementById('shipAddress') ? document.getElementById('shipAddress').value : '';

  if (!name || !phone || !address) {
    showToast('Please fill in all shipping fields', 'error');
    return;
  }

  // Generate order ID
  var orderId = 'CW-' + Math.floor(1000 + Math.random() * 9000);

  // Show confirmation
  document.getElementById('orderIdDisplay').textContent = '#' + orderId;
  goToCheckoutStep(4);

  // Send email notification (see email section below)
  sendOrderEmail(orderId);

  // Clear cart
  cart = [];
  updateCartCount();
}

function sendOrderEmail(orderId) {
  // Collect order data
  var orderData = {
    orderId: orderId,
    customer: document.getElementById('shipName') ? document.getElementById('shipName').value : '',
    phone: document.getElementById('shipPhone') ? document.getElementById('shipPhone').value : '',
    email: document.getElementById('shipEmail') ? document.getElementById('shipEmail').value : '',
    address: document.getElementById('shipAddress') ? document.getElementById('shipAddress').value : '',
    district: document.getElementById('shipDistrict') ? document.getElementById('shipDistrict').value : '',
    city: document.getElementById('shipCity') ? document.getElementById('shipCity').value : '',
    note: document.getElementById('orderNote') ? document.getElementById('orderNote').value : '',
    items: cart,
    total: 0
  };

  for (var i = 0; i < cart.length; i++) {
    orderData.total += cart[i].price * cart[i].qty;
  }

  // Log for now — replace with actual email service
  console.log('ORDER PLACED:', orderData);

  // If using Formspree, uncomment below:
  /*
  fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  */
}


/* =============================================
   TOAST NOTIFICATIONS
   ============================================= */
function showToast(message, type) {
  type = type || 'info';
  var container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;display:flex;flex-direction:column;gap:.5rem';
    document.body.appendChild(container);
  }

  var toast = document.createElement('div');
  toast.style.cssText = 'padding:.8rem 1.2rem;background:var(--bg-card,#111);border:1px solid var(--border,#2a2a38);border-radius:10px;font-size:.82rem;color:var(--txt,#f0f0f5);box-shadow:0 10px 30px rgba(0,0,0,.4);animation:toastIn .3s ease forwards;display:flex;align-items:center;gap:.5rem;max-width:320px';

  if (type === 'success') toast.style.borderLeft = '3px solid #39ff14';
  else if (type === 'error') toast.style.borderLeft = '3px solid #ff3b3b';
  else toast.style.borderLeft = '3px solid #00d4ff';

  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(function() {
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(function() { toast.remove(); }, 300);
  }, 3000);
}


/* =============================================
   SCROLL REVEAL
   ============================================= */
function observeReveal() {
  if (!('IntersectionObserver' in window)) {
    var els = document.querySelectorAll('.reveal');
    for (var i = 0; i < els.length; i++) els[i].classList.add('visible');
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  var revealEls = document.querySelectorAll('.reveal');
  for (var j = 0; j < revealEls.length; j++) {
    observer.observe(revealEls[j]);
  }
}


/* =============================================
   SMOOTH SCROLL
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});


/* =============================================
   3D CAN MOUSE TILT
   ============================================= */
var canArea = document.querySelector('.hero-can-area');
if (canArea) {
  canArea.addEventListener('mousemove', function(e) {
    var rect = canArea.getBoundingClientRect();
    var x = ( <link href="e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;
    var canFloat = document.getElementById('canFloat');
    if (canFloat) {
      canFloat.style.transform = 'translateY(-9px) rotateY(' + (x * 20) + 'deg) rotateX(' + (-y * 12) + 'deg)';
    }
  });

  canArea.addEventListener('mouseleave', function() {
    var canFloat = document.getElementById('canFloat');
    if (canFloat) {
      canFloat.style.transform = '';
    }
  });
}


/* =============================================
   INIT
   ============================================= */
renderReleases();
observeReveal();
