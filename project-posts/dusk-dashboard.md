---
title: "Dusk Dashboard"
date: "2026"
description: "A personal finance command center built for myself. Dark, fast, and deeply connected to every account I own, from Chase and Fidelity to a Ledger hardware wallet."
tags: ["Next.js", "TypeScript", "Supabase", "Plaid", "AI", "Finance", "PWA"]
featured: true
---

Every finance app I tried wanted me to adapt to it. Mint assumed I lived in checking accounts. Copilot was close but opinionated in ways I wasn't. None of them spoke crypto natively, understood my Fidelity 401k, and also knew about the RSUs vesting in my Shareworks account, at the same time. So I built Dusk: a personal finance dashboard for exactly one user, with exactly my financial life wired in.

![Dusk dashboard overview](/projects/dusk/dusk-hero-dashboard.png "Dusk — net worth and account overview")

## What It Tracks

The whole point is one number at the top — net worth — backed by every account I actually have:

- **Banking** — Chase checking + credit cards (Sapphire Reserve, Amazon, Coinbase One CC) via Plaid
- **Investments** — Vanguard brokerage, Fidelity HSA + 401k, Shareworks RSUs
- **Crypto** — Coinbase exchange positions + Ledger hardware wallet (ETH, BTC, ERC-20 tokens, NFTs)
- **Vehicles** — Manual entry with depreciation tracking and value history
- **Transactions** — Unified feed across all sources with search, filters, and inline category editing

Net worth history is snapshotted daily by a Vercel cron at 6am ET, so the trend line is always up to date without me touching anything.

![Dusk transactions list](/projects/dusk/dusk-transactions.png "Dusk — transactions list breakdown")

## The Integration Stack

Each institution required a different approach — no single API covers everything:

- **Plaid** — handles most banks and credit cards. Investments are loaded as `optional_products` (required blocks non-brokerage accounts entirely)
- **SnapTrade** — Fidelity permanently blocks Plaid. SnapTrade is the only path to Fidelity NetBenefits and HSA data
- **Coinbase API** — v2 REST with ECDSA-signed JWTs; syncs exchange holdings and fiat accounts
- **Etherscan + Alchemy** — on-chain ETH balance, ERC-20 tokens, and NFT holdings from the Ledger wallet address
- **Blockstream** — on-chain BTC balance, no API key required
- **CSV upload** — fallback parser for any institution that doesn't have an API path

Everything funnels into one Supabase schema with a daily sync orchestrator that runs all five pipelines in sequence and writes a fresh net worth snapshot.

## Smart Categorization

Raw transactions come in labeled by Plaid's category taxonomy or with no label at all (crypto). A three-layer pipeline handles it:

1. **Metadata rules** — account type + transaction direction first. Credit account + positive amount + "Payment" in description → `Credit Card Payment`. Coinbase source + positive amount under $5 → `Rewards` (card cashback). Hard rules, zero ambiguity.
2. **Keyword rules** — merchant substring matching catches the long tail of known vendors and payees.
3. **Claude Haiku** — anything that falls through both layers gets sent to Haiku with full context: source, account type, Plaid category hint, and merchant name. Batched at 200 per call, costs about $1–2/month.

The result: most transactions categorize automatically on sync, and anything Haiku misses can be fixed inline from the transactions table with one click.

## Built as a PWA

One codebase, two form factors. On desktop it's a full dashboard at `dusk-dashboard.vercel.app`. On mobile, I added it to my home screen as a PWA — same app, same data, bottom tab navigation, proper iOS safe area insets. No App Store, no separate codebase, no React Native complexity.

The mobile layout swaps the desktop data table for a card-based transaction list, hides the top nav, and surfaces a fixed bottom bar with five tabs. Everything else is the same server components and the same Supabase queries underneath.

`Next.js` · `TypeScript` · `Tailwind CSS v4` · `Supabase` · `Plaid` · `SnapTrade` · `Recharts` · `Claude Haiku` · `PWA`
