---
title: 'Gold Farmers'
date: '2024'
description: 'A fully on-chain gamified NFT collection on Blast L2 — 70+ trait SVG art generated and stored entirely on-chain, achieving over 65,000 transactions across 8 seasons of gameplay.'
tags: ['Web3', 'Solidity', 'NFT', 'Blast L2', 'On-Chain', 'Next.js']
featured: true
---

Gold Farmers is an experimental fully on-chain NFT game deployed on **Blast L2** — leveraging Blast's native yield mechanics and gas revenue sharing to make complex on-chain gameplay actually affordable. Over 8 seasons, players minted, grew, watered, and competed on a leaderboard, generating **65,000+ on-chain transactions**.

![Gold Farmers hero](/projects/gold-farmers/gold-farmers-hero.png "Gold Farmers — the fully on-chain NFT game on Blast")

![Farmers tab in the Gold Farmers dapp](/projects/gold-farmers/farmers-page.png "Farmers tab in the Gold Farmers dapp")

## How It Works

Players start by minting a **Farmer NFT** — fully refundable after 8 seasons. Each Farmer lets you mint one **Flower NFT** per season at three tiers. Flowers start as seeds and can be grown through 10 levels by watering them on-chain.

Every watering has three outcomes: growth, failure, or death. Above level 7, failure means losing a level. Optional fertilizer removes the death risk. Cooldowns start at 8 hours and decrease to 15 seconds as the season progresses — rewarding active players.

Points accumulate from both Farmers and Flowers, feeding into an on-chain leaderboard. At the end of each season, **100% of Blast Points are distributed to players** based on leaderboard standings using a square-root distribution model.

## What Made It Special

- **All art is on-chain** — 70+ traits generated as SVGs via scripts and stored directly in the smart contract
- **Pyth Entropy** for provably fair on-chain randomness during flower growth
- Partner collections (Denizens, The Wolves, New Blast City, Mintify Blast Keys) earned bonus points for holding
- 8 predetermined weekly seasons with a two-week refund window post-season

## Tech Stack

Three **Solidity** contracts on Blast L2 handle all game logic, art storage, and leaderboard tracking. The frontend is **Next.js + TypeScript** with full support for filtering farmers and flowers, individual detail pages, and the watering/fertilizer UI. **Python scripts** handled prize distribution and analytics.

`Solidity` · `Blast L2` · `Next.js` · `TypeScript` · `Pyth Entropy` · `Python`

Checkout [Gold Farmers](https://lualabs.xyz/farmers) · [Read the Docs](https://lualabs.xyz/farmers/docs)
