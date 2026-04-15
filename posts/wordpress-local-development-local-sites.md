---
title: 'How to Work on a WordPress Website Locally with Local Sites'
date: '2026-04-15'
description: 'Local Sites makes it easy to run WordPress on your machine for fast, clean theme development — no staging servers, no FTP, no round-trips.'
tags: ["Tutorial", "Tools"]
---

If you are building or customizing a WordPress site, trying to do that work directly on a live server is painful. Every small CSS tweak requires an upload. Every PHP error is public. Every test is slow.

The better approach is to run WordPress locally on your machine, make all your changes there, and push only when things are working. **Local Sites** (by WP Engine) makes this almost frictionless.

I used this setup while building a custom WordPress block theme for [HQ Partners Consulting](/projects/hqueue-consulting), and it made the whole development experience significantly faster.

---

## What is Local Sites

Local Sites is a free desktop app that runs a full WordPress environment on your machine. It handles the web server, PHP, MySQL, and the WordPress installation — no MAMP, no XAMPP, no manual configuration.

You download the app, click "Create a new site", give it a name, and in under a minute you have a working WordPress installation at a local URL like `my-site.local`.

## Setting Up a New Local Site

1. Download Local from [localwp.com](https://localwp.com) and install it
2. Click **+** to create a new site and give it a name
3. Choose your environment (PHP version, web server)
4. Set your WordPress admin username and password
5. Click **Start site** — Local opens your site in the browser

That is the entire setup. Your site files live at `~/Local Sites/<your-site>/app/public/` and are just regular files on your machine — open them in any editor.

## Developing a Custom Theme Locally

For custom theme work, the workflow is straightforward:

1. Create your theme folder inside `wp-content/themes/`
2. Edit files in your editor, save, refresh the browser — changes are instant
3. Activate your theme from the WordPress admin at `<your-site>.local/wp-admin`

Because everything runs locally, there is no delay between saving and seeing the result. You can open the browser dev tools, inspect layout issues, tweak CSS, and copy the final values back into your theme files — the same tight feedback loop you would have with any modern frontend project.

For the HQ Partners Consulting site, this made iterating on the block theme's `theme.json` — color palette, spacing scales, typography — genuinely fast. What would have been several upload-refresh cycles per change was instant.

## Pushing Changes to Production

When your local changes are ready to go live, you have a few options depending on how you host:

- **Theme files only** — for pure theme development, copy your theme folder to the live server via SFTP or your host's file manager
- **Export and import** — Local can export a full zip of your site (database + files) that you can import elsewhere
- **WP Engine push** — if you host on WP Engine, Local has a one-click push to your staging or production environment built in

For most custom theme work, SFTP is the simplest path. Export/import is useful when you also have database changes like new pages, menus, or plugin settings you want to carry over.

---

Local removes all the friction that makes WordPress customization slow. You are not waiting on uploads, not risking a live site, and not working blind. For anyone building a custom WordPress theme — especially block themes where you are editing `theme.json`, PHP templates, and CSS all at the same time — it is the right tool for the job.
