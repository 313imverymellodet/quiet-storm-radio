# 🎙️ WJLB FM 98 — Quiet Storm

A private, after-hours "live" radio station for 90s & 2000s slow jams. One play button over a
Detroit night-drive background, synced to the clock so it *feels* like a real broadcast — leave it
on the TV while you cook, clean, or wind down.

- **Fonts:** Apple San Francisco (SF Pro) — the system stack, so it loads instantly with no network.
- **Background:** a downtown Detroit night-drive video.
- **Sound:** a continuous slow-jams mix, clock-synced so everyone tuned in hears the same spot.

---

## Run it locally
Just open `index.html` in a browser (or serve the folder). With the media files present in
`./assets`, it plays straight away — `config.js` falls back to those local files.

## Deploy to Vercel

The code is tiny, but the **video (~535 MB) and mix (~87 MB) are too big for GitHub** (100 MB/file
limit), so they live on external storage and are referenced by URL. Three steps:

### 1. Push the code to GitHub
Already a git repo. Push to your GitHub, then on [vercel.com](https://vercel.com) → **Add New
Project** → import this repo. No build settings needed — it's a static site. It'll deploy in seconds
(the background/mix will be blank until step 2–3).

### 2. Upload your media somewhere public
Pick one:

**Vercel Blob** (since you're already on Vercel)
1. Vercel dashboard → **Storage** → **Create** → **Blob**.
2. Upload `assets/detroit-nights-web.mp4` and `assets/quiet-storm-vol1.mp3`.
3. Copy each file's **public URL**.

**Cloudinary** (free tier, ~25 GB bandwidth/mo — great for video)
1. Make a free account at [cloudinary.com](https://cloudinary.com).
2. Media Library → **Upload** both files.
3. Copy each file's **delivery URL**.

### 3. Paste the URLs into `config.js`
```js
window.STATION = {
  videoUrl: "https://…/detroit-nights-web.mp4",
  mixUrl:   "https://…/quiet-storm-vol1.mp3",
  ...
};
```
Commit + push. Vercel redeploys automatically and the station is live. 🎶

> Tip: keep the local files in `./assets` (they're git-ignored) so it still works on your machine
> even before the URLs are set.

---

## Files
| File | Purpose |
|------|---------|
| `index.html` | The whole station (HTML/CSS/JS, self-contained) |
| `config.js` | **Edit this** — your hosted video + mix URLs |
| `.gitignore` | Keeps the big media out of git |
| `assets/` | Local media (git-ignored; for local playback) |

## A note on music
Private/family use as-is. If it ever goes public or monetized, you'll need streaming licenses
(SoundExchange + ASCAP/BMI/SESAC, or a turnkey platform like Live365 / Radio.co).
