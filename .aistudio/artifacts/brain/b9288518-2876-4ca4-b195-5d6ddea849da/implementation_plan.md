# THRED VISION — Premium 3D Garment Manufacturing Website

A bespoke, responsive single-page B2B website for THRED VISION, a ready-made garment manufacturing company located in Ganjimutt, Karnataka, India, fusing cinematic 3D textile aesthetics with editorial industrial precision.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and interactive directions have been aligned based on user clarification and the creative brief:

- **Confirmed Decision 1 (3D Hero Visual)**: Interactive draped silk surface with smooth physics-based vertex ripple, subtle cursor/pointer reaction, soft studio rim lighting, and thread intro sequence, paired with an accessible lightweight fallback for reduced-motion and lower-tier devices.
- **Confirmed Decision 2 (Inquiry System)**: Interactive B2B RFQ (Request for Quotation) builder with live form validation, dynamic category & volume selection, pre-formatted email composition (`mailto:` generator), direct copy-to-clipboard summary, and direct phone/email alternatives without simulated submission illusions.
- **Confirmed Corporate Facts**: Established 2022, ~2-acre facility in Ganjimutt (Dakshina Kannada, Karnataka, India), stated production capacity of 100,000 garments/month, with verified contact emails (`subhash@thredvision.com`, `info@thredvision.com`) and phone lines (+91 6362815418 / 8660845209 / 9980546369).

---

## 1. Overview & Core Concept

- **What It Does**: Presents THRED VISION's garment manufacturing capabilities, facilities, garment categories (men's and women's apparel), and 4-stage quality production process to global fashion brands, retail buyers, and sourcing managers seeking scalable manufacturing in India.
- **Target Audience / Persona**: International and domestic fashion brand sourcing heads, apparel procurement directors, independent label founders, and private-label merchandisers.
- **Key Value**: Delivers tangible credibility, transparent scale (100k garments/month), and an effortless channel for structured manufacturing inquiries while strictly honoring verified company facts without generic AI tropes or false claims.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Color Palette**:
  - Forest Green: `#123D32` (dominant in Hero, CTAs, and Contact/Inquiry closing section)
  - Warm Ivory: `#F3F0E8` (foundation canvas for About, Products, and Manufacturing sections)
  - Charcoal: `#202622` (primary high-contrast typography and structural hairline dividers)
  - Muted Sage: `#B6C4B5` (accents, technical line art, and subtle weave highlights)
  - Crisp White: `#FFFFFF` (contrast surfaces and select card backings)
- **Typography**: Modern sans-serif hierarchy utilizing `Plus Jakarta Sans` for clean geometric headlines (`clamp(2.25rem, 4vw, 3.75rem)` in Hero) paired with `DM Sans` for editorial body prose and `font-mono tabular-nums` for facility metrics and production volume figures.
- **Top Bar Contract**:
  - Single-line wordmark `THRED VISION` (no extraneous tags or location pills).
  - 4 single-line nav links: `About`, `Products`, `Manufacturing`, `Contact`.
  - 1 primary action button: `Inquire Now` (smooth-scrolls to Section 05).

### Five Exact Content Sections
1. **Section 01 — Hero**: Deep forest-green canvas featuring an interactive WebGL draped textile surface with realistic cloth sheen, floating thread weaves, headline *"Crafted with Precision. Built for Scale."*, supporting text *"Your partner in ready-made garment manufacturing."*, and dual CTAs (`Explore Our Capabilities` $\rightarrow$ Manufacturing; `Discuss Your Requirements` $\rightarrow$ Contact).
2. **Section 02 — About THRED VISION**: Warm ivory canvas transitioning with subtle textile weave motifs, establishing the 2022 origin in Ganjimutt, Karnataka, and featuring 3 verified key metrics:
   - Established: `2022`
   - Facility: `~2 Acres`
   - Stated Capacity: `100,000 Garments / Month`
3. **Section 03 — Products (Manufacturing Categories)**:
   - Panel A (Men's Apparel): T-shirts & polo shirts, formal shirts, casual shirts, trousers & jeans, jackets, shorts.
   - Panel B (Women's Apparel): Tops & blouses, dresses, skirts, pants & trousers, t-shirts, kurtis & leggings, jackets.
   - Desktop subtle pointer depth and touch-optimized mobile display, with Category Specification drawers and "Discuss Your Requirements" CTAs.
4. **Section 04 — Manufacturing & Quality**:
   - 4-stage progressive production workflow:
     1. Planning & Material Preparation
     2. Fabric Cutting & Garment Assembly
     3. Quality Inspection
     4. Finishing & Packing
   - Stage indicators with progressive scroll active states, hairline connecting paths, and quality inspection focus notes.
5. **Section 05 — Contact & Inquiries (RFQ Builder)**:
   - Deep forest green closing atmosphere with subtle slowly undulating fabric fibers.
   - Form fields: Full Name, Company Name, Business Email, Garment Category (multi-select), Estimated Order Quantity (stepped selector: 500-2,000 / 2,000-10,000 / 10,000+ pcs), and Project Requirements.
   - Transparent dual action: `Generate Official RFQ Email` (opens prepared draft to `subhash@thredvision.com` / `info@thredvision.com`) and `Copy Inquiry Summary` with verified phone contacts (+91 6362815418 / +91 8660845209 / +91 9980546369) and facility address in Ganjimutt, Karnataka.
   - Minimalist footer with copyright, navigation mirrors, and verified details.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Direct WebGL Shader Canvas vs External 3D Heavy Model**:
  - *Chosen Approach*: Lightweight Three.js procedural vertex-displacement plane with custom cloth normal illumination and smooth pointer wave dampening, plus CSS SVG weave fallback.
  - *Why*: Instant sub-second initial paint, 60fps across mobile and desktop, zero multi-megabyte 3D model download delays, and rock-solid context recovery on low-memory devices.
  - *Alternatives Considered*: Heavy GLTF model download (rejected due to network latency, potential parse crashes, and mobile thermal throttle).
- **Decision 2: Realistic RFQ Generation vs Fake Database Submission**:
  - *Chosen Approach*: Interactive RFQ builder that validates all B2B fields, constructs an actionable RFC 6068 `mailto:` link pre-addressed to the official company email with structured order parameters, and offers an instant one-click clipboard summary.
  - *Why*: The brief explicitly prohibits faking successful backend submission. This delivers genuine business utility and real communication without backend dependencies.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│                      THRED VISION APPLICATION                   │
├─────────────────────────────────────────────────────────────────┤
│ Top Navigation (Brand · About · Products · Mfg · Contact CTA)   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────┐         ┌─────────────────────────┐  │
│  │ 01. HERO (Forest Grn) │ <─────> │ Three.js Fabric Mesh    │  │
│  │ 3D Draped Silk WebGL  │         │ (Vertex Wave + Rim Lgt) │  │
│  └───────────────────────┘         └─────────────────────────┘  │
│             │                                                   │
│             ▼                                                   │
│  ┌───────────────────────┐         ┌─────────────────────────┐  │
│  │ 02. ABOUT (Warm Ivory)│ <─────> │ Verified Scale Cards    │  │
│  │ Ganjimutt, KA Hub     │         │ (2022 · 2 Ac · 100k/mo) │  │
│  └───────────────────────┘         └─────────────────────────┘  │
│             │                                                   │
│             ▼                                                   │
│  ┌───────────────────────┐         ┌─────────────────────────┐  │
│  │ 03. PRODUCTS          │ <─────> │ Editorial Dual Panels   │  │
│  │ Manufacturing Scope   │         │ (Men's & Women's Lines) │  │
│  └───────────────────────┘         └─────────────────────────┘  │
│             │                                                   │
│             ▼                                                   │
│  ┌───────────────────────┐         ┌─────────────────────────┐  │
│  │ 04. MANUFACTURING     │ <─────> │ 4-Stage Precision Flow  │  │
│  │ Quality Inspection    │         │ (Interactive Stage Nav) │  │
│  └───────────────────────┘         └─────────────────────────┘  │
│             │                                                   │
│             ▼                                                   │
│  ┌───────────────────────┐         ┌─────────────────────────┐  │
│  │ 05. RFQ INQUIRY &     │ <─────> │ Form Validation &       │  │
│  │ CONTACT (Forest Grn)  │         │ Pre-Formatted Mailto    │  │
│  └───────────────────────┘         └─────────────────────────┘  │
│             │                                                   │
│             ▼                                                   │
│  Footer (Wordmark · Direct Contacts · Location · Copyright)    │
└─────────────────────────────────────────────────────────────────┘
```

- **State Management**:
  - `activeSection`: IntersectionObserver tracking current view for top navigation indicator.
  - `rfqForm`: Typed state with name, company, email, categories, volume, requirements, validation errors, and submission status.
  - `selectedStage`: Active manufacturing stage index (0–3) for sequential inspection.
  - `webglSupported`: Detection flag providing immediate graceful fallback if WebGL fails or user prefers reduced motion.
- **Dependencies**: Uses `three` (installed if needed for the WebGL canvas), `lucide-react`, and standard Tailwind CSS tokens.
