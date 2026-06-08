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
  videoUrl: "https://v2avzszmc0kiogcf.public.blob.vercel-storage.com/YTDown_YouTube_4k-Downtown-Detroit-Michigan-Night-Drive_Media_Wgf4qAeWwkI_001_1080p.mp4",

  // Paste your hosted mix URL here (mp3):
  mixUrl: "https://v2avzszmc0kiogcf.public.blob.vercel-storage.com/Quiet%20Storm%20Slow%20Jams%20Vol%201.%20%5BJoe%2C%20Silk%2C%20Usher%2C%20Maxwell%2C%20Xscape%5D.mp3",

  // Optional: what the "now playing" line says
  mixTitle:  "Quiet Storm Slow Jams, Vol. 1",
  mixArtist: "Joe · Silk · Usher · Maxwell · Xscape"
};
