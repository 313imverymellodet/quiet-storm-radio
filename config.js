/*  Quiet Storm Radio — station configuration
 *  --------------------------------------------------------------
 *  The big video + audio files are NOT stored in git (too large for
 *  GitHub/Vercel). They live on external storage. Paste the public
 *  URLs below. Leave a value "" to fall back to local ./assets files.
 *
 *  Upload to: Vercel dashboard → Storage → Blob  (or Cloudinary).
 */
window.STATION = {
  // Background night-drive video (mp4):
  videoUrl: "https://v2avzszmc0kiogcf.public.blob.vercel-storage.com/YTDown_YouTube_4k-Downtown-Detroit-Michigan-Night-Drive_Media_Wgf4qAeWwkI_001_1080p.mp4",

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
  elevenVoiceId: "VgRPNZtejvTOYKn37thJ"
};
