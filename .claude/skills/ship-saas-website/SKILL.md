---
name: ship-saas-website
description: Build professional marketing websites for SaaS products and apps. Designed for solo founders and indie hackers who built their app and now need a website to showcase, market, and sell it. Covers everything a modern SaaS site needs — compelling hero, features, interactive demo, pricing plans, FAQ, Q&A chatbot, contact form, and full SEO optimization.
---

This skill guides creation of complete, conversion-optimized marketing websites for SaaS products. The target user is a solo founder or indie hacker who has built an app and now needs a professional web presence to market, sell, and grow it.

The user provides context about their product: what it does, who it's for, pricing model, and any brand assets they have. They may provide an app URL, screenshots, or repository to examine.

## Before Building

Understand the product deeply before writing any code. Ask about the core value proposition, target audience and their pain points, business model (free, freemium, subscription, one-time), existing brand assets (logo, colors, screenshots), whether there's a live app URL for embedding, and the desired brand personality.

If the user provides an app URL or repository, examine it first to understand the product and extract useful information for the marketing copy.

**CRITICAL**: Do NOT generate the entire website in a single response. SaaS marketing sites are large. Build incrementally — foundation and hero first, then section by section. This maintains quality and avoids output limits. Let the user review between steps.

## Site Sections

Every SaaS marketing site needs a complete set of sections that tell a story: problem → solution → proof → action. Each section has a job in the conversion funnel.

**Navigation** acts as the persistent guide — sticky, transparent-to-solid on scroll, with smooth anchor scrolling and a mobile hamburger menu. The nav CTA should be subtler than the hero CTA.

**Hero** is the most critical 5 seconds. A powerful benefit-driven headline (max 8 words), supporting subheadline, primary and secondary CTAs, a hero visual showing the actual product (CSS device mockup or animated illustration), atmospheric background, and a social proof snippet. This section alone determines whether visitors stay or bounce.

**Features** should focus on outcomes, not specs. "Save 10 hours/week" beats "Has automation." Use 3-6 benefit cards with scroll-triggered reveal animations. Bento grids and asymmetric layouts outperform predictable equal-width columns.

**Interactive Demo** is the signature section that separates great SaaS sites from generic ones. If a live URL exists, embed it in a styled iframe with a browser frame. If screenshots exist, build a tabbed walkthrough with animated transitions. If nothing exists, create a CSS-animated mockup — typing effects, growing charts, loading states — that represents the app's core workflow abstractly but recognizably.

**Pricing** needs 2-4 tier cards with a monthly/annual toggle showing savings. Highlight the recommended plan visually. Include a feature checklist per plan and trust signals below: money-back guarantee, no credit card required, cancel anytime. Include commented instructions for connecting Stripe Payment Links or LemonSqueezy — the site works without a backend.

**FAQ** covers the 6-10 most common questions in an accordion. This section does double duty: it removes purchase friction AND boosts SEO when marked up with Schema.org FAQPage JSON-LD, which enables rich results in Google.

**Q&A Chatbot** is a floating chat widget in the bottom-right corner. Pure client-side JavaScript — no API keys, no backend. A pre-loaded knowledge base built from the product info, with keyword matching and fuzzy search. Typing indicator animation, quick-reply suggestions, and a human fallback ("Email us or use the contact form"). Match the chatbot's personality to the brand tone.

**Contact Form** with name, email, subject dropdown, and message. Client-side validation with inline error states, animated submit button (default → spinner → checkmark), and a honeypot field for spam prevention. Include commented setup instructions for Formspree or Netlify Forms.

**Footer** with multi-column links, social icons, newsletter signup, legal placeholder links, and dynamic copyright year.

Suggest optional sections when relevant: testimonials, animated stats counter, integration partner logos, changelog, founder story, or security badges.

## SEO — Non-Negotiable

A beautiful site nobody finds is a failed site. Every generated page must include comprehensive SEO: title tag with primary keyword (60 chars), meta description with value proposition (155 chars), canonical URL, Open Graph tags for social sharing (og:title, og:description, og:image at 1200×630), Twitter Card tags, semantic HTML with a single h1 containing the primary keyword, strict heading hierarchy, Schema.org JSON-LD for FAQPage and SoftwareApplication and Organization, keyword placement across title/h1/meta/first paragraph/h2/alt text, and a post-deployment checklist as an HTML comment (Search Console, sitemap, OG image, Rich Results test, PageSpeed check). Core Web Vitals optimization: inline styles for fast LCP, explicit image dimensions for zero CLS, font-display swap, and prefers-reduced-motion support.

## Design Quality

Apply the same principles as world-class frontend design. No AI slop. Every generation must be unique and visually striking.

Choose distinctive typography — never Inter, Roboto, Arial, or system fonts. Commit to a color palette with a dominant primary and sharp accent — never purple gradients on white. Focus motion on high-impact moments: one orchestrated page-load animation with staggered reveals creates more delight than scattered micro-interactions. Use asymmetry, overlap, and grid-breaking layouts instead of predictable stacked sections. Create atmosphere with gradient meshes, noise textures, geometric patterns, and grain overlays instead of flat solid backgrounds.

Before building, present 2-3 aesthetic directions to the user: Clean & Confident, Flowing & Organic, Bold & Electric, Editorial & Refined, Playful & Vibrant, Dark & Premium, or Brutalist & Raw. Match the aesthetic to the product's personality — developer tools want electric or brutalist energy, design tools want editorial refinement, consumer apps want playful vibrancy.

Remember: the goal is a website that makes visitors think "this product is serious" within 3 seconds. Every section guides toward a CTA. Every design choice builds trust. Every detail matters.
