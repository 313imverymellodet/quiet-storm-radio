// Vercel serverless function: returns a few current world-news headlines as JSON.
// Pulls a public RSS feed server-side (no API key, no CORS headaches) so the
// Quiet Storm DJ can read them on air. Cached at the edge for 15 minutes.
//
// Override the feed by setting a NEWS_FEED environment variable in Vercel.

const DEFAULT_FEED = "https://feeds.npr.org/1001/rss.xml"; // NPR top stories

function decode(s) {
  return s
    .replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "")
    .replace(/&amp;/g, "&").replace(/&#0?39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

module.exports = async (req, res) => {
  const feed = process.env.NEWS_FEED || DEFAULT_FEED;
  try {
    const r = await fetch(feed, { headers: { "User-Agent": "QuietStormRadio/1.0 (+radio)" } });
    const xml = await r.text();
    const items = [...xml.matchAll(/<item[\s\S]*?<\/item>/g)].map((m) => m[0]);
    const headlines = items
      .map((it) => {
        const t = it.match(/<title>([\s\S]*?)<\/title>/);
        return t ? decode(t[1]) : "";
      })
      .filter((t) => t && t.length > 3)
      .slice(0, 6);

    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=1800");
    res.status(200).json({ headlines, source: "NPR", at: new Date().toISOString() });
  } catch (e) {
    // Never hard-fail — the DJ just skips news and keeps spinning.
    res.status(200).json({ headlines: [], error: String(e && e.message || e) });
  }
};
