---
title: 'How to make video HTML tag work on mobile'
date: '2024-03-03'
description: "The video tag doesn't automatically work in mobile, I will show you what you need to do to make it work."
---

I was implementing video capabilities for my art page when I came across this issue again, videos weren't working the same on desktop and mobile. Here is everything you need to know to have videos work how you intend them on mobile.

Let's look at how you would usually write a video tag with source:
```html
<video width="100%" height="auto">
  <source src="movie.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

This should work fine in desktop browser, but it may not work the same on mobile. Also I recommend using mp4 as it is the most widely supported.

## Video Tag options to consider for mobile:

### 1. `controls`:

Providing the controls attribute is essential for mobile users, as it gives them the ability to play, pause, and adjust the video's volume directly. Without it, user interaction can be severely limited on some mobile browsers.

```html
<video controls>
  <source src="movie.mp4" type="video/mp4">
</video>
```

### 2. `playsinline`:

iOS Safari blocks autoplaying videos by default to save data, unless they are muted or include the playsinline attribute. This attribute allows the video to play inline within the document on iOS devices, rather than automatically entering fullscreen mode.

```html
<video playsinline controls>
  <source src="movie.mp4" type="video/mp4">
</video>
```

### 3. `autoplay` and `muted`:

If you want a video to autoplay on mobile devices, you should both mute it and include the autoplay attribute. This is a common requirement for iOS Safari to autoplay videos without user interaction.

```html
<video autoplay muted playsinline>
  <source src="movie.mp4" type="video/mp4">
</video>
```

### 4. `loop`:

The loop attribute is useful for creating background videos or animated decorations that you want to play over and over without user interaction.

```html
<video loop muted playsinline>
  <source src="movie.mp4" type="video/mp4">
</video>
```

### 5. `poster`:

Without `poster` your video on mobile may not have a thumbnail and just look gray.

To achieve a consistent appearance across desktop and mobile, including displaying a video thumbnail before the video is played, you can implement a workaround. This involves using a poster image as a thumbnail for the video. The poster attribute of the `<video>` tag allows you to specify an image to be shown before the video is played

```html
<video controls poster="path/to/your/thumbnail.jpg">
  <source src="movie.mp4" type="video/mp4">
</video>
```

### 6. Multiple Sources:

To ensure compatibility across different browsers and devices, you can provide the video in multiple formats. This way, the browser can pick the one it supports best.

```html
<video controls playsinline>
  <source src="movie.webm" type="video/webm">
  <source src="movie.mp4" type="video/mp4">
</video>
```

### 7. Preload Attribute:

The preload attribute allows you to hint to the browser how you think the video should be loaded when the page loads. Options are `none`, `metadata` (default), and `auto`. However, use this cautiously as preloading can increase data usage.

```html
<video preload="metadata" controls playsinline>
  <source src="movie.mp4" type="video/mp4">
</video>
```

## Finally putting all together, a mobile enabled video may look like this:

```html
<video
  width="100%"
  height="auto"
  controls
  playsinline
  poster="path/to/your/thumbnail.jpg"
>
  <source src="movie.webm" type="video/webm">
  <source src="movie.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

Hope this helps you get your videos working the way you want on mobile and desktop.