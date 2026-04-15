---
title: 'HQ Partners Consulting'
date: '2025'
description: 'A custom WordPress block theme for a business strategy consulting firm — built so the client can fully edit and manage their site without ever touching code.'
tags: ['WordPress', 'PHP', 'Custom Theme', 'Web Design']
featured: true
---

HQ Partners Consulting brings Fortune 500-caliber strategic rigor to small and mid-market companies. Founder Stephanie Hughes-Quain — with 20+ years of Fortune 500 strategy experience — needed a site that matched the quality of her work: clean, credible, and something she could maintain herself without depending on a developer for every update.

![HQ Partners Consulting homepage](/projects/hqueue/hqueue-hero.png "HQ Partners Consulting — business strategy and transformation consulting")

## A WordPress Theme That Doesn't Look Like WordPress

Rather than a page builder or off-the-shelf theme, I built a custom WordPress **block theme** from scratch. The block editor gives Stephanie a native editing experience — adding service pages, updating copy, managing the tools library — all without touching code.

Block themes use `theme.json` to define the entire design system: color palette (deep navy primary, gold accent), typography (Playfair Display headings, Inter body), spacing scales, and layout constraints. Design decisions are enforced at the theme level, so the editor always produces on-brand output no matter what gets added or changed.

## Local Development with Local Sites

To build and iterate quickly, I used **Local Sites** (by WP Engine) to run a full WordPress environment on my machine. No FTP uploads, no staging server round-trips — just live theme editing with instant browser reload. Custom templates, block patterns, and CSS changes could be validated in real time before pushing to production.

## What Was Built

- **Custom block templates** for the homepage, service detail pages, contact page, and a tools library — each with a purpose-built layout rather than a generic WordPress page
- **Service description meta box** — a custom PHP sidebar field in the block editor that feeds per-page intro copy into a shortcode, keeping it cleanly separated from the visual block content
- **Tools page seeder** — a PHP function that programmatically generates the full tools library (three sections, 12 consultant frameworks) as native, editable WordPress blocks on first load — so the client gets a complete starting point with no manual data entry
- **WPForms contact form** custom-styled to match the design system precisely — field borders, focus rings, responsive two-column name fields, and submit button
- **Responsive mobile menu** with animated hamburger-to-X icon, full-width overlay panel, and keyboard/Escape support — hand-rolled in vanilla JS without a plugin

`WordPress` · `PHP` · `Block Theme` · `theme.json` · `Local Sites`

Checkout [HQ Partners Consulting](https://h-queueconsulting.com/)
