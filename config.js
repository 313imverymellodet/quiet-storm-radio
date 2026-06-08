/*  Quiet Storm Radio — media configuration
 *  --------------------------------------------------------------
 *  The big video + audio files are NOT stored in git (too large for
 *  GitHub/Vercel). They live on external storage. After you upload
 *  them, paste the public URLs below and commit this file.
 *
 *  Leave a value as "" (empty) to fall back to the local files in
 *  ./assets — handy for running it on your own machine or TV.
 *
 *  Where to upload (pick one, see README):
 *    • Vercel Blob   → https://vercel.com/dashboard  → Storage → Blob
 *    • Cloudinary    → https://cloudinary.com  (free tier, great for video)
 */
window.STATION = {
  // Paste your hosted background video URL here (mp4):
  videoUrl: "",

  // Paste your hosted mix URL here (mp3):
  mixUrl: "",

  // Optional: what the "now playing" line says
  mixTitle:  "Quiet Storm Slow Jams, Vol. 1",
  mixArtist: "Joe · Silk · Usher · Maxwell · Xscape"
};
