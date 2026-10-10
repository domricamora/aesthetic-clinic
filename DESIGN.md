---
name: Patrice Beauty Lounge Aesthetics
description: Physician-led aesthetic clinic and its platform, set as a calm, warm treatment room.
colors:
  canvas: "#FBF6F3"
  soft-rose: "#F8EEEA"
  blush: "#F2E3DD"
  clay: "#C4877A"
  clay-deep: "#A4604F"
  clay-ink: "#8E4E3F"
  champagne: "#E6C2B3"
  cocoa: "#3B2A28"
  cocoa-deep: "#2A1E1C"
  text: "#5C4844"
  muted-text: "#7A6460"
  hairline: "#ECDCD5"
  input-stroke: "#E2CDC5"
  card-white: "#FFFFFF"
  destructive: "#B42318"
  chart-1: "#B4553F"
  chart-2: "#008F9E"
  chart-3: "#B8860B"
  chart-4: "#7B5BA6"
  chart-5: "#4F8F3A"
  chart-1-dark: "#C96A52"
  chart-2-dark: "#14949F"
  chart-3-dark: "#B98A20"
  chart-4-dark: "#8E6EC0"
  chart-5-dark: "#5E9848"
typography:
  display:
    fontFamily: "Gilda Display, Didot, Georgia, serif"
    fontSize: "4.25rem"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Gilda Display, Didot, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Gilda Display, Didot, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1.25
  figure:
    fontFamily: "Gilda Display, Didot, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 400
    fontFeature: "tnum, lnum"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  body-lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.25
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "16px"
  full: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "32px"
  gutter-lg: "48px"
  measure: "82rem"
  section: "80px"
  section-lg: "112px"
components:
  button-primary:
    backgroundColor: "{colors.clay-deep}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.md}"
    padding: "12.8px 25.6px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.clay-ink}"
    textColor: "{colors.card-white}"
  button-outline:
    backgroundColor: "rgb(255 255 255 / 0.4)"
    textColor: "{colors.clay-ink}"
    rounded: "{rounded.md}"
    padding: "12.8px 25.6px"
  button-outline-hover:
    backgroundColor: "{colors.card-white}"
  button-quiet:
    backgroundColor: "{colors.soft-rose}"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-quiet-hover:
    backgroundColor: "{colors.blush}"
  soft-card:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
    padding: "32px"
  input:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.cocoa}"
    rounded: "{rounded.md}"
    height: "48px"
    padding: "0 16px"
  avatar:
    backgroundColor: "{colors.soft-rose}"
    textColor: "{colors.clay-ink}"
    rounded: "{rounded.full}"
    size: "40px"
---

# Design System: Patrice Beauty Lounge Aesthetics

## Overview

**Creative North Star: "The Warm Treatment Room"**

The clinic should feel like a calm, warm room you can step into: rose-tinted light, blush walls, a classical serif on the door, white cards set down softly on a counter. Every surface is warm; nothing is grey, nothing is black. The palette steps from a pale rose canvas through blush fields to a rose clay for action and a deep cocoa for ink, so the whole product reads as one material.

Density is relaxed on the public site (generous bands, one idea per band) and working-dense in the admin, where the same palette and corners carry tables, charts and figures. The serif is the signature; the sans does the work. Full-width colour bands alternate canvas, blush and soft rose, with content held to one measure inside them.

The system refuses the category default: a centred stock hero over three icon cards and a pastel gradient. Depth is soft and warm (cocoa-tinted long shadows), motion is a quiet settle, never a show.

**Key Characteristics:**
- Rose-tinted canvas, blush and soft-rose bands, edge to edge; content in an 82rem measure.
- Gilda Display at one weight for headings and figures; Geist for everything read.
- Soft 10px corner family on cards, media, controls; avatars round.
- White cards with hairlines and cocoa-tinted long shadows.
- One authored motion (the hero rise); everything else is a short ease-out state change.

## Colors

A single warm hue family from rose canvas to cocoa, with one pale rose-gold accent reserved for dark fields.

### Primary
- **Rose Clay Deep** (clay-deep): every filled action (Book now, Book a consultation, Send enquiry). Takes white text at 4.8:1. Hover deepens to Clay Ink.
- **Clay Ink** (clay-ink): links, small emphasis, form errors, the upright emphasised word in a heading. 5.9:1 on canvas.
- **Rose Clay** (clay): fills, rules, focus rings, outline-button strokes, nav underline, large shapes only. 2.8:1, so never text.

### Secondary
- **Champagne** (champagne): the one accent, a pale rose-gold. Used only on cocoa fields: links in the showcase strip, focus rings on dark, the selection highlight. Takes cocoa text at 9:1.

### Neutral
- **Rose Canvas** (canvas): page background.
- **Soft Rose** (soft-rose): alternate band, quiet buttons, avatar wells, footer.
- **Blush** (blush): signature and review bands, image wells behind photographs.
- **Cocoa** (cocoa): headings, dark fields (hero wash base, toasts), 12.7:1 on canvas.
- **Cocoa Deep** (cocoa-deep): the showcase strip; the hero wash gradient.
- **Warm Text** (text): body copy, 7.9:1 on canvas.
- **Muted Text** (muted-text): metadata, durations, captions.
- **Hairline** (hairline) and **Input Stroke** (input-stroke): borders and field strokes.
- **Card White** (card-white): card faces, field fills.

### Data
- **Chart series 1-5** (chart-1..chart-5, with chart-*-dark for the dark theme): terracotta, teal, ochre, violet, green. Validated for colour-blind separation; charts read them only through the `--chart-*` tokens and series 1 leads.

### Named Rules
**The Clay Never Reads Rule.** Rose Clay is a fill and a stroke, never text or a text background. Text on clay surfaces uses Clay Deep; links use Clay Ink.

**The Champagne On Cocoa Rule.** Champagne appears only on cocoa fields. On light surfaces it vanishes; use clay instead.

**The Honest Names Rule.** New call sites use canvas, clay, clay-deep, clay-ink, cocoa, cocoa-deep. The legacy aliases (ivory, rose, rose-deep, rose-ink, plum, plum-deep, violet, gold, gold-deep, lilac, mist, ink) map to these values so older components re-theme, and must not gain new call sites.

## Typography

**Display Font:** Gilda Display (with Didot, Georgia, serif)
**Body Font:** Geist (with ui-sans-serif, system-ui, sans-serif)

**Character:** A flared, high-waisted transitional serif with one weight, against a clean contemporary grotesk. The serif says clinic of standing; the sans says it is easy to book.

### Hierarchy
- **Display** (400, 2.75rem mobile to 4.25rem desktop, 1.04): the hero headline only, two lines, max 16ch on small screens.
- **Headline** (400, 2.25rem to 3rem, tight): section headings, sentence case. One exception: the treatments grid heading is uppercase with 0.06em tracking.
- **Title** (400, 1.25rem to 1.75rem): card names (signature cards set uppercase), category names, mobile menu items, footer column heads.
- **Figure** (400, 1.75rem to 2rem, tabular lining numerals): prices and admin KPI values. Figures are the serif's second job.
- **Body** (Geist 400, 0.9375rem; lead paragraphs 1.125rem at 1.625): copy held to roughly 26 to 32rem.
- **Label** (Geist 500, 0.875rem): form labels, buttons (0.9375rem), small headings inside lists.

### Named Rules
**The One Weight Rule.** Gilda has one weight and no italic. Hierarchy comes from size and colour, never bold. An emphasised word in a heading is set upright in Clay Ink.

**The Sans In The Columns Rule.** In the admin shell, h3 and h4 switch to Geist; the serif stays for page titles and headline figures.

**The No Kicker Rule.** No eyebrow labels above headings. A heading stands on its own.

## Layout

Full-width bands, never boxed. Each section's background runs edge to edge; content sits in the gutter: 1rem padding on phones, 2rem from 40rem, and from 64rem the larger of 3rem or whatever centres an 82rem measure. Horizontal scrollers (reviews) extend to the viewport edge and snap to the same gutter.

Vertical rhythm: sections at 80px, 96 to 112px from lg. Grids use 12 columns on desktop for split sections (5/7 or 4/8), 3 columns for treatment cards, 6 for categories; gaps 20 to 24px horizontally, 48px between card rows. Breakpoints are Tailwind defaults (640, 768, 1024, 1280); the main nav appears at xl, the phone gets a fixed bottom Book bar.

The signature cards overlap the hero's bottom edge by 80px on desktop, the middle one 24px higher.

## Elevation & Depth

A hybrid: tonal bands carry most structure, and white cards sit on them with soft, warm shadows. Shadows are always tinted to cocoa, never black, with small offsets and long blurs.

### Shadow Vocabulary
- **Soft** (`box-shadow: 0 1px 2px rgb(59 42 40 / 0.04), 0 8px 24px -12px rgb(59 42 40 / 0.14)`): resting cards, admin panels, tooltips.
- **Lift** (`box-shadow: 0 2px 4px rgb(59 42 40 / 0.04), 0 24px 48px -20px rgb(59 42 40 / 0.28)`): the featured card, the appointment card, overlapping photographs, the platform screenshot, toasts, and hover state.
- **Action glow** (`box-shadow: 0 6px 16px -8px rgb(164 96 79 / 0.7)`): under the filled clay button only.

### Named Rules
**The Warm Shadow Rule.** No neutral-grey or black shadows on light surfaces. Depth is cocoa or clay tinted.

## Shapes

One soft corner family from a 10px base: small 6px, medium 8px (buttons, inputs, nav pills, quiet buttons), large 10px (cards, image wells, admin panels), extra large 16px (feature photographs and the platform screenshot). Avatars, treatment thumbnails and chart dots are fully round. Checkboxes 3px; chart bars 4px tops.

Soft corners are an owner decision for this project and override the owner's usual square-corner preference elsewhere.

Borders are single hairlines (1px hairline colour); a thin clay rule or a top border separates list items and price rows.

## Components

### Buttons
Calm and warm, with a small press.
- **Shape:** gently curved (8px).
- **Primary:** Clay Deep fill, white Geist 500 at 0.9375rem, 12.8px by 25.6px padding, clay action glow. Hover to Clay Ink. On cocoa fields it stays clay so it always leads.
- **Outline:** 1px clay stroke, Clay Ink text, 40% white fill; hover strokes Clay Deep on white. On dark: 45% white stroke, white text.
- **Quiet:** Soft Rose fill, cocoa text, 8px by 16px (the per-card Book link); hover to Blush.
- **Press:** scale(0.97) on active, 160ms ease-out-soft. Colour changes 180ms ease-out.
- **Focus:** 2px clay outline at 3px offset; champagne on dark fields.

### Cards / Containers
- **Corner Style:** 10px.
- **Background:** white with a hairline (hairline colour at 80%).
- **Shadow Strategy:** Soft at rest, Lift when featured or hovered.
- **Hover:** lift 4px to the Lift shadow over 220ms, only where `(hover: hover) and (pointer: fine)`.
- **Internal Padding:** 32px for review and signature cards; 20 to 24px in the admin.

### Inputs / Fields
- **Style:** 48px high, white fill, 1px input stroke, 8px corner, cocoa text at 0.9375rem, muted placeholder; labels above in Geist 500 cocoa.
- **Focus:** stroke shifts to clay; the global clay focus ring applies on keyboard focus.
- **Error:** a 0.8125rem Clay Ink message below the field with role alert.

### Navigation
- **Showcase strip:** cocoa-deep, 0.8125rem blush text, champagne link, white "Explore the admin".
- **Header:** sticky, canvas at 90% with backdrop blur and a hairline base, 4.5rem tall; wordmark left, centred Geist links at 0.9375rem in 75% foreground, filled clay Book now right.
- **States:** hover to cocoa; a 1px clay underline scales in from the left (200ms); the active page holds it.
- **Mobile:** below xl a menu opens a list of Gilda items at 1.75rem divided by hairlines, with a full-width Book button; phones keep a fixed bottom Book bar.

### Admin analytics
- **KPI tiles and panels:** white card, hairline, 10px, Soft shadow; the figure in Gilda at 2rem with tabular numerals, the label in Geist.
- **Period switch:** a segmented hairline group with 5px inner pills.
- **Charts:** hand-built SVG reading `--chart-1..5`; 1.5px non-scaling lines with a 22% area fade, 4px bar tops, round legend dots, tooltips as small Soft-shadow popovers. Axis text 0.6875rem muted.

### Hero
A full-bleed looping clinic film at about 88dvh under a cocoa-deep wash from the left (from below on phones) so white type holds AA on any frame. Headline, subline and actions rise in on load, one line after another.

## Do's and Don'ts

### Do:
- **Do** run every section background edge to edge and hold content in the gutter (82rem measure).
- **Do** use Clay Deep for filled actions and Clay Ink for links; keep Rose Clay for fills, rules and focus.
- **Do** set headings and figures in Gilda Display at its one weight; use size and colour for hierarchy.
- **Do** tint every shadow to cocoa (Soft at rest, Lift for featured and hover).
- **Do** keep corners in the 10px family; avatars and thumbnails round.
- **Do** keep motion to one authored hero rise (12px, 60ms stagger, 280ms cubic-bezier(0.23, 1, 0.32, 1)); scroll reveals use the same values. Under reduced motion keep the fades, drop the movement.
- **Do** gate hover lifts behind hover-capable fine pointers; press feedback is scale(0.97).
- **Do** read chart colours only from the `--chart-*` tokens.

### Don't:
- **Don't** put eyebrow labels or kickers above headings.
- **Don't** use em dashes in UI copy.
- **Don't** bold or italicise Gilda Display.
- **Don't** use Champagne on light surfaces, or Rose Clay as a text colour.
- **Don't** add new call sites for the legacy aliases (ivory, rose, plum, gold, ink and the rest); use the honest names.
- **Don't** use grey or black shadows on light surfaces, or hard offset shadows.
- **Don't** box the page in a centred container with side margins of bare canvas.
- **Don't** rebuild the category default: a centred stock hero over three icon cards on a pastel gradient.
