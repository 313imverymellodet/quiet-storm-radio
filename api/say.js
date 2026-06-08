// Vercel serverless function: ElevenLabs text-to-speech proxy for the Quiet Storm DJ.
//
// The API key NEVER touches the browser — it lives in a Vercel environment variable.
// Responses are cached at the edge (keyed by the full URL, i.e. the exact text), so
// repeated lines — station idents, a headline within its news cycle — are served from
// cache for free instead of re-billing ElevenLabs.
//
// Required Vercel env vars:
//   ELEVENLABS_API_KEY   — your secret key (Settings → Environment Variables)
// Optional:
//   ELEVENLABS_VOICE_ID  — default voice (can also be passed as ?v= from config.js)
//   ELEVENLABS_MODEL     — default "eleven_turbo_v2_5"

module.exports = async (req, res) => {
  const text = String((req.query && req.query.text) || "").trim().slice(0, 600);
  const voiceId = String((req.query && req.query.v) || process.env.ELEVENLABS_VOICE_ID || "").trim();
  const key = process.env.ELEVENLABS_API_KEY;

  // Basic same-origin guard so randoms can't burn your TTS quota.
  const host = req.headers.host || "";
  const ref = req.headers.referer || req.headers.origin || "";
  if (ref && host && !ref.includes(host)) { res.status(403).json({ error: "forbidden" }); return; }

  if (!text) { res.status(400).json({ error: "missing text" }); return; }
  if (!key || !voiceId) { res.status(503).json({ error: "tts not configured" }); return; }

  try {
    const model = process.env.ELEVENLABS_MODEL || "eleven_turbo_v2_5";
    const r = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
        body: JSON.stringify({
          text,
          model_id: model,
          // tuned for a smooth, steady late-night DJ delivery
          voice_settings: { stability: 0.55, similarity_boost: 0.8, style: 0.25, use_speaker_boost: true },
        }),
      }
    );

    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      res.status(502).json({ error: "tts upstream " + r.status, detail: detail.slice(0, 200) });
      return;
    }

    const buf = Buffer.from(await r.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800, immutable");
    res.status(200).send(buf);
  } catch (e) {
    res.status(502).json({ error: String((e && e.message) || e) });
  }
};
