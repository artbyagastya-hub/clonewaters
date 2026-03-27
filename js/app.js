/* =============================================
   DATA
   ============================================= */
const LABEL_IMAGE = 'img/teddy-hopper.png'; // Replace with your actual label image

const products = [
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
    desc: 'Our debut release. Packed with Amarillo, Centennial, Chinook, Columbus & Simcoe hops. A psychedelic explosion of tropical fruit, citrus, and pine.',
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
    desc: 'Tart lychee and dragon fruit sour with a floral lotus finish.',
    accent: 'p',

    img: ''
  },
  {
    id: 3,
    name: 'Midnight Phở',
    style: 'Spiced Stout',
    abv: '6.8',
    ibu: '25',
    vol: '330',
    price: 219,
    stock: 0,
    soldOutAt: 0,
    status: 'upcoming',
    desc: 'Rich chocolate stout brewed with star anise, cinnamon, and a hint of phở spice. Dark as midnight.',
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

let nextProductId = 5;


/* =============================================
   AGE GATE
   ============================================= */
function enterSite() {
  document.getElementById('ageGate').classList.add('hidden');
  localStorage.setItem('cw_age',. Light, refreshing, dangerously drinkable.',
    accent: '1');
}

function leaveSite() {
  window.location.href = 'https://www.google.com';
}

// Auto-verify if already passed
if (localStorage.getItem('cw_age') === '1') {
  document.getElementById('ageGate').classList.add('hidden');
}


/* =============================================
   LANGUAGE TOGGLE
   ============================================= */
function setLang(lang) {
  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  document.querySelector('.lang-btn[onclick="setLang(\'' + lang + '\')"]').classList.add('active');

  document.querySelectorAll('[data-' + lang + ']').forEach(function(el) {
    el.innerHTML = el.getAttribute('data-' + lang);
  });
}


/* =============================================
   NAVIGATION SCROLL
   ============================================= */
window.addEventListener('scroll', function() {
  var nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


/* =============================================
   AUTH (LOGIN / REGISTER)
   ============================================= */
function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(function(t) {
    t.classList.remove('active');
  });
  document.querySelectorAll('.auth-form').forEach(function(f) {
    f.classList.remove('active');
  });

  if (tab === 'login') {
    document.querySelector('.auth-tab:first-child').classList.add('active');
    document.getElementById('loginForm').classList.add('active');
  } else {
    document.querySelector('.auth-tab:last-child').classList.add('active');
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
  document.querySelectorAll('.auth-form').forEach(function(f) { f.reset(); });
  switchTab('login');
}


/* =============================================
   3D CAN BUILD  var cylinder = document.getElementById('canCylinder');
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

    // Label background
    var bg = document.createElement('div');
    bg.className = 'label-bg';

    if (imageUrl) {
      bg.style.backgroundImage = 'url(' + imageUrl + ')';
      bg.style.backgroundSize = (panelCount * 100) + '% 100%';
      bg.style.background
   ============================================= */
function buildCan(imageUrl) {
Position = ((i / (panelCount - 1)) * 100) + '% 50%';
    } else {
      bg.style.background = 'linear-gradient(' + (130 + angle) + 'deg, #0a0a2e 0%, #1a0a3e 20%, #0d2847 35%, #0a3d2e 50%, #0d2847 65%, #1a0a3e 80%, #0a0a2e 100%)';
    }

    // Shine overlay
    var shine = document.createElement('div');
    shine.className = 'shine';

    // Edge lines
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

// Build initial can
buildCan(LABEL_IMAGE);


/* =============================================
   RELEASES RENDERING
   ============================================= */
function renderReleases(filter) {
  filter = filter || 'all';
  var grid = document.getElementById('relGrid');
  grid.innerHTML = '';

  products.forEach(function(p, idx) {
    if (filter !== 'all' && p.status !== filter) return;

    var badgeClass = p.status === 'upcoming' ? 'up' : p.status === 'current' ? 'cr' : 'sd';
    var badgeText = p.status === 'upcoming' ? 'Coming Soon' : p.status === 'current' ? 'Available Now' : 'Sold Out';

    var buyBtn = '';
    if (p.status === 'current') {
      buyBtn = '<button class="btn-buy" onclick="addToCart(' + p.id + ')">Add to Cart — ₫' + p.price + 'K</button>';
    } else if (p.status === 'past') {
      buyBtn = '<button class="btn-buy sold-out" disabled>Sold Out</button>';
    }

    var imgHtml = '';
    if (p.img) {
      imgHtml = '<img src="' + p.img + '" alt="' + p.name + ' — ' + p.style + ' craft beer can" loading="lazy" width="200" height="350">';
    } else {
      var gradColors = {
        'g': '#0a3d2e, #0d2847, #0a0a2e',
        'p': '#2a0a4e, #1a0a3e, #0d0a2e',
        'o': '#2a1500, #1a0a0a, #0d0a0a',
        'c': '#0a2a3e, #0a1a2e, #0a0a1e',
        'v': '#2a1a4e, #1a0a2e, #0d0a1e'
      };
      var colors = gradColors[p.accent] || gradColors['g'];
      imgHtml = '<div class="placeholder-can" style="background: linear-gradient(135deg, ' + colors + '); color: var(--neon);">' + p.name + '</div>';
    }

    var card = document.createElement('article');
    card.className = 'rel-card reveal';
    card.setAttribute('data-accent', p.accent);
    card.setAttribute('data-status', p.status);
    card.style.transitionDelay = (idx * 0.08) + 's';

    card.innerHTML =
      '<div class="rel-badge ' + badgeClass + '">' +
        '<span class="badge-dot-sm"></span>' +
        badgeText +
      '</div>' +
      '<div class="rel-card-can">' +
        imgHtml +
      '</div>' +
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
  });

  // Re-observe new cards
  observeReveal();
}

function addToCart(id) {
  var p = products.find(function(x) { return x.id === id; });
  if (!p || p.stock <= 0) return;

  p.stock--;
  alert(p.name + ' added to cart! (' + p.stock + ' remaining)');

  // Check sold-out threshold
  if (p.soldOutAt > 0 && p.stock <= p.soldOutAt) {
    p.status = 'past';
    alert(p.name + ' is now SOLD OUT!');
    renderReleases(document.querySelector('.filter-btn.active').getAttribute('data-filter'));
  }
}

// Initial render
renderReleases();

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(function(b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
    renderReleases(btn.getAttribute('data-filter'));
  });
});


/* =============================================
   SCROLL REVEAL
   ============================================= */
function observeReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
}

observeReveal();


/* =============================================
   SMOOTH SCROLL
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;

    var canFloat = document.getElementById('canFloat');
    if (canFloat) {
      canFloat.style.transform =
        'translateY(-9px) rotateY(' + (x * 20) + 'deg) rotateX(' + (-y * 12) + 'deg)';
    }
  });

  canArea.addEventListener('mouseleave', function() {
    var canFloat = document.getElementById('canFloat');
    if (canFloat) {
      canFloat.style.transform = '';
    }
  });
}
