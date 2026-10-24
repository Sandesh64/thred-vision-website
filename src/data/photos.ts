
export interface PhotoAsset {
  id: string;
  url: string;
  title: string;
  category: string;
  alt: string;
  caption?: string;
  specs?: string;
}

export const HERO_PHOTO: PhotoAsset = {
  id: 'hero-facility-floor',
  url: '/factory-hero.jpg',
  title: 'Manufacturer of Ready Made Garments',
  category: 'Garment Manufacturing Operations',
  alt: 'THRED VISION garment assembly and quality inspection team at work in Ganjimutt manufacturing unit',
  caption: 'Synchronized assembly floor with progressive bundling and multi-stage AQL quality inspection.',
};

export const ABOUT_PHOTOS = {
  factoryExterior: {
    id: 'factory-exterior',
    url: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_5.34.54_PM_0e9e84e7.jpeg',
    title: 'Ganjimutt Manufacturing Complex',
    category: 'Facility Architecture',
    alt: 'THRED VISION modern 2 ACRES garment manufacturing plant along Bangalore Highway, Ganjimutt, Mangalore',
    caption: 'Modern 2 ACRES integrated manufacturing unit in SIDCO Industrial Estate, Mangalore.',
    specs: '2 ACRES · Unit 1 & Unit 2 Plants · Bangalore Highway Corridor',
  },
  stitchingFloor: {
    id: 'stitching-floor',
    url: '/Screenshot 2026-10-12 151211.png',
    title: '400+ MACHINES Assembly Floor',
    category: 'Sewing Operations',
    alt: 'High-speed industrial sewing line with Juki and Kansai machines at THRED VISION',
    caption: 'Synchronized Juki, Kansai & Tirva sewing workstations with 400+ WORKFORCE.',
    specs: '400+ MACHINES · 1L+ GARMENTS/MONTH · Progressive Bundling',
  },
  qualityInspection: {
    id: 'quality-inspection',
    url: '/Screenshot 2026-10-12 151313.png',
    title: 'KQCP Quality Inspection Hall',
    category: 'Compliance & Audits',
    alt: 'Garment quality audit team checking seam symmetry and dimensional tolerance',
    caption: 'Multi-stage Key Quality Control Point (KQCP) audit team inspecting tolerances.',
    specs: '100% Measurement Audit · AQL 1.5/2.5 Standards · 5 KQCP Gateways',
  },
  teamWorkforce: {
    id: 'team-workforce',
    url: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_5.34.56_PM_6338563f.jpeg',
    title: '400+ WORKFORCE & TEAM',
    category: 'Workforce Empowerment',
    alt: 'THRED VISION team and workforce at the Ganjimutt garment manufacturing facility',
    caption: 'Dedicated 400+ team of artisans, technicians, and managers gathered outside the Ganjimutt facility.',
    specs: '400+ WORKFORCE · Gender Inclusion · Fair Wage Standards',
  },
};

export const MENS_GARMENT_PHOTOS: PhotoAsset[] = [
  {
    id: 'men-tshirt-polo',
    url: '/mens-tshirts-polos.jpg',
    title: 'T-Shirts & Polos',
    category: "Men's Knits",
    alt: "Men's premium bio-washed cotton crewneck t-shirt and pique knit polo by THRED VISION",
    specs: '180-240 GSM · 100% Combed Bio-Wash Cotton · Ribbed Collar Retention',
    caption: 'Engineered for premium handfeel, shape retention, and reinforced twin-needle hems.',
  },
  {
    id: 'men-formal-shirt',
    url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000',
    title: 'Formal Shirts',
    category: "Men's Wovens",
    alt: "Men's sky blue tailored formal dress shirt with fused spread collar by THRED VISION",
    specs: '120 GSM High-Density Giza Cotton · 18-20 SPI Seams · Fused Interlinings',
    caption: 'Impeccable executive business tailoring with puckering-free armholes and collar stays.',
  },
  {
    id: 'men-casual-shirt',
    url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000',
    title: 'Casual Shirts',
    category: "Men's Lifestyle",
    alt: "Men's western denim and yarn-dyed plaid casual woven shirts by THRED VISION",
    specs: '160 GSM Slub / Flannel / Denim · Twin-Needle Flat-Felled Seams',
    caption: 'Enzyme pre-washed for vintage drape, reinforced pocket bar tacks, and pearlescent buttons.',
  },
  {
    id: 'men-trousers',
    url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000',
    title: 'Trousers & Chinos',
    category: "Men's Bottoms",
    alt: "Men's slim-fit tailored cotton twill chino trousers by THRED VISION",
    specs: '260 GSM Stretch Cotton Twill · Split Waistband · French Fly Construction',
    caption: 'Clean crease geometry, reinforced bar tacked pocket corners, and flexible waistband.',
  },
  {
    id: 'men-jeans',
    url: '/mens-jeans.jpg',
    title: 'Denim Jeans',
    category: "Men's Denim",
    alt: "Men's 5-pocket indigo raw denim jeans with antique brass hardware by THRED VISION",
    specs: '380 GSM (13.5 oz) Ring-Spun Denim · Heavy Chainstitch · Brass Rivets',
    caption: 'Durable denim craftsmanship crafted on dedicated feed-of-arm and chain-lock workstations.',
  },
  {
    id: 'men-jackets',
    url: '/mens-jackets.jpg',
    title: 'Jackets & Outerwear',
    category: "Men's Outerwear",
    alt: "Men's structured cotton twill utility jacket with clean interior lining by THRED VISION",
    specs: '320 GSM Canvas/Twill · Heavy YKK Zippers · Clean Binding Seams',
    caption: 'Structured outerwear engineered for layered comfort, durable hardware, and tailored ergonomics.',
  },
  {
    id: 'men-shorts',
    url: '/mens-shorts.jpg',
    title: 'Shorts & Casuals',
    category: "Men's Warm-Weather",
    alt: "Men's relaxed fit French terry and cotton twill shorts with reinforced stitching by THRED VISION",
    specs: '180-280 GSM · Drawcord Waistband · Clean Pocket Bags',
    caption: 'Comfortable movement geometry with clean pocket bags and resilient stitching.',
  },
];

export const WOMENS_GARMENT_PHOTOS: PhotoAsset[] = [
  {
    id: 'women-tops-blouses',
    url: '/womens-tops.png',
    title: 'Tops & Blouses',
    category: "Women's Lightweight",
    alt: "Women's contemporary rose and ivory tops and blouses by THRED VISION",
    specs: '110 GSM Viscose Rayon / Modal · French Seams · Delicate Rolled Hems',
    caption: 'Flowing drape and zero needle puckering across delicate woven and georgette fabrics.',
  },
  {
    id: 'women-dresses',
    url: '/womens-dresses.png',
    title: 'Dresses',
    category: "Women's Occasion",
    alt: "Women's sage and burgundy occasion midi dresses by THRED VISION",
    specs: '140 GSM Pure Linen & Poplin · Concealed Zippers · Bias Bound Armholes',
    caption: 'Intricate gathers, waist cinches, and accurate pattern matching on multi-tier dresses.',
  },
  {
    id: 'women-skirts',
    url: '/womens-skirts.png',
    title: 'Skirts',
    category: "Women's Separates",
    alt: "Women's tailored and pleated midi skirts by THRED VISION",
    specs: '160 GSM Structured Cotton Crepe · Blind Hem Stitching · Clean Waistband',
    caption: 'Uniform pleat retention and elegant motion tailored for casual and formal retail collections.',
  },
  {
    id: 'women-pants-trousers',
    url: '/womens-pants-trousers.png',
    title: 'Pants & Trousers',
    category: "Women's Tailoring",
    alt: "Women's tailored and casual trousers by THRED VISION",
    specs: '240 GSM Stretch Cotton Twill · Hook & Bar Fly · Tapered Hem Clean Finish',
    caption: 'Flattering silhouette engineering with comfort stretch and clean interior seam bindings.',
  },
  {
    id: 'women-kurtis',
    url: '/womens-kurtis.png',
    title: 'Kurtis & Tunics',
    category: "Women's Contemporary Ethnic",
    alt: "Women's teal and cream straight-cut printed and embroidered kurti duo by THRED VISION",
    specs: '130 GSM Cambric Cotton · Reinforced Side Slits · Mandarin Collar',
    caption: 'Traditional comfort fused with modern mass production line stitching and clean borders.',
  },
  {
    id: 'women-tshirts',
    url: '/womens-tshirts.png',
    title: 'T-Shirts & Knits',
    category: "Women's Knitwear Basics",
    alt: "Women's soft cotton blend crewneck and knit t-shirts by THRED VISION",
    specs: '160 GSM Supima Cotton · Lycra Ribbed Collar · Twin-Needle Hem',
    caption: 'Silky smooth surface finish ideal for clean branding, screenprints, or minimalist solids.',
  },
  {
    id: 'women-leggings',
    url: '/womens-leggings.png',
    title: 'Leggings & Athleisure',
    category: "Women's Stretch Knits",
    alt: "Women's charcoal and plum stretch leggings with flatlock seams by THRED VISION",
    specs: '220 GSM 95% Cotton 5% Spandex · 4-Way Stretch · Flatlock Chafeless Seams',
    caption: 'Exceptional elasticity, non-transparent knit density, and soft encased elastic waistbands.',
  },
  {
    id: 'women-jackets',
    url: '/womens-jackets.png',
    title: 'Jackets & Outerwear',
    category: "Women's Layering & Outerwear",
    alt: "Women's sand blazer and sage bomber jackets by THRED VISION",
    specs: '280 GSM Structured Twill · Metallic Snap Hardware · Clean Bound Seams',
    caption: 'Architectural cuts that hold structure while offering refined feminine proportions.',
  },
];

export const MANUFACTURING_STAGE_PHOTOS: PhotoAsset[] = [
  {
    id: 'stage-1-store',
    url: '/thred-vision-facility.jpg',
    title: 'Sampling, Fabric & Accessories Store',
    category: 'Material Quality Inspection',
    alt: 'Fabric rolls storage warehouse and inspection table for textile verification at THRED VISION',
    specs: '4-Point Fabric Inspection · 24h Textile Relaxation · Lot-by-Lot Shade Grading',
    caption: 'Incoming fabric rolls undergo shrinkage testing, yarn defect grading, and climate-controlled relaxation.',
  },
  {
    id: 'stage-2-cutting',
    url: '/assets/aistudio/WhatsApp_Image_2026-10-20_at_4.09.49_PM_1cc062c2.jpeg',
    title: 'Spreading, Marker Planning & Precision Cutting Section',
    category: 'Automated Cutting Line',
    alt: 'THRED VISION Cutting Section with CAD marker planning, Bullmer automated cutter, spreading tables, and bundling',
    specs: 'Bullmer Automated Cutting · Spreading Line · CAD Marker Planning · Progressive Bundling & Sorting',
    caption: 'Synchronized cutting operations with Bullmer automated cutting system and multi-ply vacuum spreading tables.',
  },
  {
    id: 'stage-3-sewing',
    url: '/pdf_img_1.jpg',
    title: '400+ MACHINES Sewing Assembly Floor',
    category: 'Stitching Lines',
    alt: 'Industrial sewing machine floor with operators assembling garments at THRED VISION',
    specs: '196 Single Needle · 25 Overlock 5-Thread · Kansai & Tirva Flatlock Lines',
    caption: 'Skilled machinists operate world-standard Juki and Kansai stations with inline SPI tension checks.',
  },
  {
    id: 'stage-4-qc',
    url: '/pdf_img_2.jpg',
    title: 'Washing & Multi-Point KQCP Inspection',
    category: 'End-to-End Auditing',
    alt: 'Quality control specialist checking garment seams, dimensional specs, and pull-test tolerance at THRED VISION',
    specs: '5 Key Quality Control Points (KQCP) · 100% Dimensional Audit · Metal Detection',
    caption: 'Garments undergo 100% measurement inspection, seam tensile tests, and metal needle detector sweeps.',
  },
  {
    id: 'stage-5-packing',
    url: '/factory-hero.jpg',
    title: 'Steam Pressing, Folding & Export Dispatch',
    category: 'Finishing & Logistics',
    alt: 'Finished garments steam-ironed on boiler tables, barcoded, and packed for export at THRED VISION',
    specs: '12 Boiler Steam Tables · Barcode Assortment Cartons · Global Port Despatch',
    caption: 'Boiler iron finishing, custom polybag packaging, and secure carton packing for seamless worldwide delivery.',
  },
];

export const CONTACT_PHOTO: PhotoAsset = {
  id: 'contact-backdrop',
  url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600',
  title: 'Manufacturing Operations Corridor',
  category: 'Industrial Complex',
  alt: 'THRED VISION manufacturing production facility background atmosphere in Ganjimutt',
  caption: 'Direct connectivity to New Mangalore Port (NMPT) and Bangalore National Highway.',
};
