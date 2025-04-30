document.addEventListener('DOMContentLoaded', () => {
    const logo       = document.getElementById('logo');
    const hamburger  = document.getElementById('hamburger');
    const nav        = document.getElementById('site-nav');
  
    /* Scroll to top when logo clicked */
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    /* Toggle mobile menu */
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
    });
  
    /* Close menu after clicking a link (mobile) */
    nav.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
      })
    );
  });
/* ---------- Smooth-scroll logo ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.getElementById('logo');
  if (logo) {
    logo.addEventListener('click', e => {
      e.preventDefault();                    // don’t follow “#” link
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

/* -------------- PRICE CALCULATOR ------------------ */
document.addEventListener('DOMContentLoaded', () => {
  const form  = document.getElementById('calc-form');
  const out   = document.getElementById('result');

  const basePrice = {          // CZK / m³
    rezivostaveb: 2500,
    rezivotruhlar: 3000,
    prazce:        3200,
    lamely:        3500,
    palety:        2800,
    suseni:         800,
    impregnace:     600
  };

  const typeMult = { smrk:1.00, modrin:1.10, borovice:1.05, dub:1.40, buk:1.30 };
  const gradeMult= { a:1.20,  b:1.10,  c:1.00, d:0.90,  e:0.80 };

  form.addEventListener('submit', e => {
    e.preventDefault();

    const m3      = parseFloat(form.volume.value) || 0;
    const service = form.service.value;
    const wood    = form.woodType.value;
    const grade   = form.grade.value;

    const price = m3 * basePrice[service] * typeMult[wood] * gradeMult[grade];

    out.textContent =
      isFinite(price) && price > 0
        ? `Orientační cena: ${price.toLocaleString('cs-CZ', { style:'currency', currency:'CZK', maximumFractionDigits:0 })}`
        : 'Zadejte prosím platné údaje.';
  });
});

  