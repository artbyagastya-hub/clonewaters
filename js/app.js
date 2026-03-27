/* =============================================
   CAN MOUSE TILT
   ============================================= */
var canArea = document.querySelector('.hero-can-area');
if (canArea) {
  canArea.addEventListener('mousemove', function(e) {
    var rect = canArea.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;
    var cf = document.getElementById('canFloat');
    if (cf) {
      cf.style.transform = 'translateY(-9px) rotateY(' + (x * 20) + 'deg) rotateX(' + (-y * 12) + 'deg)';
    }
  });
  canArea.addEventListener('mouseleave', function() {
    var cf = document.getElementById('canFloat');
    if (cf) {
      cf.style.transform = '';
    }
  });
}


/* =============================================
   EVENT BINDINGS
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
