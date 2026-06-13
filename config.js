/*  Quiet Storm Radio — station configuration
 *  --------------------------------------------------------------
 *  The big video + audio files are NOT stored in git (too large for
 *  GitHub/Vercel). They live on external storage. Paste the public
 *  URLs below. Leave a value "" to fall back to local ./assets files.
 *
 *  Upload to: Vercel dashboard → Storage → Blob  (or Cloudinary).
 */
window.STATION = {
  // Media hosted on Cloudflare R2 (public bucket pub-a12f3f24cb3d459d955cdac3d6006546.r2.dev).

  // Background drive video (mp4) — the default / fallback (night drive):
  videoUrl: "https://pub-a12f3f24cb3d459d955cdac3d6006546.r2.dev/detroit-nights-web.mp4",

  // Seconds to skip at the start of each clip (and loop point) — skips burned-in intro title cards.
  // Number = same for all; or per-daypart map. Belle Isle's labels clear by ~30s; night clip ~10s.
  videoStart: { morning: 35, afternoon: 35, evening: 12, night: 12 },

  // Per-time-of-day background (crossfades on the daypart change).
  // Hours: morning 5–11, afternoon 11–17, evening 17–21, night 21–5.
  videos: {
    morning:   "https://pub-a12f3f24cb3d459d955cdac3d6006546.r2.dev/belle-isle-day.mp4",
    afternoon: "https://pub-a12f3f24cb3d459d955cdac3d6006546.r2.dev/belle-isle-day.mp4",
    evening:   "https://pub-a12f3f24cb3d459d955cdac3d6006546.r2.dev/detroit-nights-web.mp4",
    night:     "https://pub-a12f3f24cb3d459d955cdac3d6006546.r2.dev/detroit-nights-web.mp4",
  },

  // ---- Curated playlist (the only music that plays — users can't add their own).
  // Mixes play back-to-back, clock-synced, looping the whole set. `duration` (seconds)
  // is optional but keeps the live-sync exact without re-reading each file.
  mixes: [
    { url:"https://pub-a12f3f24cb3d459d955cdac3d6006546.r2.dev/quiet-storm-vol1.mp3",
      title:"Quiet Storm Slow Jams, Vol. 1", artist:"Joe · Silk · Usher · Maxwell · Xscape", duration:3809 },
    { url:"https://pub-a12f3f24cb3d459d955cdac3d6006546.r2.dev/quiet-storm-vol5.mp3",
      title:"Quiet Storm Slow Jams, Vol. 5", artist:"Faith Evans · Dru Hill · Aaliyah · 702", duration:3672 },
    { url:"https://pub-a12f3f24cb3d459d955cdac3d6006546.r2.dev/valentine-vibes.mp3",
      title:"Slow Jam Mix — Valentine Vibes", artist:"90s & 2000s R&B Quiet Storm", duration:4705 },
  ],
  // (single-mix fallback if `mixes` is empty)
  mixUrl:   "https://pub-a12f3f24cb3d459d955cdac3d6006546.r2.dev/quiet-storm-vol1.mp3",
  mixTitle:  "Quiet Storm Slow Jams, Vol. 1",
  mixArtist: "Joe · Silk · Usher · Maxwell · Xscape",

  // ---- Quiet Storm DJ (spoken breaks) ----
  dj: true,             // master on/off (users can also toggle in the UI)
  breakMinutes: 7,      // how often the DJ talks over a break
  news: true,           // include world-news headlines in the breaks (needs /api/news on Vercel)
  newsPerHour: 4,       // cap: most spoken news breaks per rolling hour (protects TTS quota; 0 = no news)
  djVoice: "",          // fallback browser voice by name, e.g. "Daniel" (used if premium is off/unavailable)

  // ---- Premium DJ voice: ElevenLabs (recommended for that real radio sound) ----
  // 1. Make an ElevenLabs account, pick/clone a voice, copy its Voice ID below.
  // 2. In Vercel → Settings → Environment Variables, add:  ELEVENLABS_API_KEY = <your key>
  //    (the key stays server-side and is NEVER exposed in this file)
  // 3. Set premiumVoice: true.  It auto-falls back to the browser voice if the API is down.
  premiumVoice: true,
  elevenVoiceId: "VgRPNZtejvTOYKn37thJ",   // default voice (used for any show without its own below)

  // Per-show ElevenLabs voices (create/clone them in ElevenLabs, paste the Voice IDs).
  // A single id = solo host. TWO ids in an array = co-hosts who trade lines (banter).
  // Any show not listed uses elevenVoiceId above.
  showVoices: {
    // quietstorm uses elevenVoiceId above (QS 1, the smooth night host)
    wakeup:    ["HNdzw1L9v4zMSqYR04AS", "Iv2X4a0P50k3zWSMuywe"],  // co-hosts: Morning woman + Morning Male
    drivetime: "Iv2X4a0P50k3zWSMuywe",                            // afternoon/evening host (Morning Male)
    // dedications: ["voiceA","voiceB"],  // add a pair later to make it a co-host show
  },

  // ---- Shows ----
  // Three shows auto-switch by time of day (Wake-Up in the morning, Quiet Storm
  // through the day/night, Midnight Dedications after midnight). Listeners can also
  // pick one manually from the "Shows" menu in the corner.
  //
  // Dedications the host reads during Midnight Dedications. Plain strings, or
  // { to, from, note } objects. Add your family's shoutouts here:
  dedications: [
    // { to: "Mom", from: "the whole family", note: "we love you" },
    // "Happy anniversary to Rome and Jess — twelve years strong.",
  ]
};
