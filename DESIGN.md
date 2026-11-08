---
name: Bodybuilding News BD
description: Bangla-first sports desk for bodybuilding and physique sport in Bangladesh.
colors:
  header-black: "#0e0e0e"
  page-white: "#ffffff"
  card-grey: "#f2f2f0"
  ink: "#111111"
  muted: "#5d5d58"
  rule: "#e2e2de"
  logo-gold: "#ca9d23"
  gold-text: "#7d5f0f"
typography:
  display:
    fontFamily: "Barlow Condensed, Anek Bangla, Hind Siliguri, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 800
    lineHeight: 1
  headline:
    fontFamily: "Barlow Condensed, Anek Bangla, Hind Siliguri, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.1
  title:
    fontFamily: "Barlow Condensed, Anek Bangla, Hind Siliguri, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "Barlow, Hind Siliguri, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Barlow, Hind Siliguri, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  card: "10px"
  tile: "8px"
  pill: "999px"
spacing:
  card-pad: "12px"
  section: "56px"
  page-gutter: "16px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.logo-gold}"
    textColor: "{colors.header-black}"
  story-card:
    backgroundColor: "{colors.card-grey}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "12px"
  section-block:
    backgroundColor: "{colors.header-black}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.card}"
    height: "64px"
  brand-tag:
    backgroundColor: "{colors.logo-gold}"
    textColor: "{colors.header-black}"
    rounded: "4px"
---

# Design System: Bodybuilding News BD

## Overview

**Creative North Star: "The Sports Desk"**

The category standard for sports news, done properly: the craft level of The Athletic, ESPN, BBC Sport and Prothom Alo Sports, chosen deliberately over three rounds of alternative directions. A black header band with the gold logo, a white page, a photo-led lead story, rounded grey story cards and black section blocks. Familiar on purpose: readers in Bangladesh know this layout from every sports site they use, so nothing has to be learned before the news is read.

White on every device: there is no dark mode, and `color-scheme: only light` stops browsers darkening the page. Bangla comes first; Bangla headlines use Anek Bangla at a condensed width so they sit beside Barlow Condensed.

**Key Characteristics:**
- Black header band with a 3px gold rule; white page beneath.
- Photo-led lead story with only the headline on the photo.
- Rounded (10px) light-grey cards; small square thumbnails in lists.
- Condensed display type for headlines in both languages.

## Colors

Black, white and grey carry the page; the logo's gold is the only accent.

### Primary
- **Logo Gold** (#ca9d23): the logo mark, the "BD" tag, the header and footer rule, the active section underline, section-heading bars, event day numerals and button hover. Used as a fill or on black, never as text on white.
- **Gold Text** (#7d5f0f): the readable gold for focus rings and the rare gold text on white.

### Neutral
- **Header Black** (#0e0e0e): header, footer, lead panel without a photo, section blocks, logo tiles.
- **Page White** (#ffffff): the page ground.
- **Card Grey** (#f2f2f0): story cards, schedule rows, empty states.
- **Ink** (#111111): headlines and body text.
- **Muted** (#5d5d58): standfirsts, dates, categories and metadata.
- **Rule** (#e2e2de): hairlines between list rows and under page titles.

### Named Rules
**The One Accent Rule.** Gold is the only colour besides black, white and grey. No second accent, no category colours.

## Typography

**Display Font:** Barlow Condensed (Latin), Anek Bangla at 75% width (Bangla), Hind Siliguri fallback
**Body Font:** Barlow (Latin), Hind Siliguri (Bangla)

**Character:** One family for the whole desk: Barlow Condensed for headlines and section names, Barlow for reading.

### Hierarchy
- **Display** (800, 3.75rem, uppercase in English): page titles (News, Events, Athletes, Guides).
- **Headline** (700, 2rem): the lead caption on the photo and article headlines.
- **Title** (700, 1.4–1.65rem): grid cards, side cards and list rows.
- **Body** (400, 1.125rem, line-height 1.75, max 68ch): article text.
- **Label** (600, 0.875rem): category · date lines, bylines and captions, in Muted.

### Named Rules
**The Caption-Only Rule.** On a photo, only the headline appears: no standfirst, date or category on the image.
**The Bangla Spacing Rule.** Negative letter spacing applies to English only; Bangla keeps its natural spacing.

## Layout

A 72rem (max-w-6xl) container with 16px gutters. The front page, in order:
1. Lead story (left, 1.6fr) beside three side cards (right, 1fr). The lead is the newest story with a photo; side slots are filled by section cards until there are enough stories.
2. A row of four black section blocks (two by two on phones).
3. "Latest news": a three-column grid of photo cards.
4. "More news": a compact two-column list.
5. Upcoming events, featured athletes and guides, each only when there is content.

Article, guide and info pages use one 48rem reading column. Everything stacks to one column on phones; the header keeps logo and a single language button on top and the sections on a scrolling second row.

## Elevation & Depth

Flat. No shadows. Depth comes from tone: black bands against white, grey cards on white, and a scrim behind the lead caption.

## Shapes

Rounded but restrained: 10px on cards, photos and section blocks; 8px on small tiles; full pills for primary buttons; 4px on the BD tag.

## Components

### Lead Story
Photo filling a 16:10 frame (4:3 on phones, capped at 600px tall), a bottom-half black scrim, and the headline only, in condensed type.

### Story Card (side and guides)
Grey card, small square thumbnail (80–96px) left, headline and category · date right. Without a photo, a black tile with the gold logo takes the thumbnail's place.

### Grid Card
Photo at 16:10 on top, headline, standfirst and meta below. Without a photo, a black 16:10 tile with the gold logo keeps the row aligned.

### Section Blocks
Black rounded blocks with condensed uppercase section names; gold with black text on hover.

### Navigation
Black header band with a gold rule; condensed uppercase links, the active one underlined in gold. On phones the links sit on a scrolling second row.

### Buttons
Primary: Ink pill with white condensed uppercase label, 44px tall; turns gold on hover. Share buttons: outline with stroke icons.

## Do's and Don'ts

### Do:
- **Do** lead with the newest story that has a photo.
- **Do** keep only the headline on any photo.
- **Do** show a logo tile when a story has no photo, so rows stay even.
- **Do** keep the page white on every device.
- **Do** keep tap targets at least 44px and text contrast at WCAG AA.

### Don't:
- **Don't** put standfirsts, dates or labels on a photo.
- **Don't** add a dark mode or a second accent colour.
- **Don't** place a small label above a headline; category and date go below it.
- **Don't** use the federation's emblem or posing-figures motif.
- **Don't** apply negative letter spacing to Bangla.
