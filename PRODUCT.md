# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Bangladeshi bodybuilders, physique athletes, coaches and gym-goers. Most read on phones, often while at the gym or travelling, and arrive from Facebook or WhatsApp shares. They follow competitions, results, the federation, and training and nutrition advice.

## Product Purpose

bodybuildingnewsbd.com is a bilingual news site for bodybuilding and physique sport in Bangladesh. It publishes news, a competition calendar with results, athlete profiles, and training and nutrition guides. Success means readers use it as their source for what happened in the sport, before the rumours spread on Facebook groups.

## Positioning

Independent media: it reports on the Bangladesh Bodybuilding Federation (BABBF) and the sport, but is not run by the federation and does not speak for it. It aims to be known for all four of: fast, sourced news in Bangla first; the most complete record of Bangladeshi competitions, dates and results; profiles of Bangladeshi athletes; practical training guides written for lifters in Bangladesh.

## Operating Context

- Bangla-first: `/` opens the Bangla edition (`/bn`); English (`/en`) mirrors it for readers abroad.
- Content is edited in Sanity Studio (`studio/`); the site is Next.js 16 on Vercel at bodybuildingnewsbd.com.
- Readers share stories to Facebook and WhatsApp; those are the main distribution channels.

## Capabilities and Constraints

- Sections: News (categories: Bangladesh, International, Competitions), Events (calendar and results), Athletes, Guides (Training, Nutrition).
- Every translatable field has English (required) and Bangla (optional, falls back to English).
- Standing pages: About, Contact, Editorial policy, Corrections.
- Open: contact email and Facebook page URL are not yet provided; the Contact page stays hidden until they are.

## Brand Commitments

- Name: Bodybuilding News BD. Logo: gold flexed-arm-and-arrow mark with a condensed "BODYBUILDING NEWS" wordmark and a gold "BD" tag (`public/brand/logo-source.png`).
- Must not look like or imply the federation's official identity: no use of the BABBF emblem or its posing-figures motif.
- Standing visual preference (chosen 2026-11-08 over three rounds of alternative directions): the category standard for sports news, executed at the craft level of The Athletic, ESPN, BBC Sport and Prothom Alo Sports.

## Evidence on Hand

- One published article (BABBF ad hoc committee, sourced from HR Television) with a committee photo whose individual faces are not identified.
- No competition photos, athlete photos, results, events or guides yet. Do not fabricate athletes, results, quotes or figures; sample content in `src/lib/content/sample.ts` is fictional and only used without a CMS.

## Product Principles

1. Sourced or not published: every story names where its facts come from; people in photos are named only when certain.
2. Bangla first, English as a faithful mirror.
3. Phone-first reading and sharing: the story, its date and the share action are always within reach.
4. The record matters: results, dates and athlete histories are kept as durable reference, not just news.
5. Independent voice: report on the federation, never speak for it.

## Accessibility & Inclusion

Bangla script must render with its natural spacing and line height; tap targets at least 44px; text contrast at WCAG AA.
