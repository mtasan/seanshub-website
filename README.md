# SeansHub Landing Page

Psikologlar ve klinikler icin tasarlanmis klinik yonetim sistemi **SeansHub**'in tanitim web sitesi.

**Canli:** [seanshub.com](https://seanshub.com)

## Teknolojiler

- **Vite** - Build araci
- **Tailwind CSS** - Stil framework'u
- **Cloudflare Pages** - Hosting & CDN

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

Bu proje **Cloudflare Pages** uzerinde barindiriliyor. `main` branch'ine push yapildiginda otomatik olarak deploy edilir.

**Akis:** `git push` → GitHub → Cloudflare Pages → seanshub.com

## Proje Yapisi

```
landing_website/
├── index.html          # Ana sayfa
├── src/
│   ├── main.js         # JS giris noktasi
│   └── style.css       # Tailwind CSS
├── public/             # Statik dosyalar
├── dist/               # Build ciktisi (gitignore)
├── vite.config.js      # Vite yapilandirmasi
├── tailwind.config.js  # Tailwind yapilandirmasi
├── postcss.config.js   # PostCSS yapilandirmasi
└── package.json
```
