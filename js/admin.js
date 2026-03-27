/* =============================================
   DATA STORE
   ============================================= */
var LABEL_IMAGE = 'img/teddy-hopper-front.png';

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
    desc: 'Our debut release. Packed with Amarillo, Centennial, Chinook, Columbus & Simcoe hops. A psychedelic explosion of tropical fruit, citrus, and pine.',
    accent: 'g',
    img: LABEL_IMAGE,
    date: '2026-03-01'
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
    img: '',
    date: '2026-04-15'
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
    img: '',
    date: '2026-06-01'
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
    img: '',
    date: '2025-12-01'
  }
];

var orders = [
  { id: 'CW-1287', customer: 'Nguyen Le', email: 'nguyen@email.com', phone: '+84 901 234 567', items: 'Teddy Hopper × 6', total: 1254, status: 'delivered', date: '2026-03-20' },
  { id: 'CW-1286', customer: 'Tran Minh', email: 'tranm@email.com', phone: '+84 902 345 678', items: 'Teddy Hopper × 4', total: 876, status: 'shipped', date: '2026-03-25' },
  { id: 'CW-1285', customer: 'Le Hoang', email: 'leh@email.com', phone: '+84 903 456 789', items: 'Teddy Hopper × 12', total: 2388, status: 'processing', date: '2026-03-26' },
  { id: 'CW-1284', customer: 'Pham Anh', email: 'phama@email.com', phone: '+84 904 567 890', items: 'Teddy Hopper × 2', total: 438, status: 'pending', date: '2026-03-27' },
  { id: 'CW-1283', customer: 'Vo Thanh', email: 'voth@email.com', phone: '+84 905 678 901', items: 'Teddy Hopper × 8', total: 1672, status: 'delivered', date: '2026-03-18' },
  { id: 'CW-1282', customer: 'Hoang Nam', email: 'hoangn@email.com', phone: '+84 906 789 012', items: 'Teddy Hopper × 3', total: 657, status: 'delivered', date: '2026-03-15' },
  { id: 'CW-1281', customer: 'Doan Trang', email: 'doant@email.com', phone: '+84 907 890 123', items: 'Teddy Hopper × 6', total: 1254, status: 'shipped', date: '2026-03-24' },
  { id: 'CW-1280', customer: 'Bui Khoa', email: 'buik@email.com', phone: '+84 908 901 234', items: 'Teddy Hopper × 1', total: 219, status: 'cancelled', date: '2026-03-22' }
];

var members = [
  { name: 'Nguyen Le', email: 'nguyen@email.com', phone: '+84 901 234 567', tier: 'dank', points: 780, orders: 8, joined: '2025-08-15', address: 'Q1, HCMC' },
  { name: 'Tran Minh', email: 'tranm@email.com', phone: '+84 902 345 678', tier: 'master', points: 2340, orders: 15, joined: '2025-06-01', address: 'Q3, HCMC' },
  { name: 'Le Hoang', email: 'leh@email.com', phone: '+84 903 456 789', tier: 'dank', points: 1200, orders: 6, joined: '2025-10-20', address: 'Hanoi' },
  { name: 'Pham Anh', email: 'phama@email.com', phone: '+84 904 567 890', tier: 'hopper', points: 220, orders: 2, joined: '2026-01-10', address: 'Da Nang' },
  { name: 'Vo Thanh', email: 'voth@email.com', phone: '+84 905 678 901', tier: 'dank', points: 950, orders: 7, joined: '2025-09-05', address: 'Q2, HCMC' },
  { name: 'Hoang Nam', email: 'hoangn@email.com', phone: '+84 906 789 012', tier: 'hopper', points: 410, orders: 3, joined: '2025-12-12', address: 'Binh Thanh, HCMC' },
  { name: 'Doan Trang', email: 'doant@email.com', phone: '+84 907 890 123', tier: 'master', points: 3100, orders: 22, joined: '2025-04-20', address: 'Q7, HCMC' },
  { name: 'Bui Khoa', email: 'buik@email.com', phone: '+84 908 901 234', tier: 'hopper', points: 110, orders: 1, joined: '2026-02-28', address: 'Thu Duc, HCMC' }
];

var presales = [
  { id: 1, product: 'Neon Lotus', date: '2026-04-15', start: '2026-04-01T10:00', end: '2026-04-14T23:59', alloc: 500, maxPer: 12, access: 'members', tier: 'any', notes: 'Lychee sour launch — spring release', active: true },
  { id: 2, product: 'Midnight Phở', date: '2026-06-01', start: '2026-05-15T10:00', end: '2026-05-31T23:59', alloc: 400, maxPer: 6, access: 'members', tier: 'dank', notes: 'Stout season — Dank Finder+ early access', active: false }
];

var nextProductId = 5;
var nextPresaleId = 3;
var editingProductIndex = -1;


/* =============================================
   TAB NAVIGATION
   ============================================= */
function switchTab(tabId, el) {
  // Update nav
  document.querySelectorAll('.nav-item').forEach(function(item) {
    item.classList.remove('active');
  });
  if (el) el.classList.add('active');

  // Update content
  document.querySelectorAll('.tab-content').forEach(function(section) {
    section.classList.remove('active');
  });
  document.getElementById('tab-' + tabId).classList.add('active');

  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');

  // Render tab-specific content
  switch (tabId) {
    case 'dashboard': renderDashboard(); break;
    case 'orders': renderOrders(); break;
    case 'products': renderProducts(); break;
    case 'presale': renderPresales(); break;
    case 'members': renderMembers(); break;
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}


/* =============================================
   TOAST NOTIFICATIONS
   ============================================= */
function showToast(message, type) {
  type = type || 'success';
  var container = document.getElementById('toastContainer');
  var toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = message;
  container.appendChild(toast);

  setTimeout(function() {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(function() { toast.remove(); }, 300);
  }, 3000);
}


/* =============================================
   DASHBOARD
   ============================================= */
function renderDashboard() {
  // Calculate stats
  var totalRevenue = 0;
  var activeStock = 0;
  orders.forEach(function(o) {
    if (o.status !== 'cancelled') totalRevenue += o.total;
  });
  products.forEach(function(p) {
    if (p.status === 'current') activeStock += p.stock;
  });

  document.getElementById('statOrders').textContent = orders.length;
  document.getElementById('statRevenue').textContent = '₫' + (totalRevenue / 1000).toFixed(1) + 'M';
  document.getElementById('statMembers').textContent = members.length.toLocaleString();
  document.getElementById('statStock').textContent = activeStock;

  // Recent orders table
  var dashOrders = document.getElementById('dashOrders');
  dashOrders.innerHTML = '';
  orders.slice(0, 5).forEach(function(o) {
    dashOrders.innerHTML +=
      '<tr>' +
        '<td class="cell-name">#' + o.id + '</td>' +
        '<td>' + o.customer + '</td>' +
        '<td>' + o.items + '</td>' +
        '<td style="color:var(--neon)">₫' + o.total + 'K</td>' +
        '<td><span class="badge badge-' + o.status + '">' + o.status + '</span></td>' +
      '</tr>';
  });

  // Stock levels
  var dashStock = document.getElementById('dashStock');
  dashStock.innerHTML = '';
  products.forEach(function(p) {
    var pct = p.stock > 0 ? Math.min(100, (p.stock / 500) * 100) : 0;
    var color = pct > 50 ? 'var(--neon)' : pct > 20 ? 'var(--yellow)' : 'var(--red)';
    dashStock.innerHTML +=
      '<div style="margin-bottom:1rem">' +
        '<div style="display:flex;justify-content:space-between;font-size:.78rem;margin-bottom:.3rem">' +
          '<span>' + p.name + '</span>' +
          '<span style="color:' + color + ';font-weight:600">' + p.stock + ' cans</span>' +
        '</div>' +
        '<div class="stock-bar"><div class="stock-fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
      '</div>';
  });
}


/* =============================================
   ORDERS
   ============================================= */
function renderOrders() {
  var filter = document.getElementById('orderFilter').value;
  var search = document.getElementById('orderSearch').value.toLowerCase();

  var filtered = orders.filter(function(o) {
    var matchStatus = filter === 'all' || o.status === filter;
    var matchSearch = !search ||
      o.id.toLowerCase().indexOf(search) >= 0 ||
      o.customer.toLowerCase().indexOf(search) >= 0 ||
      o.email.toLowerCase().indexOf(search) >= 0;
    return matchStatus && matchSearch;
  });

  var body = document.getElementById('ordersBody');
  body.innerHTML = '';

  filtered.forEach(function(o) {
    body.innerHTML +=
      '<tr>' +
        '<td class="cell-name">#' + o.id + '</td>' +
        '<td>' + o.customer + '</td>' +
        '<td style="font-size:.75rem">' + o.email + '</td>' +
        '<td style="font-size:.75rem">' + o.phone + '</td>' +
        '<td>' + o.items + '</td>' +
        '<td style="color:var(--neon);font-weight:600">₫' + o.total + 'K</td>' +
        '<td><span class="badge badge-' + o.status + '">' + o.status + '</span></td>' +
        '<td>' + o.date + '</td>' +
        '<td>' +
          '<div class="actions-cell">' +
            '<select class="input-select" style="padding:.2rem .4rem;font-size:.65rem;width:auto" onchange="updateOrderStatus(\'' + o.id + '\', this.value)">' +
              '<option value="pending"' + (o.status === 'pending' ? ' selected' : '') + '>Pending</option>' +
              '<option value="processing"' + (o.status === 'processing' ? ' selected' : '') + '>Processing</option>' +
              '<option value="shipped"' + (o.status === 'shipped' ? ' selected' : '') + '>Shipped</option>' +
              '<option value="delivered"' + (o.status === 'delivered' ? ' selected' : '') + '>Delivered</option>' +
              '<option value="cancelled"' + (o.status === 'cancelled' ? ' selected' : '') + '>Cancelled</option>' +
            '</select>' +
          '</div>' +
        '</td>' +
      '</tr>';
  });

  document.getElementById('ordersFooter').textContent = 'Showing ' + filtered.length + ' of ' + orders.length + ' orders';
}

function updateOrderStatus(orderId, newStatus) {
  var order = orders.find(function(o) { return o.id === orderId; });
  if (order) {
    order.status = newStatus;
    showToast('Order #' + orderId + ' → ' + newStatus, 'success');
    renderOrders();
  }
}


/* =============================================
   PRODUCTS
   ============================================= */
function renderProducts() {
  var grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  products.forEach(function(p, idx) {
    var statusClass = p.status === 'current' ? 'badge-current' : p.status === 'upcoming' ? 'badge-upcoming' : 'badge-past';
    var statusText = p.status === 'current' ? 'Available' : p.status === 'upcoming' ? 'Upcoming' : 'Past';
    var stockPct = p.stock > 0 ? Math.min(100, (p.stock / 500) * 100) : 0;
    var stockColor = stockPct > 50 ? 'var(--neon)' : stockPct > 20 ? 'var(--yellow)' : 'var(--red)';

    var imgHtml = '';
    if (p.img) {
      imgHtml = '<img src="' + p.img + '" alt="' + p.name + '">';
    } else {
      imgHtml = '<span class="no-img">' + p.name + '</span>';
    }

    var card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML =
      '<div class="product-card-img">' +
        imgHtml +
        '<div class="product-card-status"><span class="badge ' + statusClass + '">' + statusText + '</span></div>' +
      '</div>' +
      '<div class="product-card-body">' +
        '<div class="product-card-name">' + p.name + '</div>' +
        '<div class="product-card-style">' + p.style + ' — ' + p.abv + '% ABV — ' + p.vol + 'ml</div>' +
        '<p class="product-card-desc">' + p.desc + '</p>' +
        '<div class="product-card-meta">' +
          '<span>Price: <strong style="color:var(--neon)">₫' + p.price + 'K</strong></span>' +
          '<span>Stock: <strong style="color:' + stockColor + '">' + p.stock + '</strong> / 500</span>' +
        '</div>' +
        '<div class="stock-bar"><div class="stock-fill" style="width:' + stockPct + '%;background:' + stockColor + '"></div></div>' +
        '<div class="product-card-actions">' +
          '<button class="btn btn-ghost btn-sm" onclick="editProduct(' + idx + ')">✏️ Edit</button>' +
          '<button class="btn btn-ghost btn-sm" onclick="toggleProductStatus(' + idx + ')">' +
            (p.status === 'current' ? '⏸ Retire' : '▶ Activate') +
          '</button>' +
          '<button class="btn btn-danger btn-sm" onclick="deleteProduct(' + idx + ')">🗑</button>' +
        '</div>' +
      '</div>';

    grid.appendChild(card);
  });
}

function toggleProductStatus(idx) {
  products[idx].status = products[idx].status === 'current' ? 'past' : 'current';
  showToast(products[idx].name + ' status updated', 'success');
  renderProducts();
}

function deleteProduct(idx) {
  if (confirm('Delete ' + products[idx].name + '?')) {
    products.splice(idx, 1);
    showToast('Product deleted', 'info');
    renderProducts();
  }
}

function openProductModal() {
  editingProductIndex = -1;
  document.getElementById('productModalTitle').textContent = 'New Product';
  ['pName', 'pStyle', 'pAbv', 'pIbu', 'pVol', 'pPrice', 'pStock', 'pSoldOut', 'pDesc', 'pDate'].forEach(function(id) {
    document.getElementById(id).value = '';
  });
  document.getElementById('pStatus').value = 'upcoming';
  document.getElementById('uploadPreview').classList.remove('active');
  document.getElementById('productModal').classList.add('open');
}

function editProduct(idx) {
  editingProductIndex = idx;
  var p = products[idx];
  document.getElementById('productModalTitle').textContent = 'Edit: ' + p.name;
  document.getElementById('pName').value = p.name;
  document.getElementById('pStyle').value = p.style;
  document.getElementById('pAbv').value = p.abv;
  document.getElementById('pIbu').value = p.ibu;
  document.getElementById('pVol').value = p.vol;
  document.getElementById('pPrice').value = p.price;
  document.getElementById('pStock').value = p.stock;
  document.getElementById('pSoldOut').value = p.soldOutAt;
  document.getElementById('pDesc').value = p.desc;
  document.getElementById('pStatus').value = p.status;
  document.getElementById('pDate').value = p.date || '';

  if (p.img) {
    document.getElementById('uploadPreview').classList.add('active');
    document.getElementById('previewImg').src = p.img;
  } else {
    document.getElementById('uploadPreview').classList.remove('active');
  }

  document.getElementById('productModal').classList.add('open');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
}

function handleFileUpload(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('uploadPreview').classList.add('active');
      document.getElementById('previewImg').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function removeUpload() {
  document.getElementById('uploadPreview').classList.remove('active');
  document.getElementById('fileInput').value = '';
}

function saveProduct() {
  var data = {
    name: document.getElementById('pName').value || 'New Beer',
    style: document.getElementById('pStyle').value || 'Craft Beer',
    abv: document.getElementById('pAbv').value || '5.0',
    ibu: document.getElementById('pIbu').value || '0',
    vol: document.getElementById('pVol').value || '330',
    price: parseInt(document.getElementById('pPrice').value) || 199,
    stock: parseInt(document.getElementById('pStock').value) || 0,
    soldOutAt: parseInt(document.getElementById('pSoldOut').value) || 0,
    desc: document.getElementById('pDesc').value || 'A new craft beer from Clone Waters.',
    status: document.getElementById('pStatus').value,
    date: document.getElementById('pDate').value || new Date().toISOString().split('T')[0],
    img: document.getElementById('previewImg') ? document.getElementById('previewImg').src : '',
    accent: ['g', 'p', 'o', 'c', 'v'][Math.floor(Math.random() * 5)]
  };

  // Don't save if img is the default placeholder
  if (data.img.indexOf('data:') < 0 && data.img.indexOf('http') < 0) {
    data.img = '';
  }

  if (editingProductIndex >= 0) {
    data.id = products[editingProductIndex].id;
    products[editingProductIndex] = data;
    showToast(data.name + ' updated', 'success');
  } else {
    data.id = nextProductId++;
    products.push(data);
    showToast(data.name + ' created', 'success');
  }

  closeProductModal();
  renderProducts();
}


/* =============================================
   PRESALE
   ============================================= */
function renderPresales() {
  var list = document.getElementById('presaleList');
  list.innerHTML = '';

  // Populate product dropdown
  var psProduct = document.getElementById('psProduct');
  if (psProduct) {
    psProduct.innerHTML = '';
    products.filter(function(p) { return p.status === 'upcoming'; }).forEach(function(p) {
      psProduct.innerHTML += '<option value="' + p.name + '">' + p.name + '</option>';
    });
    if (psProduct.innerHTML === '') {
      psProduct.innerHTML = '<option value="">No upcoming products</option>';
    }
  }

  presales.forEach(function(ps, idx) {
    var card = document.createElement('div');
    card.className = 'presale-card' + (ps.active ? ' active' : '');
    card.innerHTML =
      '<div>' +
        '<div class="presale-title">' + ps.product + '</div>' +
        '<div class="presale-meta">' +
          '<strong>Release:</strong> ' + ps.date + ' &nbsp;|&nbsp; ' +
          '<strong>Allocation:</strong> ' + ps.alloc + ' cans &nbsp;|&nbsp; ' +
          '<strong>Max/member:</strong> ' + ps.maxPer + '<br>' +
          '<strong>Presale window:</strong> ' + ps.start + ' → ' + ps.end + '<br>' +
          '<strong>Access:</strong> ' + (ps.access === 'members' ? '🔒 Members Only' : '🌐 Public') +
          (ps.tier !== 'any' ? ' — ' + ps.tier.charAt(0).toUpperCase() + ps.tier.slice(1) + '+' : '') +
          (ps.notes ? '<div class="presale-notes">' + ps.notes + '</div>' : '') +
        '</div>' +
      '</div>' +
      '<div class="presale-actions">' +
        '<div class="presale-status">' +
          '<span style="color:' + (ps.active ? 'var(--neon)' : 'var(--txt3)') + '">' +
            (ps.active ? '🟢 Active' : '⚪ Inactive') +
          '</span>' +
        '</div>' +
        '<button class="btn btn-ghost btn-sm" onclick="togglePresale(' + idx + ')">' +
          (ps.active ? 'Deactivate' : 'Activate') +
        '</button>' +
        '<button class="btn btn-danger btn-sm" onclick="deletePresale(' + idx + ')">Delete</button>' +
      '</div>';

    list.appendChild(card);
  });

  if (presales.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--txt3)">No presales configured. Click "+ New Presale" to create one.</div>';
  }
}

function togglePresale(idx) {
  presales[idx].active = !presales[idx].active;
  showToast(presales[idx].product + ' presale ' + (presales[idx].active ? 'activated' : 'deactivated'), 'success');
  renderPresales();
}

function deletePresale(idx) {
  if (confirm('Delete presale for ' + presales[idx].product + '?')) {
    presales.splice(idx, 1);
    showToast('Presale deleted', 'info');
    renderPresales();
  }
}

function openPresaleModal() {
  renderPresales(); // refresh dropdown
  document.getElementById('psDate').value = '';
  document.getElementById('psStart').value = '';
  document.getElementById('psEnd').value = '';
  document.getElementById('psAlloc').value = '';
  document.getElementById('psMax').value = '';
  document.getElementById('psAccess').value = 'public';
  document.getElementById('psTier').value = 'any';
  document.getElementById('psNotes').value = '';
  document.getElementById('presaleModal').classList.add('open');
}

function closePresaleModal() {
  document.getElementById('presaleModal').classList.remove('open');
}

function savePresale() {
  presales.push({
    id: nextPresaleId++,
    product: document.getElementById('psProduct').value || 'TBD',
    date: document.getElementById('psDate').value || '2026-05-01',
    start: document.getElementById('psStart').value || '2026-04-15T10:00',
    end: document.getElementById('psEnd').value || '2026-04-30T23:59',
    alloc: parseInt(document.getElementById('psAlloc').value) || 500,
    maxPer: parseInt(document.getElementById('psMax').value) || 12,
    access: document.getElementById('psAccess').value,
    tier: document.getElementById('psTier').value,
    notes: document.getElementById('psNotes').value || '',
    active: false
  });

  closePresaleModal();
  showToast('Presale created', 'success');
  renderPresales();
}


/* =============================================
   MEMBERS
   ============================================= */
function renderMembers() {
  var filter = document.getElementById('memberFilter').value;
  var search = document.getElementById('memberSearch').value.toLowerCase();

  var filtered = members.filter(function(m) {
    var matchTier = filter === 'all' || m.tier === filter;
    var matchSearch = !search ||
      m.name.toLowerCase().indexOf(search) >= 0 ||
      m.email.toLowerCase().indexOf(search) >= 0;
    return matchTier && matchSearch;
  });

  var tierLabels = { hopper: 'Hopper', dank: 'Dank Finder', master: 'Brew Master' };
  var tierClasses = { hopper: 'badge-hopper', dank: 'badge-dank', master: 'badge-master' };

  var body = document.getElementById('membersBody');
  body.innerHTML = '';

  filtered.forEach(function(m, displayIdx) {
    var realIdx = members.indexOf(m);
    body.innerHTML +=
      '<tr>' +
        '<td class="cell-name">' + m.name + '</td>' +
        '<td style="font-size:.75rem">' + m.email + '</td>' +
        '<td style="font-size:.75rem">' + m.phone + '</td>' +
        '<td><span class="badge ' + tierClasses[m.tier] + '">' + tierLabels[m.tier] + '</span></td>' +
        '<td style="color:var(--neon);font-weight:700">' + m.points.toLocaleString() + '</td>' +
        '<td>' + m.orders + '</td>' +
        '<td>' + m.joined + '</td>' +
        '<td>' +
          '<div class="actions-cell">' +
            '<button class="btn btn-icon btn-ghost" onclick="viewMember(' + realIdx + ')" title="View">👤</button>' +
            '<button class="btn btn-icon btn-ghost" onclick="adjustPoints(' + realIdx + ', 100)" title="+100 pts">⬆</button>' +
            '<button class="btn btn-icon btn-ghost" onclick="adjustPoints(' + realIdx + ', -100)" title="-100 pts">⬇</button>' +
          '</div>' +
        '</td>' +
      '</tr>';
  });
}

function adjustPoints(idx, amount) {
  members[idx].points = Math.max(0, members[idx].points + amount);

  // Auto-upgrade tier
  if (members[idx].points >= 2000) {
    members[idx].tier = 'master';
  } else if (members[idx].points >= 500) {
    members[idx].tier = 'dank';
  } else {
    members[idx].tier = 'hopper';
  }

  var action = amount > 0 ? 'Awarded' : 'Deducted';
  showToast(action + ' ' + Math.abs(amount) + ' points for ' + members[idx].name, 'success');
  renderMembers();
}

function viewMember(idx) {
  var m = members[idx];
  var tierLabels = { hopper: 'Hopper', dank: 'Dank Finder', master: 'Brew Master' };
  var tierClasses = { hopper: 'badge-hopper', dank: 'badge-dank', master: 'badge-master' };

  document.getElementById('memberModalTitle').textContent = m.name;

  document.getElementById('memberModalBody').innerHTML =
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin-bottom:1.5rem">' +
      '<div style="background:var(--surface);border-radius:10px;padding:1rem;text-align:center">' +
        '<div style="font-family:var(--ff-display);font-size:1.8rem;color:var(--neon)">' + m.points.toLocaleString() + '</div>' +
        '<div style="font-size:.65rem;color:var(--txt3);text-transform:uppercase;letter-spacing:.1em">Points</div>' +
      '</div>' +
      '<div style="background:var(--surface);border-radius:10px;padding:1rem;text-align:center">' +
        '<div style="font-family:var(--ff-display);font-size:1.8rem;color:var(--cyan)">' + m.orders + '</div>' +
        '<div style="font-size:.65rem;color:var(--txt3);text-transform:uppercase;letter-spacing:.1em">Orders</div>' +
      '</div>' +
    '</div>' +
    '<div style="font-size:.82rem;line-height:2">' +
      '<div><strong style="color:var(--txt3);width:80px;display:inline-block">Tier</strong> <span class="badge ' + tierClasses[m.tier] + '">' + tierLabels[m.tier] + '</span></div>' +
      '<div><strong style="color:var(--txt3);width:80px;display:inline-block">Email</strong> ' + m.email + '</div>' +
      '<div><strong style="color:var(--txt3);width:80px;display:inline-block">Phone</strong> ' + m.phone + '</div>' +
      '<div><strong style="color:var(--txt3);width:80px;display:inline-block">Address</strong> ' + m.address + '</div>' +
      '<div><strong style="color:var(--txt3);width:80px;display:inline-block">Joined</strong> ' + m.joined + '</div>' +
    '</div>';

  document.getElementById('memberModalFooter').innerHTML =
    '<button class="btn btn-ghost" onclick="closeMemberModal()">Close</button>' +
    '<button class="btn btn-primary" onclick="adjustPoints(' + idx + ', 100); closeMemberModal()">Award 100 Points</button>' +
    '<button class="btn btn-danger" onclick="adjustPoints(' + idx + ', -100); closeMemberModal()">Deduct 100 Points</button>';

  document.getElementById('memberModal').classList.add('open');
}

function closeMemberModal() {
  document.getElementById('memberModal').classList.remove('open');
}


/* =============================================
   CLOSE MODALS ON OVERLAY CLICK
   ============================================= */
document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.classList.remove('open');
    }
  });
});


/* =============================================
   INIT
   ============================================= */
renderDashboard();
