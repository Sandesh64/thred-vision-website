const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function generateCompanyProfilePDF() {
  const pdfDoc = await PDFDocument.create();
  
  pdfDoc.setTitle('THRED VISION PROFILE-2(2)');
  pdfDoc.setAuthor('THRED VISION GARMENTS');
  pdfDoc.setSubject('Official Company Profile & Industrial Capacity Dossier');
  pdfDoc.setKeywords(['THRED VISION', 'Garment Manufacturing', 'Ganjimutt', 'Karnataka', 'Company Profile', 'Apparel']);
  pdfDoc.setProducer('THRED VISION Corporate Office');
  pdfDoc.setCreator('THRED VISION GARMENTS');

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const courier = await pdfDoc.embedFont(StandardFonts.Courier);
  const courierBold = await pdfDoc.embedFont(StandardFonts.CourierBold);

  // Load available images
  let imgExterior, imgStitching, imgQuality, imgHero;
  try {
    const extBytes = fs.readFileSync('public/assets/aistudio/WhatsApp_Image_2026-10-19_at_5.34.54_PM_0e9e84e7.jpeg');
    imgExterior = await pdfDoc.embedJpg(extBytes);
  } catch (e) {
    console.warn('Exterior image load error:', e.message);
  }

  try {
    const stitchBytes = fs.readFileSync('public/Screenshot 2026-10-12 151211.png');
    imgStitching = await pdfDoc.embedJpg(stitchBytes);
  } catch (e) {
    console.warn('Stitching image load error:', e.message);
  }

  try {
    const qualBytes = fs.readFileSync('public/Screenshot 2026-10-12 151313.png');
    imgQuality = await pdfDoc.embedJpg(qualBytes);
  } catch (e) {
    console.warn('Quality image load error:', e.message);
  }

  try {
    const heroBytes = fs.readFileSync('public/assets/aistudio/WhatsApp_Image_2026-10-19_at_5.34.54_PM_0e9e84e7.jpeg');
    imgHero = await pdfDoc.embedJpg(heroBytes);
  } catch (e) {
    console.warn('Hero image load error:', e.message);
  }

  const PAGE_WIDTH = 595.28; // A4
  const PAGE_HEIGHT = 841.89;

  // Colors
  const cForest = rgb(9/255, 40/255, 32/255);      // #092820
  const cDarkGreen = rgb(16/255, 60/255, 48/255);   // #103C30
  const cGold = rgb(200/255, 168/255, 117/255);    // #C8A875
  const cIvory = rgb(244/255, 240/255, 230/255);   // #F4F0E6
  const cCharcoal = rgb(32/255, 38/255, 34/255);   // #202622
  const cMuted = rgb(100/255, 110/255, 105/255);
  const cWhite = rgb(1, 1, 1);
  const cLightGray = rgb(240/255, 238/255, 232/255);
  const cBorder = rgb(215/255, 210/255, 200/255);

  function addHeaderFooter(page, pageNum, sectionTitle) {
    if (pageNum === 1) return; // Skip cover

    // Running Header
    page.drawRectangle({
      x: 36,
      y: PAGE_HEIGHT - 42,
      width: PAGE_WIDTH - 72,
      height: 1,
      color: cGold,
    });
    page.drawText('THRED VISION GARMENTS', {
      x: 36,
      y: PAGE_HEIGHT - 35,
      size: 8,
      font: helveticaBold,
      color: cDarkGreen,
    });
    page.drawText(`OFFICIAL DOSSIER · ${sectionTitle.toUpperCase()}`, {
      x: 180,
      y: PAGE_HEIGHT - 35,
      size: 7.5,
      font: helvetica,
      color: cMuted,
    });
    page.drawText('GANJIMUTT, KARNATAKA', {
      x: PAGE_WIDTH - 150,
      y: PAGE_HEIGHT - 35,
      size: 7.5,
      font: courier,
      color: cDarkGreen,
    });

    // Running Footer
    page.drawRectangle({
      x: 36,
      y: 42,
      width: PAGE_WIDTH - 72,
      height: 0.8,
      color: cBorder,
    });
    page.drawText('CONFIDENTIAL & PROPRIETARY · THRED VISION PROFILE', {
      x: 36,
      y: 30,
      size: 7,
      font: helvetica,
      color: cMuted,
    });
    page.drawText(`PAGE ${pageNum} OF 23`, {
      x: PAGE_WIDTH - 96,
      y: 30,
      size: 7.5,
      font: helveticaBold,
      color: cDarkGreen,
    });
  }

  function drawSectionBanner(page, title, subtitle) {
    page.drawRectangle({
      x: 36,
      y: PAGE_HEIGHT - 105,
      width: PAGE_WIDTH - 72,
      height: 48,
      color: cForest,
    });
    page.drawRectangle({
      x: 36,
      y: PAGE_HEIGHT - 105,
      width: 4,
      height: 48,
      color: cGold,
    });
    page.drawText(subtitle.toUpperCase(), {
      x: 50,
      y: PAGE_HEIGHT - 74,
      size: 8,
      font: helveticaBold,
      color: cGold,
    });
    page.drawText(title, {
      x: 50,
      y: PAGE_HEIGHT - 94,
      size: 15,
      font: helveticaBold,
      color: cWhite,
    });
  }

  function drawCard(page, x, y, width, height, title, lines) {
    page.drawRectangle({
      x,
      y,
      width,
      height,
      color: cLightGray,
      borderColor: cBorder,
      borderWidth: 0.8,
    });
    if (title) {
      page.drawRectangle({
        x,
        y: y + height - 22,
        width,
        height: 22,
        color: cDarkGreen,
      });
      page.drawText(title, {
        x: x + 10,
        y: y + height - 16,
        size: 9,
        font: helveticaBold,
        color: cWhite,
      });
    }
    let currentY = y + height - (title ? 38 : 16);
    for (const line of lines) {
      const textToDraw = typeof line === 'string' ? line : (line && typeof line.text === 'string' ? line.text : '');
      if (textToDraw && textToDraw.length > 0) {
        page.drawText(textToDraw, {
          x: x + 12,
          y: currentY,
          size: (typeof line === 'object' && line.size) ? line.size : 8.5,
          font: (typeof line === 'object' && line.bold) ? helveticaBold : ((typeof line === 'object' && line.mono) ? courier : helvetica),
          color: (typeof line === 'object' && line.color) ? line.color : cCharcoal,
        });
      }
      currentY -= (typeof line === 'object' && line.spacing) ? line.spacing : 14;
    }
  }

  // ==========================================
  // PAGE 1: COVER PAGE
  // ==========================================
  const page1 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  page1.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: cForest });
  // Gold framing border
  page1.drawRectangle({
    x: 24,
    y: 24,
    width: PAGE_WIDTH - 48,
    height: PAGE_HEIGHT - 48,
    borderColor: cGold,
    borderWidth: 1.5,
    color: cForest,
  });
  page1.drawRectangle({
    x: 28,
    y: 28,
    width: PAGE_WIDTH - 56,
    height: PAGE_HEIGHT - 56,
    borderColor: cGold,
    borderWidth: 0.5,
  });

  // Top header text
  page1.drawText('GOVERNMENT APPROVED READY-MADE GARMENT MANUFACTURER', {
    x: 95,
    y: PAGE_HEIGHT - 80,
    size: 9,
    font: helveticaBold,
    color: cGold,
  });

  // Main Emblem & Title
  page1.drawText('THRED VISION', {
    x: 105,
    y: PAGE_HEIGHT - 170,
    size: 44,
    font: helveticaBold,
    color: cWhite,
  });
  page1.drawText('DREAM TO DESIGN', {
    x: 205,
    y: PAGE_HEIGHT - 200,
    size: 14,
    font: helveticaBold,
    color: cGold,
  });

  page1.drawRectangle({
    x: 80,
    y: PAGE_HEIGHT - 225,
    width: PAGE_WIDTH - 160,
    height: 1,
    color: cGold,
  });

  page1.drawText('OFFICIAL CORPORATE PROFILE & INDUSTRIAL DOSSIER', {
    x: 110,
    y: PAGE_HEIGHT - 250,
    size: 11,
    font: helveticaBold,
    color: cIvory,
  });

  if (imgHero) {
    page1.drawImage(imgHero, {
      x: 60,
      y: PAGE_HEIGHT - 530,
      width: PAGE_WIDTH - 120,
      height: 250,
    });
    page1.drawRectangle({
      x: 60,
      y: PAGE_HEIGHT - 530,
      width: PAGE_WIDTH - 120,
      height: 250,
      borderColor: rgb(0.83, 0.69, 0.22),
      borderWidth: 1.5,
    });
  }

  // Cover credentials box
  page1.drawRectangle({
    x: 60,
    y: 110,
    width: PAGE_WIDTH - 120,
    height: 120,
    color: rgb(14/255, 50/255, 40/255),
    borderColor: cGold,
    borderWidth: 0.8,
  });

  page1.drawText('FACILITY LOCATION: SIDCO INDUSTRIAL ESTATE, GANJIMUTT, DAKSHINA KANNADA, KARNATAKA', {
    x: 75,
    y: 205,
    size: 8,
    font: courierBold,
    color: cGold,
  });
  page1.drawText('OPERATIONAL FOOTPRINT: 2 ACRES (UNIT 1 & UNIT 2) · BANGALORE HIGHWAY CORRIDOR', {
    x: 75,
    y: 188,
    size: 8,
    font: courier,
    color: cIvory,
  });
  page1.drawText('MACHINERY CAPACITY: 400+ MACHINES · 400+ WORKFORCE', {
    x: 75,
    y: 171,
    size: 8,
    font: courier,
    color: cIvory,
  });
  page1.drawText('MONTHLY PRODUCTION CAPACITY: 1L+ GARMENTS/MONTH', {
    x: 75,
    y: 154,
    size: 8,
    font: courierBold,
    color: cGold,
  });
  page1.drawText('MANAGEMENT: SUBHASH N \n& SANDESH N (MANAGING DIRECTORS) · DINESH CHANDRA (GM)', {
    x: 75,
    y: 137,
    size: 8,
    font: courier,
    color: cIvory,
  });
  page1.drawText('ESTABLISHED: 2022 · FACTORY LICENCE: MNG-3047/2022 · IEC: 0722019482', {
    x: 75,
    y: 120,
    size: 8,
    font: courier,
    color: cIvory,
  });

  page1.drawText('DOCUMENT ID: THRED VISION PROFILE-2(2).pdf · 23 PAGES COMPLETE', {
    x: 130,
    y: 50,
    size: 8,
    font: helveticaBold,
    color: cGold,
  });

  // ==========================================
  // PAGE 2: TABLE OF CONTENTS & EXECUTIVE SUMMARY
  // ==========================================
  const page2 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page2, 2, 'Table of Contents');
  drawSectionBanner(page2, 'Table of Contents & Executive Summary', 'Section 01 · Overview');

  drawCard(page2, 36, PAGE_HEIGHT - 380, PAGE_WIDTH - 72, 255, 'DOCUMENT INDEX (23 PAGES)', [
    { text: '01. Cover & Corporate Dossier Title Page ........................................... Page 01', bold: true },
    { text: '02. Table of Contents & Executive Summary ...................................... Page 02' },
    { text: '03. Corporate Charter, Vision & Mission Statements ............................. Page 03' },
    { text: '04. Plant Facility & Geographic Footprint (2 ACRES) ............................ Page 04' },
    { text: '05. Plant Facility Architecture — Photo Showcase ................................ Page 05' },
    { text: '06. Production Infrastructure & Floor Plan (Unit 1 & Unit 2) ................... Page 06' },
    { text: '07. Modern Machinery & Equipment (400+ MACHINES) ................................ Page 07' },
    { text: '08. Stitching Operations & Assembly Lines — Photo Showcase ...................... Page 08' },
    { text: '09. Professional Workforce Profile (400+ WORKFORCE) ............................. Page 09' },
    { text: '10. Production Capacity & Scale Parameters (1L+ GARMENTS/MONTH) ................. Page 10' },
    { text: '11. 5-Stage Precision Manufacturing Workflow ................................... Page 11' },
    { text: '12. Quality Assurance & Key Quality Control Points (KQCP) ....................... Page 12' },
    { text: '13. Quality Inspection Hall — Photo Showcase ................................... Page 13' },
    { text: '14. Men\'s Ready-Made Apparel Portfolio (Knits & Polos) ......................... Page 14' },
    { text: '15. Men\'s Ready-Made Apparel Portfolio (Wovens & Bottoms) ...................... Page 15' },
    { text: '16. Women\'s Ready-Made Apparel Portfolio (Tops, Dresses, Skirts) ................ Page 16' },
    { text: '17. Women\'s Ready-Made Apparel Portfolio (Pants, Kurtis, Outerwear) ............. Page 17' },
    { text: '18. Quality Standards, Fabric Testing & Dimensional Tolerances ................. Page 18' },
    { text: '19. Statutory Compliance — Karnataka Factories Act Licence ..................... Page 19' },
    { text: '20. Client Audit Approval — Reliance Apparels Vendor Audit .................... Page 20' },
    { text: '21. Foreign Trade & Tax Compliance — DGFT IEC Code & GSTIN ...................... Page 21' },
    { text: '22. Supply Chain Logistics & Bangalore Highway Transport Corridor .............. Page 22' },
    { text: '23. Commercial Engagement, Inquiries & Corporate Contacts ..................... Page 23', bold: true },
  ]);

  drawCard(page2, 36, 60, PAGE_WIDTH - 72, 280, 'EXECUTIVE SUMMARY', [
    { text: 'THRED VISION operates an integrated ready-made garment manufacturing complex spanning', size: 9 },
    { text: 'approximately two acres in the SIDCO Industrial Estate EPIP Phase 1, Ganjimutt, Karnataka.', size: 9 },
    { text: 'Established in 2022 along the vital Bangalore Highway industrial corridor, the enterprise provides', size: 9 },
    { text: 'end-to-end apparel engineering for domestic brands, retail labels, and export sourcing houses.', size: 9 },
    { text: '', size: 5 },
    { text: 'KEY OPERATING PARAMETERS:', bold: true, size: 9, color: cDarkGreen },
    { text: '• Facility Land: 2 ACRES at SIDCO Industrial Estate, Ganjimutt, Dakshina Kannada' },
    { text: '• Modern Machinery: 400+ MACHINES (advanced stitching, cutting, and finishing)' },
    { text: '• Dedicated Workforce: 400+ WORKFORCE including technicians, line supervisors and specialists' },
    { text: '• Monthly Production Capacity: 1L+ GARMENTS/MONTH across men\'s and women\'s lines' },
    { text: '• Order Flexibility: Minimum 10,000 pcs to large-scale batches of 2,00,000 pcs (2 Lakhs)' },
    { text: '• Certifications: Grade A Approved Reliance Vendor Audit, Factories Act Licence MNG-3047/2022' },
    { text: '• Global Trade Authorization: DGFT Import Export Code (IEC) 0722019482' },
  ]);

  // ==========================================
  // PAGE 3: CORPORATE CHARTER & IDENTITY
  // ==========================================
  const page3 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page3, 3, 'Corporate Charter & Identity');
  drawSectionBanner(page3, 'Corporate Charter, Vision & Mission', 'Section 02 · Company Profile');

  drawCard(page3, 36, PAGE_HEIGHT - 280, PAGE_WIDTH - 72, 160, 'REGISTERED BUSINESS IDENTITY', [
    { text: 'Legal Entity Name: THRED VISION GARMENTS', bold: true, size: 9.5 },
    { text: 'Year of Establishment: 2022' },
    { text: 'Managing Directors: Subhash N & Sandesh N' },
    { text: 'General Manager: Dinesh Chandra' },
    { text: 'Industry Sector: Ready-Made Garment Manufacturing & Apparel Export' },
    { text: 'Operating Address: No 11 P1-A, SIDCO Industrial Estate EPIP Phase 1, Badagaulipady Village,' },
    { text: '                  Ganjimutt, Dakshina Kannada, Karnataka, India - 574144' },
    { text: 'Strategic Corridor: Bangalore Highway Corridor, Mangalore Industrial Belt' },
  ]);

  drawCard(page3, 36, PAGE_HEIGHT - 510, PAGE_WIDTH - 72, 210, 'VISION & STRATEGIC MISSION', [
    { text: 'CORPORATE VISION:', bold: true, color: cDarkGreen, size: 9.5 },
    { text: 'To be India\'s premier high-precision ready-made garment manufacturing hub, delivering world-class' },
    { text: 'apparel quality through technological excellence, environmental stewardship, and sustainable operations.' },
    { text: '', size: 5 },
    { text: 'CORPORATE MISSION:', bold: true, color: cDarkGreen, size: 9.5 },
    { text: '1. Production Precision: Manufacture garments conforming strictly to buyer tech packs and international tolerances.' },
    { text: '2. Scalable Throughput: Deliver on-time consignments with an established monthly throughput of 1L+ GARMENTS/MONTH.' },
    { text: '3. Workforce Empowerment: Uphold worker safety, fair compensation, and skill advancement for our 400+ WORKFORCE.' },
    { text: '4. Quality Culture: Implement rigorous zero-defect multi-stage quality checkpoints from raw yarn to final pack.' },
  ]);

  drawCard(page3, 36, 60, PAGE_WIDTH - 72, 210, 'CORE VALUE PILLARS', [
    { text: '• INTEGRITY IN PRODUCTION: Transparent reporting on material yields, batch timelines, and cost structures.' },
    { text: '• RELENTLESS QUALITY CONTROL: Pre-production, in-line, end-line, and final AQL 1.5/2.5 inspection protocols.' },
    { text: '• TIMELY LOGISTICS: Rapid highway transit connecting Bangalore, regional dry ports, and Mangalore harbour.' },
    { text: '• CUSTOMER FOCUS: Dedicated merchandiser teams for seamless brand communication and sample turnaround.' },
  ]);

  // ==========================================
  // PAGE 4: PLANT FACILITY & FOOTPRINT (2 ACRES)
  // ==========================================
  const page4 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page4, 4, 'Plant Facility & Footprint');
  drawSectionBanner(page4, 'Plant Facility & Footprint (2 ACRES)', 'Section 03 · Manufacturing Complex');

  drawCard(page4, 36, PAGE_HEIGHT - 290, PAGE_WIDTH - 72, 170, 'GANJIMUTT INDUSTRIAL COMPLEX SPECIFICATIONS', [
    { text: 'Total Facility Footprint: 2 ACRES', bold: true, size: 10, color: cDarkGreen },
    { text: 'Industrial Zone: SIDCO Industrial Estate, Export Promotion Industrial Park (EPIP) Phase 1' },
    { text: 'Location: Ganjimutt, Badagaulipady Village, Dakshina Kannada District, Karnataka' },
    { text: 'Plant Units: Unit 1 and Unit 2 Integrated Manufacturing Buildings' },
    { text: 'Power Infrastructure: High-tension grid backed by 400 HP commercial power allocation' },
    { text: 'Water & Steam: Dedicated water treatment and industrial steam pressing utility loops' },
    { text: 'Environmental Compliance: Karnataka State Pollution Control Board clearance' },
  ]);

  drawCard(page4, 36, PAGE_HEIGHT - 540, PAGE_WIDTH - 72, 230, 'FACILITY HIGHLIGHTS & INFRASTRUCTURE MATRIX', [
    { text: '• UNIT 1 BUILDING: Housing the main fabric warehouse, raw material quarantine, precision CAD' },
    { text: '  cutting section, prototype sampling cell, and administrative management offices.' },
    { text: '' },
    { text: '• UNIT 2 BUILDING: Synchronized high-speed sewing lines (400+ MACHINES), progressive assembly' },
    { text: '  loops, thread trimming, intermediate KQCP stations, steam pressing, and export packing hall.' },
    { text: '' },
    { text: '• LOGISTICS YARD: Heavy vehicular container loading docks with weather-proof ramp access for' },
    { text: '  smooth freight transit directly onto the Bangalore Highway.' },
    { text: '' },
    { text: '• SECURITY & SAFETY: 24/7 CCTV surveillance, automated fire hydrant lines, smoke sensors,' },
    { text: '  and fully illuminated emergency exit corridors conforming to Factories Act standards.' },
  ]);

  drawCard(page4, 36, 60, PAGE_WIDTH - 72, 180, 'LOCATION STRATEGY', [
    { text: 'Situated 18 km east of Mangalore along the primary Bangalore Highway (NH 75 connector),', size: 9 },
    { text: 'the Ganjimutt manufacturing hub provides optimal transit access for both domestic fabric mills', size: 9 },
    { text: 'in Tamil Nadu/Karnataka and export shipment gateways via Mangalore Port and international airports.', size: 9 },
  ]);

  // ==========================================
  // PAGE 5: PLANT FACILITY EXTERIOR — PHOTO SHOWCASE
  // ==========================================
  const page5 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page5, 5, 'Facility Architecture');
  drawSectionBanner(page5, 'Plant Facility Architecture — Ganjimutt Complex', 'Section 03 · Industrial Facility');

  if (imgExterior) {
    page5.drawImage(imgExterior, {
      x: 36,
      y: PAGE_HEIGHT - 480,
      width: PAGE_WIDTH - 72,
      height: 360,
    });
    page5.drawRectangle({
      x: 36,
      y: PAGE_HEIGHT - 480,
      width: PAGE_WIDTH - 72,
      height: 360,
      borderColor: cGold,
      borderWidth: 1.5,
    });
  }

  drawCard(page5, 36, 60, PAGE_WIDTH - 72, 230, 'FACILITY VISUAL DOCUMENTATION & CREDENTIALS', [
    { text: 'PHOTOGRAPH 01: Modern 2 ACRES Industrial Plant Exterior', bold: true, color: cDarkGreen },
    { text: 'Location: SIDCO Industrial Estate EPIP Phase 1, Ganjimutt, Karnataka' },
    { text: 'Footprint: Spanning 2 ACRES with dedicated Unit 1 and Unit 2 infrastructure.' },
    { text: '' },
    { text: 'The facility was planned and engineered specifically for high-efficiency garment manufacturing,' },
    { text: 'incorporating daylighting roofs, forced-air industrial ventilation, and optimized material flows' },
    { text: 'from incoming fabric rolls to outbound export container cartons.' },
    { text: '' },
    { text: 'Validated under Karnataka Factories Act Licence # MNG-3047/2022.' , bold: true, color: cGold },
  ]);

  // ==========================================
  // PAGE 6: PRODUCTION INFRASTRUCTURE & FLOOR PLAN
  // ==========================================
  const page6 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page6, 6, 'Production Floor Plan');
  drawSectionBanner(page6, 'Production Floor Infrastructure & Workflow', 'Section 04 · Operations');

  drawCard(page6, 36, PAGE_HEIGHT - 320, PAGE_WIDTH - 72, 200, 'ZONAL DEPARTMENTAL LAYOUT', [
    { text: 'ZONE A: RAW MATERIAL & FABRIC WAREHOUSE (15,000 SQ FT)', bold: true, color: cDarkGreen },
    { text: '• Roll quarantine, 4-point fabric inspection frames, relaxation racks, GSM verification scales.' },
    { text: '' },
    { text: 'ZONE B: CAD PATTERN & AUTOMATED CUTTING SECTION (12,000 SQ FT)', bold: true, color: cDarkGreen },
    { text: '• Computerized marker nesting, multi-ply spreading tables, band-knife and straight-knife cutters.' },
    { text: '' },
    { text: 'ZONE C: SEWING & ASSEMBLY PRODUCTION FLOOR (35,000 SQ FT)', bold: true, color: cDarkGreen },
    { text: '• 400+ MACHINES organized in progressive bundling lines.' },
  ]);

  drawCard(page6, 36, PAGE_HEIGHT - 560, PAGE_WIDTH - 72, 220, 'ZONAL FINISHING & DISPATCH', [
    { text: 'ZONE D: QUALITY AUDIT & KQCP INSPECTION (8,000 SQ FT)', bold: true, color: cDarkGreen },
    { text: '• Inline audit checkpoints, seam symmetry benches, 100% measurement verification tables.' },
    { text: '' },
    { text: 'ZONE E: STEAM FINISHING, PRESSING & PACKING (10,000 SQ FT)', bold: true, color: cDarkGreen },
    { text: '• Industrial vacuum ironing tables, boiler steam irons, needle detection tunnels, export boxing.' },
    { text: '' },
    { text: 'ZONE F: FINISHED GOODS SECURE WAREHOUSE (10,000 SQ FT)', bold: true, color: cDarkGreen },
    { text: '• Heavy pallet racking, shrink wrapping, container staging docks.' },
  ]);

  drawCard(page6, 36, 60, PAGE_WIDTH - 72, 160, 'SAFETY & UTILITIES BACKBONE', [
    { text: '• Industrial transformer and silent generator backup ensuring 100% uptime for all 400+ MACHINES.' },
    { text: '• Compressed air ring-main supplying pneumatic cutters, thread suckers and auto-foot lifters.' },
    { text: '• Ergonomic anti-fatigue flooring, LED task lighting at every sewing needle point (500+ lux).' },
  ]);

  // ==========================================
  // PAGE 7: MODERN MACHINERY & EQUIPMENT (400+ MACHINES)
  // ==========================================
  const page7 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page7, 7, 'Machinery & Equipment');
  drawSectionBanner(page7, 'Modern Machinery Inventory — 400+ MACHINES', 'Section 04 · Equipment');

  drawCard(page7, 36, PAGE_HEIGHT - 340, PAGE_WIDTH - 72, 220, 'MACHINERY BREAKDOWN (400+ MACHINES)', [
    { text: 'EQUIPMENT CLASSIFICATION', bold: true, color: cDarkGreen },
    { text: '1. Single Needle Lockstitch (Direct Drive Servo): .............................. 220 Units', mono: true },
    { text: '   (Juki DDL series, Brother S-7200 with automatic thread trimmer)' },
    { text: '2. Overlock / Safety Stitch (3-Thread & 5-Thread): ............................. 85 Units', mono: true },
    { text: '   (Pegasus & Juki high-speed overedge machines for knits and wovens)' },
    { text: '3. Flatlock / Interlock Coverstitch: ........................................... 45 Units', mono: true },
    { text: '   (Kansai Special & Siruba cylinder bed and flatbed coverstitch)' },
    { text: '4. Specialized Machinery (Buttonhole, Button Attach, Bartack): .................. 25 Units', mono: true },
    { text: '   (Computerized electronic lockstitch buttonholers and bartackers)' },
    { text: '5. Cutting Room Equipment (Spreading, Straight Knife, Band Knife): ............ 15 Units', mono: true },
    { text: '6. Finishing Equipment (Vacuum Tables, Steam Boilers, Needle Detectors): ....... 10 Units', mono: true },
    { text: 'TOTAL ACTIVE PRODUCTION MACHINERY: 400+ MACHINES', bold: true, color: cGold, size: 9.5 },
  ]);

  drawCard(page7, 36, 60, PAGE_WIDTH - 72, 380, 'TECHNOLOGY ADVANTAGES', [
    { text: '• DIRECT-DRIVE ENERGY EFFICIENCY: 70% energy reduction compared to conventional clutch motors,' },
    { text: '  providing instantaneous needle acceleration and precision needle-stop positioning.' },
    { text: '' },
    { text: '• REDUCED DEFECT RATES: Electronic thread trimmers and automated backtacking minimize' },
    { text: '  operator fatigue and eliminate raw thread tails on finished garments.' },
    { text: '' },
    { text: '• MULTI-MATERIAL VERSATILITY: Workstations calibrated for delicate single-jersey knits (140 GSM)' },
    { text: '  through to heavy denim and twill trouser fabrics (380 GSM).' },
    { text: '' },
    { text: '• PREVENTIVE MAINTENANCE SYSTEM: Dedicated in-house mechanical engineering workshop' },
    { text: '  conducting scheduled oiling, timing audits, and gauge calibrations across all 400+ MACHINES.' },
  ]);

  // ==========================================
  // PAGE 8: STITCHING OPERATIONS — PHOTO SHOWCASE
  // ==========================================
  const page8 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page8, 8, 'Stitching Floor Showcase');
  drawSectionBanner(page8, 'Stitching Operations & Machinery in Action', 'Section 04 · Production Floor');

  if (imgStitching) {
    page8.drawImage(imgStitching, {
      x: 36,
      y: PAGE_HEIGHT - 480,
      width: PAGE_WIDTH - 72,
      height: 360,
    });
    page8.drawRectangle({
      x: 36,
      y: PAGE_HEIGHT - 480,
      width: PAGE_WIDTH - 72,
      height: 360,
      borderColor: cGold,
      borderWidth: 1.5,
    });
  }

  drawCard(page8, 36, 60, PAGE_WIDTH - 72, 230, 'PRODUCTION FLOOR DOCUMENTATION', [
    { text: 'PHOTOGRAPH 02: 400+ MACHINES in Operation', bold: true, color: cDarkGreen },
    { text: 'Location: Unit 2 Main Stitching Hall, THRED VISION Ganjimutt Plant' },
    { text: '' },
    { text: 'The photograph demonstrates the synchronized assembly lines running under bright industrial' },
    { text: 'lighting. Each workstation is engineered with individual LED task lights, progressive bundle trays,' },
    { text: 'and pneumatic thread vacuums.' },
    { text: '' },
    { text: 'High throughput line balancing enables continuous assembly of men\'s and women\'s garments' },
    { text: 'at an aggregate monthly capacity of 1L+ GARMENTS/MONTH.' },
  ]);

  // ==========================================
  // PAGE 9: WORKFORCE PROFILE & ORGANIZATIONAL STRUCTURE
  // ==========================================
  const page9 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page9, 9, 'Workforce & Leadership');
  drawSectionBanner(page9, 'Workforce Profile — 400+ WORKFORCE', 'Section 05 · Human Resources');

  drawCard(page9, 36, PAGE_HEIGHT - 320, PAGE_WIDTH - 72, 200, 'WORKFORCE DEMOGRAPHICS & STRUCTURE (400+ WORKFORCE)', [
    { text: 'DEPARTMENTAL ALLOCATION', bold: true, color: cDarkGreen },
    { text: '1. Executive Leadership & General Management: ................................... 12 Members', mono: true },
    { text: '   (Managing Director, General Manager, Production Head, QA Lead)' },
    { text: '2. Merchandising, Marketing & Sourcing Specialists: ............................ 18 Members', mono: true },
    { text: '3. CAD Pattern Engineers, Graders & Sample Masters: ............................ 15 Members', mono: true },
    { text: '4. Cutting Room Operators & Bundlers: .......................................... 35 Members', mono: true },
    { text: '5. Sewing Machine Technicians & Assembly Operators: ........................... 240 Members', mono: true },
    { text: '6. Quality Control Auditors (KQCP Gateways): ................................... 45 Members', mono: true },
    { text: '7. Steam Pressing, Packaging & Logistics Personnel: ........................... 35 Members', mono: true },
    { text: 'TOTAL DEDICATED WORKFORCE: 400+ WORKFORCE', bold: true, color: cGold, size: 9.5 },
  ]);

  drawCard(page9, 36, 60, PAGE_WIDTH - 72, 400, 'ETHICAL EMPLOYMENT & SOCIAL COMMITMENT', [
    { text: '• SKILLED TECHNICAL ADVANCEMENT: Regular onboarding and machine upgrade workshops' },
    { text: '  ensuring operators master complex lockstitch and coverstitch operations.' },
    { text: '' },
    { text: '• STATUTORY WELFARE COMPLIANCE: 100% adherence to Provident Fund (EPF), Employee State' },
    { text: '  Insurance (ESIC), fair wages, and overtime regulations under Karnataka Factories Act.' },
    { text: '' },
    { text: '• GENDER INCLUSION & SAFETY: Strict zero-harassment workplace protocols, dedicated women\'s' },
    { text: '  rest lounges, and transport provisions for late shifts.' },
    { text: '' },
    { text: '• LOCAL ECONOMIC EMPOWERMENT: Fostering skilled apparel manufacturing careers within' },
    { text: '  the Dakshina Kannada district, contributing to the regional industrial ecosystem.' },
  ]);

  // ==========================================
  // PAGE 10: PRODUCTION CAPACITY & SCALE PARAMETERS
  // ==========================================
  const page10 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page10, 10, 'Production Capacity');
  drawSectionBanner(page10, 'Production Capacity & Order Scale', 'Section 06 · Manufacturing Scale');

  drawCard(page10, 36, PAGE_HEIGHT - 280, PAGE_WIDTH - 72, 160, 'CAPACITY METRICS (1L+ GARMENTS/MONTH)', [
    { text: 'Monthly Stated Production Capacity: 1L+ GARMENTS/MONTH', bold: true, size: 10, color: cDarkGreen },
    { text: 'Annual Factory Capacity: 1.2 Million Ready-Made Garments' },
    { text: 'Shift Structure: Regular single 8-hour shift with provision for dual shifts during seasonal peaks' },
    { text: 'Daily Output Run-Rate: ~4,000 to 4,500 finished garments per working day' },
    { text: 'Production Lines: 8 synchronized flexible modular assembly lines' },
  ]);

  drawCard(page10, 36, PAGE_HEIGHT - 510, PAGE_WIDTH - 72, 210, 'ORDER QUANTITY BRACKETS & LEAD TIMES', [
    { text: 'TIER 1 — PILOT / CAPSULE COLLECTION (10,000 – 25,000 PCS)', bold: true, color: cDarkGreen },
    { text: '• Minimum Order Quantity (MOQ): 10,000 pieces per style/colorway.' },
    { text: '• Production Cycle: 30 to 40 days post approval of tech pack, lab dips, and proto samples.' },
    { text: '' },
    { text: 'TIER 2 — COMMERCIAL VOLUME RUN (25,000 – 1,00,000 PCS)', bold: true, color: cDarkGreen },
    { text: '• Standard commercial volume for retail apparel chains and international brands.' },
    { text: '• Production Cycle: 45 to 60 days with staggered partial dispatches.' },
    { text: '' },
    { text: 'TIER 3 — INDUSTRIAL SCALE RUN (1,00,000 – 2,00,000 PCS / 2 LAKHS)', bold: true, color: cDarkGreen },
    { text: '• Peak single-batch capacity accommodated across dedicated production lines.' },
  ]);

  drawCard(page10, 36, 60, PAGE_WIDTH - 72, 210, 'MATERIAL SOURCING CAPACITY', [
    { text: 'Our proximity to leading South Indian textile clusters (Tirupur, Coimbatore, Erode, Surat, Ahmedabad)', size: 9 },
    { text: 'enables rapid fabric procurement across 100% cotton, poly-cotton blends, linen, viscose, denim, and twill.', size: 9 },
  ]);

  // ==========================================
  // PAGE 11: 5-STAGE MANUFACTURING WORKFLOW
  // ==========================================
  const page11 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page11, 11, 'Manufacturing Workflow');
  drawSectionBanner(page11, '5-Stage Precision Manufacturing Workflow', 'Section 07 · Process Engineering');

  drawCard(page11, 36, PAGE_HEIGHT - 380, PAGE_WIDTH - 72, 260, 'END-TO-END APPAREL MANUFACTURING CYCLE', [
    { text: 'STAGE 01: MERCHANDISING, CAD PATTERNING & TECH-PACK REVIEW', bold: true, color: cDarkGreen },
    { text: '• Buyer tech-pack review, marker efficiency calculation, digital grading, pre-production sample sign-off.' },
    { text: '' },
    { text: 'STAGE 02: FABRIC QUARANTINE, RELAXATION & PRECISION CUTTING', bold: true, color: cDarkGreen },
    { text: '• 4-point fabric inspection, 24-hr fabric roll relaxation, automated tensionless spreading, knife cutting.' },
    { text: '' },
    { text: 'STAGE 03: ASSEMBLY & STITCHING ON 400+ MACHINES', bold: true, color: cDarkGreen },
    { text: '• Progressive bundle assembly, line-balanced feeding, specialized collar/pocket attachments.' },
    { text: '' },
    { text: 'STAGE 04: KEY QUALITY CONTROL POINTS (KQCP) & IN-LINE AUDITS', bold: true, color: cDarkGreen },
    { text: '• 100% seam audit, dimensional tolerance checks (±0.5 cm), tension and tensile stitch strength.' },
    { text: '' },
    { text: 'STAGE 05: STEAM FINISHING, METAL DETECTION & EXPORT CARTON PACKING', bold: true, color: cDarkGreen },
    { text: '• Form-finisher steam pressing, 9-point metal/needle detector gateway, barcoded export packaging.' },
  ]);

  drawCard(page11, 36, 60, PAGE_WIDTH - 72, 340, 'PROGRESSIVE BUNDLE CONTROL & TRACEABILITY', [
    { text: 'Every garment cut is tagged with an individual lot barcode tracking:' },
    { text: '• Mill fabric roll lot and dye lot number' },
    { text: '• Cutting table and spreader operator ID' },
    { text: '• Assembly line and machine cluster tracking' },
    { text: '• Assigned KQCP quality inspector' },
    { text: '' },
    { text: 'This end-to-end traceability guarantees prompt root-cause isolation in case of deviations,' },
    { text: 'safeguarding international buyers against lot inconsistencies or dye shade variance.' },
  ]);

  // ==========================================
  // PAGE 12: QUALITY ASSURANCE & KQCP GATEWAYS
  // ==========================================
  const page12 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page12, 12, 'Quality Management');
  drawSectionBanner(page12, 'Quality Assurance & KQCP Protocols', 'Section 08 · Quality Control');

  drawCard(page12, 36, PAGE_HEIGHT - 320, PAGE_WIDTH - 72, 200, 'KEY QUALITY CONTROL POINT (KQCP) GATES', [
    { text: 'GATEWAY 1 — RAW FABRIC & ACCESSORY AUDIT (INCOMING)', bold: true, color: cDarkGreen },
    { text: '• GSM test, shrinkage evaluation, rub-fastness, yarn count check, button pull test (min 90 N).' },
    { text: '' },
    { text: 'GATEWAY 2 — CUT-PIECE & BUNDLE ACCURACY AUDIT', bold: true, color: cDarkGreen },
    { text: '• Top-middle-bottom ply measurement comparison, notch alignment, grain-line precision.' },
    { text: '' },
    { text: 'GATEWAY 3 — IN-LINE SEWING AUDIT (CRITICAL STITCH POINTS)', bold: true, color: cDarkGreen },
    { text: '• SPI (Stitches Per Inch) check, tension balance, puckering audit, critical seam joining.' },
  ]);

  drawCard(page12, 36, PAGE_HEIGHT - 540, PAGE_WIDTH - 72, 200, 'END-LINE & PRE-SHIPMENT AUDITS', [
    { text: 'GATEWAY 4 — 100% END-LINE VISUAL & SPECIFICATION INSPECTION', bold: true, color: cDarkGreen },
    { text: '• Every garment inspected on illuminated inspection stands for skipped stitches, dirt, or oil stains.' },
    { text: '' },
    { text: 'GATEWAY 5 — FINAL RANDOM AQL AUDIT (ACCEPTANCE QUALITY LIMIT)', bold: true, color: cDarkGreen },
    { text: '• Conducted as per ISO 2859-1 / ANSI ASQ Z1.4 sampling plans at AQL 1.5 Major / 2.5 Minor levels.' },
    { text: '' },
    { text: 'GATEWAY 6 — FERROUS CONTAMINATION SCAN (NEEDLE DETECTOR)', bold: true, color: cDarkGreen },
    { text: '• 100% pass through calibrated 1.0 mm Fe / 1.2 mm Non-Fe conveyor metal detector tunnel.' },
  ]);

  drawCard(page12, 36, 60, PAGE_WIDTH - 72, 140, 'ZERO-TOLERANCE DEFECT POLICY', [
    { text: 'Non-conforming items are isolated immediately in designated red quarantine bins,' },
    { text: 'preventing accidental blending into finished carton despatches.' },
  ]);

  // ==========================================
  // PAGE 13: QUALITY INSPECTION HALL — PHOTO SHOWCASE
  // ==========================================
  const page13 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page13, 13, 'Quality Inspection Hall');
  drawSectionBanner(page13, 'Quality Inspection Hall — In-Line Audit', 'Section 08 · Quality Control');

  if (imgQuality) {
    page13.drawImage(imgQuality, {
      x: 36,
      y: PAGE_HEIGHT - 480,
      width: PAGE_WIDTH - 72,
      height: 360,
    });
    page13.drawRectangle({
      x: 36,
      y: PAGE_HEIGHT - 480,
      width: PAGE_WIDTH - 72,
      height: 360,
      borderColor: cGold,
      borderWidth: 1.5,
    });
  }

  drawCard(page13, 36, 60, PAGE_WIDTH - 72, 230, 'QUALITY CONTROL FACILITY DOCUMENTATION', [
    { text: 'PHOTOGRAPH 03: Garment Quality Audit & Specification Hall', bold: true, color: cDarkGreen },
    { text: 'Location: Unit 2 Inspection Department, THRED VISION Ganjimutt Plant' },
    { text: '' },
    { text: 'The photograph captures the specialized quality assurance team conducting rigorous' },
    { text: 'measurement tolerance and seam symmetry checks on finished ready-made garments.' },
    { text: '' },
    { text: 'Equipped with calibrated tape measures, tension gauges, and color evaluation lightboxes' },
    { text: '(D65/TL84/CWF), this division ensures full compliance with international buyer dossiers.' },
  ]);

  // ==========================================
  // PAGE 14: MEN'S READY-MADE APPAREL (KNITS & POLOS)
  // ==========================================
  const page14 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page14, 14, 'Men\'s Collection Part 1');
  drawSectionBanner(page14, 'Men\'s Apparel Portfolio — Knits & Casuals', 'Section 09 · Garment Categories');

  drawCard(page14, 36, PAGE_HEIGHT - 320, PAGE_WIDTH - 72, 200, 'CATEGORY 01: T-SHIRTS & CREWNECKS', [
    { text: 'Fabric Compositions: 100% Combed Cotton, Cotton/Modal, CVC, Poly-Cotton, Melange', bold: true },
    { text: 'Weight Range: 160 GSM to 240 GSM (Single Jersey, Interlock, Rib)' },
    { text: 'Finishing Options: Bio-wash, silicon wash, enzyme wash, peach finish, carbonized handfeel' },
    { text: 'Necklines: Classic crewneck, deep round neck, raw-edge, bound collar with twin-needle stitch' },
    { text: 'Print & Embroidery: Water-based discharge screen print, high-density plastisol, digital DTG, embroidery' },
    { text: 'Stitching Details: 4-thread overlock seam with reinforced neck-tape from shoulder to shoulder' },
  ]);

  drawCard(page14, 36, 60, PAGE_WIDTH - 72, 400, 'CATEGORY 02: POLO SHIRTS & HENLEYS', [
    { text: 'Fabric Compositions: 100% Combed Cotton Pique, Pique Poly-Spandex, Jacquard Knit', bold: true },
    { text: 'Weight Range: 200 GSM to 260 GSM (Heavy Pique, Honeycomb Pique)' },
    { text: 'Collar & Cuff: Engineered flat-knit ribbed collars and matching cuffs with elastane retention' },
    { text: 'Placket Construction: 2-button, 3-button fused placket with interlining and cross-stitched horn buttons' },
    { text: 'Side Vents: Herringbone tape reinforced side slits with bartack reinforcement' },
    { text: 'Fit Silhouettes: Modern Slim Fit, Regular Classic Fit, Athletic Tapered Fit' },
    { text: '' },
    { text: 'MANUFACTURING HIGHLIGHT:', bold: true, color: cDarkGreen },
    { text: 'Collar curl resistance achieved through pre-shrunk yarns and specialized fusing interlinings.' },
  ]);

  // ==========================================
  // PAGE 15: MEN'S READY-MADE APPAREL (WOVENS & BOTTOMS)
  // ==========================================
  const page15 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page15, 15, 'Men\'s Collection Part 2');
  drawSectionBanner(page15, 'Men\'s Apparel Portfolio — Shirts & Bottoms', 'Section 09 · Garment Categories');

  drawCard(page15, 36, PAGE_HEIGHT - 300, PAGE_WIDTH - 72, 180, 'CATEGORY 03 & 04: FORMAL & CASUAL SHIRTS', [
    { text: 'Fabric Compositions: 100% Giza/Supima Cotton, Cotton-Linen, Oxford Weave, Poplin, Twill', bold: true },
    { text: 'Counts: 40s, 50s, 60s, 80/2, 100/2 yarn counts' },
    { text: 'Collar Types: Cutaway spread, semi-spread, button-down, mandarin band collar' },
    { text: 'Cuffs: Single-button rounded, double-button mitered, French cuff' },
    { text: 'Seam Construction: Single-needle French seam side joins (16-18 SPI) with gusset reinforcements' },
  ]);

  drawCard(page15, 36, 60, PAGE_WIDTH - 72, 420, 'CATEGORY 05 & 06: TROUSERS, JEANS & SHORTS', [
    { text: 'CHINOS & CASUAL TROUSERS:', bold: true, color: cDarkGreen },
    { text: '• Cotton twill, cotton spandex stretch twill, satin stretch (220 - 320 GSM)' },
    { text: '• Blind-stitched bottom hems, clean-finished piped interior waistband, heavy-duty YKK metal zippers' },
    { text: '' },
    { text: 'DENIM JEANS & BOTTOMS:', bold: true, color: cDarkGreen },
    { text: '• 10 oz to 14.5 oz rigid and stretch indigo denim (cotton-elastane)' },
    { text: '• Multi-needle chain-stitch waistband and yoke, rivet reinforced stress points, stone/enzyme wash' },
    { text: '' },
    { text: 'BERMUDA & CARGO SHORTS:', bold: true, color: cDarkGreen },
    { text: '• Structured canvas and poplin utility shorts with bellows pockets and double-needle topstitching' },
  ]);

  // ==========================================
  // PAGE 16: WOMEN'S READY-MADE APPAREL (TOPS & DRESSES)
  // ==========================================
  const page16 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page16, 16, 'Women\'s Collection Part 1');
  drawSectionBanner(page16, 'Women\'s Apparel Portfolio — Tops & Dresses', 'Section 10 · Garment Categories');

  drawCard(page16, 36, PAGE_HEIGHT - 320, PAGE_WIDTH - 72, 200, 'CATEGORY 01: TOPS & FASHION BLOUSES', [
    { text: 'Fabrics: Cotton Voile, Modal, Viscose Rayon, Georgette, Silk Blends, Poplin, Lyocell', bold: true },
    { text: 'Weight Range: 80 GSM to 160 GSM lightweight flowing weaves' },
    { text: 'Design Elements: Ruffles, pleats, smocking, peplum hems, puff sleeves, button-front details' },
    { text: 'Finishing: Baby-hems, rolled hems, French seams on sheer fabrics, keyhole back closures' },
    { text: 'Fits: Relaxed drape, tailored contour, cropped silhouette, wrap styles' },
  ]);

  drawCard(page16, 36, 60, PAGE_WIDTH - 72, 400, 'CATEGORY 02: DRESSES & SKIRTS', [
    { text: 'DRESS VARIATIONS:', bold: true, color: cDarkGreen },
    { text: '• Day dresses, shirt dresses, tier dresses, A-line midi dresses, slip dresses, bodycon knits' },
    { text: '• Concealed invisible back zippers (YKK), elasticated waist shirring, matching fabric belts' },
    { text: '' },
    { text: 'SKIRT VARIATIONS:', bold: true, color: cDarkGreen },
    { text: '• Knife-pleated skirts, bias-cut satin skirts, wrap midi skirts, denim mini and midi skirts' },
    { text: '• Full interior poly/cotton lining, blind-stitched hems, reinforced waistband facing' },
    { text: '' },
    { text: 'PRECISION CRAFTSMANSHIP:', bold: true },
    { text: 'Engineered pattern matching across plaids, stripes, and large floral engineered prints.' },
  ]);

  // ==========================================
  // PAGE 17: WOMEN'S READY-MADE APPAREL (PANTS & KURTIS)
  // ==========================================
  const page17 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page17, 17, 'Women\'s Collection Part 2');
  drawSectionBanner(page17, 'Women\'s Portfolio — Bottoms, Kurtis & Outerwear', 'Section 10 · Garment Categories');

  drawCard(page17, 36, PAGE_HEIGHT - 300, PAGE_WIDTH - 72, 180, 'CATEGORY 03: PANTS, TROUSERS & PALAZZOS', [
    { text: 'Fabrics: Linen-Cotton, Stretch Ponti, Viscose Twill, Cotton Lycra, Tencel', bold: true },
    { text: 'Silhouettes: Wide-leg trousers, tailored cigarette pants, culottes, elasticated joggers' },
    { text: 'Waistband Details: Half-elasticated comfort bands, belt loops, extended tab closures with hidden hooks' },
    { text: 'Pockets: Functional slant front pockets, jet back faux pockets, cargo utility options' },
  ]);

  drawCard(page17, 36, 60, PAGE_WIDTH - 72, 420, 'CATEGORY 04: KURTIS, LEGGINGS & JACKETS', [
    { text: 'KURTIS & ETHNIC-FUSION TOPS:', bold: true, color: cDarkGreen },
    { text: '• Straight kurtis, Anarkali cuts, high-low hem kurtas, front-slit tunics' },
    { text: '• Cotton cambric, slub cotton, rayon flex, chanderi silk blends with delicate embroidery/lace trim' },
    { text: '' },
    { text: 'LEGGINGS & ANKLE TIGHTS:', bold: true, color: cDarkGreen },
    { text: '• 95% Combed Cotton / 5% Spandex (200 - 240 GSM 4-way stretch knit)' },
    { text: '• Flatlock 4-needle 6-thread seamless stitching for non-chafing durability and recovery' },
    { text: '' },
    { text: 'LIGHT JACKETS & OVERSHIRTS:', bold: true, color: cDarkGreen },
    { text: '• Unlined summer blazers, utility overshirts in twill, cropped denim jackets' },
  ]);

  // ==========================================
  // PAGE 18: FABRIC TESTING & DIMENSIONAL TOLERANCES
  // ==========================================
  const page18 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page18, 18, 'Testing & Standards');
  drawSectionBanner(page18, 'Fabric Testing & Dimensional Tolerances', 'Section 11 · Quality Standards');

  drawCard(page18, 36, PAGE_HEIGHT - 320, PAGE_WIDTH - 72, 200, 'PHYSICAL & CHEMICAL TEST CRITERIA', [
    { text: '1. Dimensional Stability (Washing Shrinkage): .......................... Max ±3% (Warp & Weft)', mono: true },
    { text: '   (Tested as per ISO 6330 / AATCC 135 after 3 consecutive home launder cycles)' },
    { text: '2. Color Fastness to Washing: ........................................... Grade 4 - 5', mono: true },
    { text: '   (ISO 105-C06 / AATCC 61 evaluation on multi-fiber adjacent strips)' },
    { text: '3. Color Fastness to Rubbing (Dry / Wet Crock): ......................... Grade 4 (Dry) / 3-4 (Wet)', mono: true },
    { text: '4. Seam Slippage & Tensile Strength: ................................... Min 120 N seam pull', mono: true },
    { text: '5. Pilling Resistance: ................................................. Grade 4 after 2,000 rubs', mono: true },
  ]);

  drawCard(page18, 36, 60, PAGE_WIDTH - 72, 400, 'STANDARD TOLERANCE TABLE (READY-MADE APPAREL)', [
    { text: 'DIMENSION PARAMETER', bold: true, color: cDarkGreen },
    { text: '• Chest / Bust Half-Circumference: ...................................... ±0.5 cm', mono: true },
    { text: '• Body Length (From High Point Shoulder): ............................... ±0.75 cm', mono: true },
    { text: '• Shoulder Width (Seam to Seam): ........................................ ±0.5 cm', mono: true },
    { text: '• Sleeve Length: ........................................................ ±0.5 cm', mono: true },
    { text: '• Waistband Half-Width: ................................................. ±0.5 cm', mono: true },
    { text: '• Inseam Length (Bottoms): .............................................. ±0.75 cm', mono: true },
    { text: '• Stitches Per Inch (SPI): .............................................. 12 - 14 SPI (Knits) / 14 - 16 SPI (Wovens)', mono: true },
    { text: '' },
    { text: 'Every critical dimension is audited across sample size sets prior to cutting marker release.' },
  ]);

  // ==========================================
  // PAGE 19: FACTORIES ACT LICENCE COMPLIANCE
  // ==========================================
  const page19 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page19, 19, 'Factories Act Licence');
  drawSectionBanner(page19, 'Statutory Compliance — Factories Act Licence', 'Section 12 · Regulatory Compliance');

  drawCard(page19, 36, PAGE_HEIGHT - 320, PAGE_WIDTH - 72, 200, 'GOVERNMENT OF KARNATAKA — FACTORIES ACT 1948', [
    { text: 'REGISTRATION CERTIFICATE & OPERATING LICENCE', bold: true, color: cDarkGreen },
    { text: 'Licence Reference Number: MNG-3047/2022', bold: true, size: 10, color: cGold },
    { text: 'Issuing Authority: Directorate of Factories, Boilers, Industrial Safety & Health' },
    { text: 'Jurisdiction: Mangalore Region, Government of Karnataka' },
    { text: 'Factory Name: THRED VISION GARMENTS' },
    { text: 'Premises: Plot No 11 P1-A, SIDCO Industrial Estate EPIP Phase 1, Ganjimutt - 574144' },
    { text: 'Installed Power Capacity: 400 HP Commercial Grid Sanction' },
    { text: 'Approved Maximum Workforce: 400+ WORKFORCE' },
    { text: 'Status: Fully Valid, Active & Regulatory Compliant' },
  ]);

  drawCard(page19, 36, 60, PAGE_WIDTH - 72, 400, 'STATUTORY SAFETY & OCCUPATIONAL HEALTH MANDATES', [
    { text: '• OCCUPATIONAL SAFETY: Mechanical needle guards on all 400+ workstations, pulley guards,' },
    { text: '  and eye shields on automated button attachment machinery.' },
    { text: '' },
    { text: '• FIRE SAFETY MEASURES: Fire suppression system inspected and certified annually with' },
    { text: '  clearly designated fire escape routes, illuminated signage, and trained fire wardens.' },
    { text: '' },
    { text: '• FIRST AID & HEALTHCARE: Fully stocked first-aid medical station on the plant floor with' },
    { text: '  retainer medical officer and tie-up with nearby tertiary hospital in Mangalore.' },
    { text: '' },
    { text: '• AMENITIES: Reverse-osmosis (RO) chilled drinking water points, clean sanitary washrooms,' },
    { text: '  and spacious staff cafeteria adhering strictly to Factories Act guidelines.' },
  ]);

  // ==========================================
  // PAGE 20: CLIENT AUDIT — RELIANCE APPARELS VENDOR AUDIT
  // ==========================================
  const page20 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page20, 20, 'Client Vendor Audit');
  drawSectionBanner(page20, 'Client Audit Approval — Reliance Apparels Audit', 'Section 13 · Customer Certifications');

  drawCard(page20, 36, PAGE_HEIGHT - 320, PAGE_WIDTH - 72, 200, 'AUDIT APPROVAL SUMMARY', [
    { text: 'RELIANCE RETAIL LIMITED — APPARELS SOURCING DIVISION', bold: true, color: cDarkGreen },
    { text: 'Audit Report Number: SMART101313', bold: true, size: 10, color: cGold },
    { text: 'Vendor Entity Audited: THRED VISION GARMENTS' },
    { text: 'Audit Assessment Grade: GRADE A (APPROVED VENDOR)', bold: true, color: cDarkGreen },
    { text: 'Audit Category: Quality Management Systems, Technical Capability & Social Compliance' },
    { text: 'Scope: Manufacturing of Men\'s & Women\'s Ready-Made Apparel' },
    { text: 'Authorization: Approved for National Retail Distribution & Private Label Manufacturing' },
  ]);

  drawCard(page20, 36, 60, PAGE_WIDTH - 72, 400, 'AUDITED SYSTEM COMPETENCIES', [
    { text: '1. FABRIC STORAGE & LOT ACCURACY: Scored 94% on traceability and climate protection.' },
    { text: '2. CUTTING ROOM QUALITY & SPREADING: Scored 96% on marker accuracy and notch tolerances.' },
    { text: '3. SEWING LINE EFFICIENCY & CALIBRATION: Scored 95% on machine maintenance and calibration logs.' },
    { text: '4. QUALITY ASSURANCE GATES (KQCP): Scored 98% on inline auditing and defect reporting.' },
    { text: '5. ETHICAL LABOUR & SAFETY AUDIT: Scored 100% on wage compliance, working hours and safety.' },
    { text: '' },
    { text: 'CONCLUSION OF AUDIT REPORT SMART101313:', bold: true, color: cDarkGreen },
    { text: '"THRED VISION operates an exceptionally well-maintained manufacturing unit in Ganjimutt.' },
    { text: 'Management demonstrates high commitment to quality, workforce welfare, and buyer protocols.' },
    { text: 'Recommended as Grade A preferred vendor for volume retail production."' },
  ]);

  // ==========================================
  // PAGE 21: FOREIGN TRADE & TAXATION (DGFT & GST)
  // ==========================================
  const page21 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page21, 21, 'Trade & Tax Registration');
  drawSectionBanner(page21, 'Foreign Trade & Tax Compliance Credentials', 'Section 14 · Commercial Authorization');

  drawCard(page21, 36, PAGE_HEIGHT - 320, PAGE_WIDTH - 72, 200, 'DIRECTORATE GENERAL OF FOREIGN TRADE (DGFT)', [
    { text: 'GOVERNMENT OF INDIA — MINISTRY OF COMMERCE & INDUSTRY', bold: true, color: cDarkGreen },
    { text: 'Import Export Code (IEC): 0722019482', bold: true, size: 10, color: cGold },
    { text: 'Registered Firm: THRED VISION GARMENTS' },
    { text: 'Issuing Regional Authority: Joint DGFT, Bangalore / Mangalore' },
    { text: 'Authorization Type: Commercial Exporter & Importer of Textile Goods' },
    { text: 'Authorized Ports: All Seaports, Air Cargo Complexes, and Inland Container Depots (ICD)' },
    { text: 'Export Promotion Council: Registered with Apparel Export Promotion Council (AEPC)' },
  ]);

  drawCard(page21, 36, 60, PAGE_WIDTH - 72, 400, 'GOODS & SERVICES TAX (GST) REGISTRATION', [
    { text: 'CENTRAL BOARD OF INDIRECT TAXES & CUSTOMS (CBIC)', bold: true, color: cDarkGreen },
    { text: 'Goods & Services Tax Identification Number (GSTIN): 29AAGCT2914K1ZK', bold: true, size: 9.5, color: cGold },
    { text: 'Legal Name of Business: THRED VISION GARMENTS' },
    { text: 'Taxpayer Type: Regular Taxpayer' },
    { text: 'State Code: 29 (Karnataka)' },
    { text: 'Filing Status: Active, Up to Date, Regular Compliance' },
    { text: '' },
    { text: 'BANKING & COMMERCIAL PARTICULARS:', bold: true, color: cDarkGreen },
    { text: '• Primary Corporate Bankers: Scheduled Commercial Bank, Mangalore Industrial Branch' },
    { text: '• Foreign Exchange Facilities: Active Export Letter of Credit (LC), DA/DP and wire transfer facility' },
    { text: '• Currency Capabilities: INR, USD, EUR, GBP trade settlements' },
  ]);

  // ==========================================
  // PAGE 22: SUPPLY CHAIN LOGISTICS & CORRIDOR
  // ==========================================
  const page22 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page22, 22, 'Logistics & Supply Chain');
  drawSectionBanner(page22, 'Supply Chain Logistics & Bangalore Highway Corridor', 'Section 15 · Transit Infrastructure');

  drawCard(page22, 36, PAGE_HEIGHT - 320, PAGE_WIDTH - 72, 200, 'STRATEGIC HIGHWAY & PORT CONNECTIVITY', [
    { text: 'LOCATION ADVANTAGE: GANJIMUTT INDUSTRIAL HUB', bold: true, color: cDarkGreen },
    { text: '• Highway Access: Directly situated on the Bangalore Highway corridor (NH 75 connector),' },
    { text: '  facilitating rapid 6-hour freight movement to Bangalore distribution hubs.' },
    { text: '' },
    { text: '• Seaport Proximity: 22 km to New Mangalore Port (NMPT), offering weekly container line' },
    { text: '  sailings to Dubai (Jebel Ali), Singapore, Colombo, Europe, and the United States.' },
    { text: '' },
    { text: '• Airport Connectivity: 14 km to Mangalore International Airport (IXE) with dedicated air cargo' },
    { text: '  complex for urgent buyer sampling, proto approvals, and high-priority consignments.' },
  ]);

  drawCard(page22, 36, 60, PAGE_WIDTH - 72, 400, 'RAW MATERIAL INFLOW & CONTAINER DESPATCH', [
    { text: 'INBOUND TEXTILE LOGISTICS:', bold: true, color: cDarkGreen },
    { text: '• Yarn and fabric consignments transit directly from spinning and knitting hubs in Tamil Nadu' },
    { text: '  (Tirupur, Erode, Coimbatore) via dedicated express container trucks within 24 to 36 hours.' },
    { text: '' },
    { text: 'OUTBOUND CARTON PACKING & CONTAINERIZATION:', bold: true, color: cDarkGreen },
    { text: '• Export standard 7-ply corrugated export cartons strapped with polypropylene bands.' },
    { text: '• Moisture barrier desiccants and shrink-wrapped palletization for ocean transit protection.' },
    { text: '• Factory container stuffing capabilities with customs sealing and weighbridge clearance.' },
  ]);

  // ==========================================
  // PAGE 23: CONTACT DOSSIER & COMMERCIAL ENGAGEMENT
  // ==========================================
  const page23 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  addHeaderFooter(page23, 23, 'Commercial Contacts');
  drawSectionBanner(page23, 'Commercial Engagement & Official Contacts', 'Section 16 · Contact Information');

  drawCard(page23, 36, PAGE_HEIGHT - 300, PAGE_WIDTH - 72, 180, 'CORPORATE HEADQUARTERS & MANUFACTURING FACILITY', [
    { text: 'THRED VISION GARMENTS', bold: true, size: 11, color: cDarkGreen },
    { text: 'Factory Address: Hobli Gurpura, No 11 P1-A, SIDCO Industrial Estate EPIP Phase 1,' },
    { text: '                 Badagaulipady Village, Ganjimutt, Dakshina Kannada, Karnataka, India - 574144' },
    { text: 'Operating Hours: Monday through Saturday, 09:00 AM to 06:30 PM IST' },
    { text: 'General Inquiries: info@thredvision.com' },
    { text: 'Official Website: https://thredvision.com' },
  ]);

  drawCard(page23, 36, PAGE_HEIGHT - 530, PAGE_WIDTH - 72, 210, 'KEY EXECUTIVE CONTACTS', [
    { text: 'MANAGING DIRECTORS', bold: true, color: cDarkGreen },
    { text: 'Subhash N: +91 6362815418' },
    { text: 'Sandesh N: +91 6361761033' },
    { text: '' },
    { text: 'GENERAL MANAGER', bold: true, color: cDarkGreen },
    { text: 'Dinesh Chandra' },
    { text: 'Direct Phone: +91 9980546369 / +91 8105334689' },
    { text: 'Email: info@thredvision.com' },
  ]);

  // Corporate Sign-off & Seal Box
  page23.drawRectangle({
    x: 36,
    y: 60,
    width: PAGE_WIDTH - 72,
    height: 140,
    color: cForest,
    borderColor: cGold,
    borderWidth: 1,
  });

  page23.drawText('CORPORATE AUTHORIZATION & DOSSIER AUTHENTICATION', {
    x: 50,
    y: 175,
    size: 8.5,
    font: helveticaBold,
    color: cGold,
  });
  page23.drawText('This official company profile and capability dossier represents the verified operating status,', {
    x: 50,
    y: 155,
    size: 8,
    font: helvetica,
    color: cWhite,
  });
  page23.drawText('machinery inventory, and statutory compliance parameters of THRED VISION GARMENTS.', {
    x: 50,
    y: 142,
    size: 8,
    font: helvetica,
    color: cWhite,
  });
  page23.drawText('ISSUED FOR: CLIENT ONBOARDING, RETAIL BRAND AUDITS & EXPORT SOURCING PARTNERSHIPS', {
    x: 50,
    y: 122,
    size: 7.5,
    font: courierBold,
    color: cGold,
  });
  page23.drawText('MANAGING DIRECTORS: Subhash N & Sandesh N    GENERAL MANAGER: Dinesh Chandra', {
    x: 50,
    y: 95,
    size: 9,
    font: helveticaBold,
    color: cIvory,
  });
  page23.drawText('THRED VISION GARMENTS · GANJIMUTT, KARNATAKA, INDIA · ESTD 2022', {
    x: 50,
    y: 75,
    size: 7.5,
    font: helvetica,
    color: cGold,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

generateCompanyProfilePDF()
  .then((bytes) => {
    const targetPath1 = path.join(process.cwd(), 'public', 'THRED VISION PROFILE-2(2).pdf');
    const targetPath2 = path.join(process.cwd(), 'public', 'THRED%20VISION%20PROFILE-2(2).pdf');
    const targetPath3 = path.join(process.cwd(), 'public', 'thred-vision-profile.pdf');
    
    fs.writeFileSync(targetPath1, bytes);
    fs.writeFileSync(targetPath2, bytes);
    fs.writeFileSync(targetPath3, bytes);

    // Also write to dist/ if it exists
    if (fs.existsSync('dist')) {
      fs.writeFileSync(path.join(process.cwd(), 'dist', 'THRED VISION PROFILE-2(2).pdf'), bytes);
      fs.writeFileSync(path.join(process.cwd(), 'dist', 'THRED%20VISION%20PROFILE-2(2).pdf'), bytes);
      fs.writeFileSync(path.join(process.cwd(), 'dist', 'thred-vision-profile.pdf'), bytes);
    }

    console.log(`Successfully generated 23-page PDF dossier (${bytes.length} bytes) at:`);
    console.log(`- ${targetPath1}`);
    console.log(`- ${targetPath2}`);
    console.log(`- ${targetPath3}`);
  })
  .catch((err) => {
    console.error('Error generating PDF:', err);
    process.exit(1);
  });
