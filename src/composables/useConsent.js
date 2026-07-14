import { ref } from "vue"

/* Opt-in consent for anonymous Umami analytics (Art. 6 (1) a DSGVO + § 25 TDDDG).
   Umami is NOT loaded until the visitor explicitly accepts. The choice is stored
   in localStorage (functional/necessary storage — no consent needed for it). */

const STORAGE_KEY = "katsumii-consent"
const WEBSITE_ID = "e5a8e4a5-cf96-4053-8fa4-9245f4fe5af4"
const DOMAINS = "katsumii.com,www.katsumii.com"

const read = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === "granted" || value === "denied" ? value : null
  } catch {
    return null
  }
}

const consent = ref(read()) // "granted" | "denied" | null (undecided)
const bannerVisible = ref(consent.value === null)
let umamiRequested = false

const loadUmami = () => {
  if (umamiRequested || document.getElementById("umami-analytics")) return
  umamiRequested = true
  const script = document.createElement("script")
  script.id = "umami-analytics"
  script.defer = true
  script.src = "https://cloud.umami.is/script.js"
  script.setAttribute("data-website-id", WEBSITE_ID)
  script.setAttribute("data-domains", DOMAINS)
  script.setAttribute("data-auto-track", "false")
  script.addEventListener("load", () => {
    if (consent.value === "granted") window.umami?.track?.()
  })
  document.head.appendChild(script)
}

const persist = (value) => {
  consent.value = value
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* storage may be unavailable — decision holds for this session only */
  }
}

const accept = () => {
  persist("granted")
  bannerVisible.value = false
  loadUmami()
}

const decline = () => {
  persist("denied")
  bannerVisible.value = false
}

const openSettings = () => {
  bannerVisible.value = true
}

// Returning visitors who already accepted: re-enable analytics on load.
if (consent.value === "granted") loadUmami()

export function useConsent() {
  return { consent, bannerVisible, accept, decline, openSettings }
}
