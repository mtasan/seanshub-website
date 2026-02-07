// ═══════════════════════════════════════════════
// SeansHub Landing Page - Main JS
// ═══════════════════════════════════════════════

import './style.css'

// ── Navbar scroll effect ──────────────────────
const navbar = document.getElementById('navbar')

function handleNavbarScroll() {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true })
handleNavbarScroll()

// ── Mobile menu toggle ────────────────────────
const mobileMenuBtn = document.getElementById('mobile-menu-btn')
const mobileMenu = document.getElementById('mobile-menu')
const menuIcon = document.getElementById('menu-icon')
let menuOpen = false

mobileMenuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen
  mobileMenu.classList.toggle('hidden', !menuOpen)

  if (menuOpen) {
    menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12')
  } else {
    menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16')
  }
})

// Close mobile menu on nav link click
document.querySelectorAll('.mobile-nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    menuOpen = false
    mobileMenu.classList.add('hidden')
    menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16')
  })
})

// ── Scroll reveal (Intersection Observer) ─────
const revealElements = document.querySelectorAll('.reveal')

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  }
)

revealElements.forEach((el) => revealObserver.observe(el))

// ── Counter animation ─────────────────────────
const counters = document.querySelectorAll('.counter')

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target
        const target = parseInt(el.dataset.target, 10)
        animateCounter(el, target)
        counterObserver.unobserve(el)
      }
    })
  },
  { threshold: 0.5 }
)

counters.forEach((el) => counterObserver.observe(el))

function animateCounter(el, target) {
  const duration = 1800
  const start = performance.now()

  function update(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(ease * target)

    el.textContent = current.toLocaleString('tr-TR')

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

// ── FAQ accordion ─────────────────────────────
document.querySelectorAll('.faq-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.faq-item')
    const content = item.querySelector('.faq-content')
    const isActive = item.classList.contains('active')

    // Close all others
    document.querySelectorAll('.faq-item.active').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('active')
        const openContent = openItem.querySelector('.faq-content')
        openContent.classList.add('hidden')
        openContent.style.maxHeight = '0'
      }
    })

    // Toggle this one
    if (isActive) {
      item.classList.remove('active')
      content.style.maxHeight = '0'
      setTimeout(() => content.classList.add('hidden'), 350)
    } else {
      item.classList.add('active')
      content.classList.remove('hidden')
      content.style.maxHeight = content.scrollHeight + 'px'
    }
  })
})

// ── Smooth scroll for anchor links ────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href')
    if (href === '#') return

    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  })
})


// ═══════════════════════════════════════════════
// INTERACTIVE DEMO TABS
// ═══════════════════════════════════════════════

document.querySelectorAll('.demo-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab

    // Update tab buttons
    document.querySelectorAll('.demo-tab').forEach((t) => t.classList.remove('active'))
    tab.classList.add('active')

    // Update panels
    document.querySelectorAll('.demo-panel').forEach((panel) => {
      if (panel.dataset.panel === target) {
        panel.classList.remove('hidden')
        panel.classList.add('active')
        // Animate demo counters in the visible panel
        panel.querySelectorAll('.demo-counter').forEach((c) => {
          animateCounter(c, parseInt(c.dataset.val, 10))
        })
      } else {
        panel.classList.add('hidden')
        panel.classList.remove('active')
      }
    })
  })
})

// Animate demo counters on first view
const demoSection = document.getElementById('demo')
if (demoSection) {
  const demoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document
            .querySelectorAll('.demo-panel.active .demo-counter')
            .forEach((c) => {
              animateCounter(c, parseInt(c.dataset.val, 10))
            })
          demoObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )
  demoObserver.observe(demoSection)
}


// ═══════════════════════════════════════════════
// BILLING TOGGLE (Pricing)
// ═══════════════════════════════════════════════

const billingToggle = document.getElementById('billing-toggle')
let isAnnual = false

if (billingToggle) {
  billingToggle.addEventListener('click', () => {
    isAnnual = !isAnnual
    billingToggle.classList.toggle('annual', isAnnual)

    // Update label emphasis
    document.querySelectorAll('.billing-label').forEach((label) => {
      if (label.dataset.period === 'annual') {
        label.classList.toggle('text-slate-700', isAnnual)
        label.classList.toggle('text-slate-400', !isAnnual)
      } else {
        label.classList.toggle('text-slate-700', !isAnnual)
        label.classList.toggle('text-slate-400', isAnnual)
      }
    })

    // Update prices
    const period = isAnnual ? 'annual' : 'monthly'
    document.querySelectorAll('.price-amount').forEach((el) => {
      const val = el.dataset[period]
      el.innerHTML = `&#8378;${val}`
    })

    // Update price notes
    document.querySelectorAll('.price-note').forEach((el) => {
      el.innerHTML = el.dataset[period]
    })
  })
}


// ═══════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════

const contactForm = document.getElementById('contact-form')

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Honeypot check
    const honeypot = contactForm.querySelector('[name="website"]')
    if (honeypot && honeypot.value) return

    // Validate
    let valid = true
    const fields = contactForm.querySelectorAll('.contact-input[required]')

    fields.forEach((field) => {
      const error = field.nextElementSibling
      field.classList.remove('error')
      if (error) error.classList.add('hidden')

      if (!field.value.trim()) {
        valid = false
        field.classList.add('error')
        if (error) error.classList.remove('hidden')
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        valid = false
        field.classList.add('error')
        if (error) error.classList.remove('hidden')
      }
    })

    if (!valid) return

    // Simulate submit animation
    const submitBtn = document.getElementById('contact-submit')
    const submitText = document.getElementById('submit-text')
    const submitSpinner = document.getElementById('submit-spinner')
    const submitCheck = document.getElementById('submit-check')
    const formSuccess = document.getElementById('form-success')

    submitText.classList.add('hidden')
    submitSpinner.classList.remove('hidden')
    submitBtn.disabled = true

    setTimeout(() => {
      submitSpinner.classList.add('hidden')
      submitCheck.classList.remove('hidden')
      formSuccess.classList.remove('hidden')
      submitBtn.classList.remove('from-brand-500', 'to-brand-600')
      submitBtn.style.background = '#10b981'

      // Reset after 4s
      setTimeout(() => {
        contactForm.reset()
        submitCheck.classList.add('hidden')
        submitText.classList.remove('hidden')
        submitBtn.disabled = false
        submitBtn.style.background = ''
        formSuccess.classList.add('hidden')
      }, 4000)
    }, 1500)
  })

  // Clear error on input
  contactForm.querySelectorAll('.contact-input').forEach((input) => {
    input.addEventListener('input', () => {
      input.classList.remove('error')
      const error = input.nextElementSibling
      if (error && error.classList.contains('contact-error')) {
        error.classList.add('hidden')
      }
    })
  })
}


// ═══════════════════════════════════════════════
// Q&A CHATBOT
// ═══════════════════════════════════════════════

const chatToggle = document.getElementById('chat-toggle')
const chatWindow = document.getElementById('chat-window')
const chatInput = document.getElementById('chat-input')
const chatSend = document.getElementById('chat-send')
const chatMessages = document.getElementById('chat-messages')
const chatIconOpen = document.getElementById('chat-icon-open')
const chatIconClose = document.getElementById('chat-icon-close')
let chatOpen = false

// Knowledge base
const knowledgeBase = [
  {
    keywords: ['fiyat', 'ücret', 'plan', 'maliyet', 'kaç para', 'ne kadar'],
    answer:
      '3 planımız var: <b>Başlangıç</b> (ücretsiz, 20 danışana kadar), <b>Profesyonel</b> (₺499/ay, sınırsız danışan), <b>Klinik</b> (₺1.499/ay, sınırsız ekip). Yıllık ödemede %20 indirim! <a href="#fiyatlandirma" class="text-brand-600 underline">Fiyatları inceleyin →</a>',
  },
  {
    keywords: ['ücretsiz', 'deneme', 'trial', 'bedava', 'free'],
    answer:
      'Evet! Başlangıç planı <b>sonsuza kadar ücretsiz</b> (20 danışana kadar). Profesyonel ve Klinik planlar ise <b>14 gün ücretsiz deneme</b> ile gelir. Kredi kartı gerekmez.',
  },
  {
    keywords: ['güvenlik', 'güvende', 'kvkk', 'gizlilik', 'veri', 'şifre'],
    answer:
      'Veri güvenliği önceliğimiz. Her klinik <b>izole veritabanı alanında</b> çalışır. Tüm veriler şifrelenir, klinik notlarda revizyon takibi yapılır. <b>KVKK uyumlu</b> altyapı kullanıyoruz.',
  },
  {
    keywords: ['demo', 'göster', 'tanıtım', 'sunum'],
    answer:
      'Size özel canlı demo ayarlayabiliriz! <a href="#iletisim-formu" class="text-brand-600 underline">İletişim formundan</a> "Demo Talebi" seçerek bize ulaşın, ekibimiz en kısa sürede dönüş yapsın.',
  },
  {
    keywords: ['nasıl', 'başla', 'kayıt', 'hesap', 'kaydol'],
    answer:
      'Başlamak çok kolay! E-posta adresinizle <b>ücretsiz hesap oluşturun</b>, kliniğinizi kurun ve hemen kullanmaya başlayın. 3 dakikadan kısa sürer. <a href="#" class="text-brand-600 underline">Hemen başlayın →</a>',
  },
  {
    keywords: ['telefon', 'mobil', 'uygulama', 'app', 'tablet'],
    answer:
      'SeansHub <b>tamamen responsive</b> tasarıma sahiptir. Telefon, tablet veya bilgisayarınızdan tarayıcı ile erişebilirsiniz. Ayrı bir uygulama indirmenize gerek yok.',
  },
  {
    keywords: ['iptal', 'vazgeç', 'bırak', 'çık'],
    answer:
      'İstediğiniz zaman iptal edebilirsiniz, <b>herhangi bir ceza yoktur</b>. İptal sonrası verileriniz 30 gün korunur ve dışa aktarılabilir. Ardından ücretsiz plana geçersiniz.',
  },
  {
    keywords: ['aktar', 'import', 'excel', 'csv', 'veri taşı'],
    answer:
      'Evet! <b>Excel veya CSV</b> formatındaki mevcut danışan listenizi kolayca içe aktarabilirsiniz. Klinik planında özel onboarding desteğimiz veri aktarımınızda yardımcı olur.',
  },
  {
    keywords: ['destek', 'yardım', 'iletişim', 'mail', 'e-posta'],
    answer:
      'Tüm planlar e-posta desteği içerir. Profesyonel planda <b>öncelikli destek</b>, Klinik planda <b>özel müşteri temsilcisi</b> ve telefon desteği mevcuttur. Ayrıca <a href="#iletisim-formu" class="text-brand-600 underline">iletişim formu</a> ile bize yazabilirsiniz.',
  },
  {
    keywords: ['özellik', 'ne yapar', 'neler var', 'fonksiyon'],
    answer:
      'SeansHub ile: <b>Danışan yönetimi</b>, <b>seans planlama</b>, <b>klinik not tutma</b> (revizyon geçmişi ile), <b>takvim</b>, <b>raporlar</b> ve <b>ekip yönetimi</b> yapabilirsiniz. <a href="#ozellikler" class="text-brand-600 underline">Tüm özellikler →</a>',
  },
]

const fallbackAnswer =
  'Bu konuda size daha iyi yardımcı olabilmemiz için <a href="#iletisim-formu" class="text-brand-600 underline">iletişim formu</a> üzerinden bize yazabilir veya <b>destek@seanshub.com</b> adresine e-posta gönderebilirsiniz.'

function findAnswer(question) {
  const q = question.toLowerCase().replace(/[?!.,]/g, '')
  let bestMatch = null
  let bestScore = 0

  for (const item of knowledgeBase) {
    let score = 0
    for (const keyword of item.keywords) {
      if (q.includes(keyword)) score++
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = item
    }
  }

  return bestScore > 0 ? bestMatch.answer : fallbackAnswer
}

function addMessage(html, isUser) {
  const wrapper = document.createElement('div')
  wrapper.className = isUser ? 'chat-msg-user flex justify-end' : 'chat-msg-bot flex gap-2.5'

  if (isUser) {
    wrapper.innerHTML = `<div class="bg-gradient-to-br from-brand-500 to-brand-600 text-white rounded-2xl rounded-tr-md px-4 py-2.5 text-sm max-w-[85%]">${html}</div>`
  } else {
    wrapper.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 64 64" fill="none"><path d="M32 8C18 8 10 18 10 30C10 42 18 52 32 56C46 52 54 42 54 30C54 18 46 8 32 8Z" fill="#f59e0b"/><path d="M32 44C32 44 22 36 22 28C22 24 25 22 28 22C30 22 31.5 23 32 24C32.5 23 34 22 36 22C39 22 42 24 42 28C42 36 32 44 32 44Z" fill="#fff"/></svg>
      </div>
      <div class="bg-slate-100 rounded-2xl rounded-tl-md px-4 py-2.5 text-sm text-slate-700 max-w-[85%]">${html}</div>
    `
  }

  chatMessages.appendChild(wrapper)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

function showTyping() {
  const typing = document.createElement('div')
  typing.className = 'chat-msg-bot flex gap-2.5'
  typing.id = 'chat-typing'
  typing.innerHTML = `
    <div class="w-7 h-7 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center">
      <svg width="14" height="14" viewBox="0 0 64 64" fill="none"><path d="M32 8C18 8 10 18 10 30C10 42 18 52 32 56C46 52 54 42 54 30C54 18 46 8 32 8Z" fill="#f59e0b"/><path d="M32 44C32 44 22 36 22 28C22 24 25 22 28 22C30 22 31.5 23 32 24C32.5 23 34 22 36 22C39 22 42 24 42 28C42 36 32 44 32 44Z" fill="#fff"/></svg>
    </div>
    <div class="bg-slate-100 rounded-2xl rounded-tl-md px-4 py-3 chat-typing"><span></span><span></span><span></span></div>
  `
  chatMessages.appendChild(typing)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

function removeTyping() {
  const typing = document.getElementById('chat-typing')
  if (typing) typing.remove()
}

function handleChatSubmit() {
  const question = chatInput.value.trim()
  if (!question) return

  addMessage(question, true)
  chatInput.value = ''

  // Hide quick replies after first interaction
  const quickReplies = document.getElementById('chat-quick-replies')
  if (quickReplies) quickReplies.classList.add('hidden')

  // Show typing, then answer
  showTyping()

  const delay = 600 + Math.random() * 800
  setTimeout(() => {
    removeTyping()
    addMessage(findAnswer(question), false)
  }, delay)
}

if (chatToggle) {
  chatToggle.addEventListener('click', () => {
    chatOpen = !chatOpen
    chatWindow.classList.toggle('hidden', !chatOpen)
    chatIconOpen.classList.toggle('hidden', chatOpen)
    chatIconClose.classList.toggle('hidden', !chatOpen)

    if (chatOpen) {
      setTimeout(() => chatInput.focus(), 100)
    }
  })
}

if (chatSend) {
  chatSend.addEventListener('click', handleChatSubmit)
}

if (chatInput) {
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleChatSubmit()
  })
}

// Quick reply buttons
document.querySelectorAll('.quick-reply').forEach((btn) => {
  btn.addEventListener('click', () => {
    chatInput.value = btn.dataset.q
    handleChatSubmit()
  })
})


// ═══════════════════════════════════════════════
// NEWSLETTER FORM
// ═══════════════════════════════════════════════

const newsletterForm = document.getElementById('newsletter-form')

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const btn = newsletterForm.querySelector('button')
    const originalText = btn.textContent

    btn.textContent = 'Kaydedildi!'
    btn.style.background = '#10b981'
    newsletterForm.querySelector('input').value = ''

    setTimeout(() => {
      btn.textContent = originalText
      btn.style.background = ''
    }, 3000)
  })
}
