<template>
  <!-- Dynamic Background -->
  <div class="flow-bg"></div>

  <header>
  <div class="navbar">
    <!-- Brand -->
    <a class="brand" href="#" @click.prevent="scrollToTop">
      <div class="brand-badge">🍵</div>
      <div>
        <div class="logo">{{ brand }}</div>
        <span class="brand-sub">Trading Journal · local-first</span>
      </div>
    </a>

    <!-- Center links (desktop) -->
    <nav class="nav-links">
      <a href="#features" :class="{ active: activeSection === 'features' }">Features</a>
      <a href="#pricing" :class="{ active: activeSection === 'pricing' }">Preise</a>
      <a href="#cta" :class="{ active: activeSection === 'cta' }">Download</a>
    </nav>

    <!-- Right actions -->
    <div class="nav-actions">
      <a class="btn btn-ghost" :href="supportHref" target="_blank" rel="noreferrer">
        Support
      </a>

      <a class="btn btn-glow" :href="ctaHref" target="_blank" rel="noreferrer">
        Katsumii holen <span class="arrow">→</span>
      </a>

      <button
        class="icon-btn"
        type="button"
        @click="mobileOpen = !mobileOpen"
        :aria-expanded="mobileOpen ? 'true' : 'false'"
        aria-label="Open menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile dropdown -->
  <div v-if="mobileOpen" class="mobile-panel">
    <a href="#features" @click="closeMobile">Features <span>→</span></a>
    <a href="#pricing" @click="closeMobile">Preise <span>→</span></a>
    <a href="#cta" @click="closeMobile">Download <span>→</span></a>
    <a :href="supportHref" target="_blank" rel="noreferrer" @click="closeMobile">FAQ &amp; Support <span>↗</span></a>
  </div>
</header>
  <!-- Hero -->
  <section class="hero">
    <h1>
      Dein Trading –<br />
      <strong>klar. lokal. glücklich.</strong>
    </h1>

    <p>
      Katsumii ist dein privates Trading Journal, das dich nicht nervt. Keine Cloud, kein Abo, nur du & deine Trades –
      und ein bisschen japanische Gelassenheit. 🍵
    </p>

    <!-- Glass Card -->
    <div class="glass-card float js-anim">
      <h3 style="font-size:1.2rem; color: var(--text-main);">Warum Katsumii?</h3>
      <br />

      <ul class="checks" style="list-style: none;">
        <li><span class="check-icon">✔</span>Volständig offline – keine Datenlecks</li>
        <li><span class="check-icon">✔</span>Einmalzahlung, kein Abo – für immer Besitz</li>
        <li><span class="check-icon">✔</span>Design: Modern & entspannt – wie ein Teezeremonie-Raum</li>
        <li><span class="check-icon">✔</span>Für Trader, die Wert auf Klarheit legen (und keine unnötige Hektik)</li>
      </ul>

      <br />
      <div class="tagline">🇯🇵 Japanisch inspiriert • 🔒 Deine Daten. Auf deinem Gerät.</div>
    </div>
  </section>

  <!-- Features -->
  <section id="features" class="features">
    <div class="feature-card js-anim">
      <div class="feature-icon">📊</div>
      <h3>Trade-Management</h3>
      <p>Einfach, intuitiv. Du protokollierst Trades – Katsumii macht die Analyse. Alles lokal auf deinem Gerät.</p>
    </div>

    <div class="feature-card js-anim">
      <div class="feature-icon">🧮</div>
      <h3>Performance-Analyse</h3>
      <p>Rendite, Winrate & expectancy – in Echtzeit. Deine Daten bleiben komplett privat.</p>
    </div>

    <div class="feature-card js-anim">
      <div class="feature-icon">🎯</div>
      <h3>Strategie-Management</h3>
      <p>Fasse deine Regeln zusammen & prüfe, was wirklich funktioniert. Kein Rätsel, sondern klare Erkenntnis.</p>
    </div>

    <div class="feature-card js-anim">
      <div class="feature-icon">🏦</div>
      <h3>Account-Übersicht</h3>
      <p>Einfach alle Accounts hinzufügen – sieh deinen Gesamt-Kontostand, ohne dich in Logs zu verlieren.</p>
    </div>

    <div class="feature-card js-anim">
      <div class="feature-icon">🛡️</div>
      <h3>Datenschutz-first</h3>
      <p>Keine Cloud. Kein Tracking. Kein Stress. Nur du und deine Performance – verschlüsselt lokal.</p>
    </div>

    <div class="feature-card js-anim">
      <div class="feature-icon">✨</div>
      <h3>Modern & elegant</h3>
      <p>Nach japanischem Minimalismus gestaltet: Viel Space, klare Typographie – und ein bisschen Gold für die Seele.</p>
    </div>
  </section>

  <!-- Pricing -->
  <section id="pricing" class="pricing">
    <h2>Wähle deinen Weg</h2>
    <p class="pricing-sub">
      Einmalzahlung. Kein Abo. Kein Stress. Du entscheidest, wie tief du einsteigst – wir bieten dir Sicherheit & Stil.
    </p>

    <div class="pricing-grid">
      <!-- Demo -->
      <div class="price-card js-anim">
        <h3>Demo</h3>
        <span class="price-label">Für Neugierige 🧪</span>
        <div class="price-value">0 €</div>
        <ul class="checks">
          <li><span class="check-icon">✔</span>1 Monat Demo (voll funktionsfähig)</li>
          <li><span class="check-icon">✔</span>Lokale JSON-Datei & Export</li>
          <li><span class="check-icon">✔</span>Basis-Features (keine Analyse)</li>
        </ul>

        <a class="btn" :href="demoHref" target="_blank" rel="noreferrer"
          style="width:100%; background:#e2e8f0; color:#0b0d12; text-align:center;">
          Jetzt testen 📥
        </a>
      </div>

      <!-- Light -->
      <div class="price-card js-anim">
        <h3>Light</h3>
        <span class="price-label">Für aktive Trader 🎯</span>
        <div class="price-value">49 €</div>
        <ul class="checks">
          <li><span class="check-icon">✔</span>Alle Features (inkl. Analyse)</li>
          <li><span class="check-icon">✔</span>Lifetime-Lizenz – für immer!</li>
          <li><span class="check-icon">✔</span>Einzeldownload, offline nutzbar</li>
        </ul>

        <a class="btn btn-glow" :href="lightHref" target="_blank" rel="noreferrer" style="width:100%; text-align:center;">
          Kaufen 🛒
        </a>
      </div>

      <!-- Professional (Popular) -->
      <div class="price-card popular js-anim">
        <span class="popular-badge">Top Choice ✨</span>
        <h3>Professional</h3>
        <span class="price-label">Für Profis & Analyse-Fans 🚀</span>
        <div class="price-value">89 €</div>
        <ul class="checks">
          <li><span class="check-icon">✔</span>Alle Light-Features</li>
          <li><span class="check-icon">✔</span>Eigene Kategorien, Tags & Filter</li>
          <li><span class="check-icon">✔</span>Priorisierter Support (24h)</li>
        </ul>

        <a class="btn btn-glow" :href="proHref" target="_blank" rel="noreferrer" style="width:100%; text-align:center;">
          Jetzt kaufen 💫
        </a>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section id="cta">
    <div class="cta-container">
      <div class="cta-card float js-anim">
        <h3>Deine Trades verdienen eine bessere Heimat.</h3>
        <p>
          Lade Katsumii jetzt herunter – offline, sicher & mit einem bisschen japanischem Zen.
          Dein Trading wird klarer – und du wirst ruhiger. 😌
        </p>
        <a :href="ctaHref" class="btn btn-glow" target="_blank" rel="noreferrer" style="font-size:1.2rem; padding:1.05rem 2.8rem;">
          Katsumii jetzt runterladen 🎯
        </a>
      </div>

      <div class="border-kintsugi"></div>
      <p style="margin-top: 2rem; font-size: 0.95rem; color: var(--accent-cyan);">
        🌸 „Katsumii“ – „Gesunder Geist“ (和心)
        Ein bisschen Japan. Viel Klarheit. 100% lokal.
      </p>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="footer-logo">{{ brand }} 🍵</div>

    <nav class="footer-links">
      <a :href="imprintHref" class="footer-link" target="_blank" rel="noreferrer">Impressum</a>
      <a :href="privacyHref" class="footer-link" target="_blank" rel="noreferrer">Datenschutz</a>
      <a :href="supportHref" class="footer-link" target="_blank" rel="noreferrer">FAQ &amp; Support 📬</a>
      <a :href="twitterHref" class="footer-link" target="_blank" rel="noreferrer">Twitter / X 🐦</a>
    </nav>

    <p class="copyright">
      © {{ new Date().getFullYear() }} {{ brand }} Trading Tools • Einmalzahlung. Kein Abo. Keine Angst vor dem Monatsende.
    </p>
  </footer>
</template>

<script setup>
import "./landing.css"
import { ref, onMounted, onBeforeUnmount } from "vue"

const mobileOpen = ref(false)
const activeSection = ref("")



// Inhalte / Links zentral
const brand = "Katsumii"

// TODO: setze deine echten Links:
const demoHref = "#"   // z.B. Download-Link zur Demo oder Lemonsqueezy Product Link
const lightHref = "#"  // Lemonsqueezy Checkout Light
const proHref = "#"    // Lemonsqueezy Checkout Pro
const ctaHref = proHref

const imprintHref = "#"
const privacyHref = "#"
const supportHref = "#"
const twitterHref = "#"

function onDemoClick() {
  // du kannst später z.B. einen echten Download starten
  alert("Demo-Download startet in Kürze…")
}

function onMobileMenuClick() {
  alert("Mobile Menu – hier kommt ein echtes Menü.")
}

function closeMobile(e) {
  // lässt normal scrollen und klappt dann zu
  mobileOpen.value = false
}

// Active section highlight (modern + feels premium)
let observer

onMounted(() => {
  const ids = ["features", "pricing", "cta"]
  const targets = ids
    .map((id) => document.getElementById(id))
    .filter(Boolean)

  observer = new IntersectionObserver(
    (entries) => {
      // pick the most visible one
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
      if (visible?.target?.id) activeSection.value = visible.target.id
    },
    { root: null, threshold: [0.2, 0.35, 0.5] }
  )

  targets.forEach((t) => observer.observe(t))

  // close mobile on resize up
  const onResize = () => {
    if (window.innerWidth > 900) mobileOpen.value = false
  }
  window.addEventListener("resize", onResize)

  // cleanup handler stored on window for removal
  window.__katsumii_onResize = onResize
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  if (window.__katsumii_onResize) {
    window.removeEventListener("resize", window.__katsumii_onResize)
    delete window.__katsumii_onResize
  }
})
  
  
</script>