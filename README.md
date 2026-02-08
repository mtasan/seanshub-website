# SeansHub Landing Page

Psikologlar, diyetisyenler ve fizyoterapistler icin tasarlanmis seans ve danisan yonetim sistemi **SeansHub**'in tanitim web sitesi.

**Canli:** [seanshub.com](https://seanshub.com)

## Ozellikler

- Duyarli (responsive) tek sayfa tasarim
- Interaktif demo panelleri (Dashboard, Takvim, Notlar)
- 2 fiyatlandirma plani (Baslangic / Profesyonel)
- Canli sohbet botu (SSS)
- Iletisim formu
- SEO optimizasyonu (meta, Open Graph, JSON-LD)
- Aylik/Yillik fiyat degistirici

## Teknolojiler

- **Vite** - Build araci
- **Tailwind CSS** - Stil framework'u
- **Vercel** - Hosting & CDN

## Gelistirme

```bash
# Bagimliliklari yukle
npm install

# Gelistirme sunucusu
npm run dev

# Production build
npm run build

# Build onizleme
npm run preview
```

## Deploy

Bu proje **Vercel** uzerinde barindiriliyor. `main` branch'ine push yapildiginda otomatik olarak deploy edilir.

**Akis:** `git push` → GitHub (`mtasan/seanshub-website`) → Vercel → seanshub.com

**Domain:** Cloudflare uzerinden DNS yonetimi, Vercel'e yonlendirme.

## Proje Yapisi

```
landing_website/
├── index.html          # Ana sayfa
├── src/
│   ├── main.js         # JS giris noktasi
│   └── style.css       # Tailwind CSS
├── public/             # Statik dosyalar (favicon, robots.txt)
├── .claude/
│   └── skills/
│       └── ship-saas-website/
│           └── SKILL.md  # SaaS website olusturma skill'i
├── dist/               # Build ciktisi (gitignore)
├── vercel.json         # Vercel yapilandirmasi (headers, caching)
├── vite.config.js      # Vite yapilandirmasi
├── tailwind.config.js  # Tailwind yapilandirmasi
├── postcss.config.js   # PostCSS yapilandirmasi
└── package.json
```

## Claude Code Skills

Bu projede asagidaki Claude Code skill'leri kullanilmaktadir:

- **ship-saas-website** — SaaS urunleri icin profesyonel pazarlama web siteleri olusturma rehberi. Hero, ozellikler, interaktif demo, fiyatlandirma, SSS, sohbet botu, iletisim formu ve SEO optimizasyonu kapsar.

## Fiyatlandirma Planlari

| Plan | Fiyat | Uzman | Danisan |
|------|-------|-------|---------|
| Baslangic | Ucretsiz | 1 | 5'e kadar |
| Profesyonel | 499 TL/ay | Sinirsiz | Sinirsiz |
