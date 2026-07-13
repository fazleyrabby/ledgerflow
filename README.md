# LedgerFlow — Modern Gold Fintech Landing Page

LedgerFlow is a state-of-the-art, high-performance fintech landing page built using **Next.js 16**, **Tailwind CSS v4**, and **Framer Motion**. It is styled with a premium luxury gold and dark metallic aesthetic (`#4D3207` accents).

## Key Features & Highlights

### 1. Scroll-Driven Word-by-Word Hero Reveal
- **Hardware-Accelerated Opacity Transforms:** Utilizes Framer Motion's `useTransform` hooked directly to raw `scrollY` window offsets.
- **Sequential Word Reveals:** On load, only the first word **"Modern"** is visible. As the user begins scrolling, **"Finance."** and **"Simplified."** fade in sequentially, followed by the description paragraph, trial action buttons, and trust metrics.
- **Optimized Performance:** Re-renders are bypassed by setting CSS opacity variables directly on the DOM during scrolling.

### 2. Live Interactive Sandbox Widget
- **Dynamic Ledger Streams:** Features a ticking list of real-time transactions with currency updates.
- **Customized Green Scrollbar:** Custom WebKit and Firefox utility styling (`.green-scrollbar`) renders a thin 6px scrolling indicator with a custom dark-tinted track and green indicator (`rgba(34, 197, 94, 0.45)`) that animates on hover.
- **Interactive 3D Metallic Card:** A titanium corporate card showpiece with metallic refractivity that dynamically rotates based on mouse hover coordinates.

### 3. Cohesive Scroll Reveals Across Sections
- Viewport-aware slide-ups (`whileInView`) trigger smoothly on the **Marquee**, **Features**, **Showcase**, **Stats**, **Testimonials**, **CTA**, and **Footer** blocks to create a fluid, premium reading experience.

---

## Technical Setup

### Development Server

Ensure your dependencies are installed, then run:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page in your browser.

### Production Build

To compile and verify the production bundle:

```bash
pnpm build
```

---

*Made with ❤️ by [rhtech](https://rhtech.dev/)*
