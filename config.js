/*  Quiet Storm Radio — station configuration
 *  --------------------------------------------------------------
 *  The big video + audio files are NOT stored in git (too large for
 *  GitHub/Vercel). They live on external storage. Paste the public
 *  URLs below. Leave a value "" to fall back to local ./assets files.
 *
 *  Upload to: Vercel dashboard → Storage → Blob  (or Cloudinary).
 */
window.STATION = {
  // Background drive video (mp4) — the default / fallback:
  videoUrl: "https://v2avzszmc0kiogcf.public.blob.vercel-storage.com/YTDown_YouTube_4k-Downtown-Detroit-Michigan-Night-Drive_Media_Wgf4qAeWwkI_001_1080p.mp4",

  // Seconds to skip at the start of the video (and loop point). The current night clip has a
  // burned-in "Detroit Downtown at Night" intro title for ~10s — start past it. Use 0 for clean clips.
  videoStart: 12,

  // Optional: different Detroit drive video per time of day (it crossfades on the daypart change).
  // Any not set here falls back to videoUrl above. Hours: morning 5–11, afternoon 11–17, evening 17–21, night 21–5.
  videos: {
    // morning:   "https://…/detroit-morning.mp4",
    // afternoon: "https://…/detroit-afternoon.mp4",
    // evening:   "https://…/detroit-evening.mp4",
    // night:     "https://…/detroit-night.mp4",
  },

  // ---- Curated mixes (the only music that plays — users can't add their own) ----
  // Single mix shortcut:
  mixUrl:   "https://v2avzszmc0kiogcf.public.blob.vercel-storage.com/Quiet%20Storm%20Slow%20Jams%20Vol%201.%20%5BJoe%2C%20Silk%2C%20Usher%2C%20Maxwell%2C%20Xscape%5D.mp3",
  mixTitle:  "Quiet Storm Slow Jams, Vol. 1",
  mixArtist: "Joe · Silk · Usher · Maxwell · Xscape",

  // …or a curated playlist (overrides mixUrl when non-empty). They play back
  // to back, clock-synced, looping the whole set:
  // mixes: [
  //   { url:"https://…/vol1.mp3", title:"Quiet Storm, Vol. 1", artist:"Joe · Silk · Usher" },
  //   { url:"https://…/vol2.mp3", title:"Quiet Storm, Vol. 2", artist:"Sade · Maxwell · Kem" },
  // ],

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
