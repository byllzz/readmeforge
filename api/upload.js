/**
 * Vercel serverless function - proxies image uploads to imgbb..
 *
 * Why this exists: the client used to compress an uploaded file into a
 * data: URL and store THAT as the "image url" - which worked for the live
 * preview (data: URLs render fine in <img>), but meant the raw base64 got
 * written straight into the exported README.md, making it huge and ugly.
 *
 * This endpoint takes that same compressed base64 payload, uploads it to
 * imgbb on the server (API key lives only in the Vercel env, never sent to
 * the browser), and returns back a normal https:// URL. That's what gets
 * saved into block content and into the markdown - never the base64 data.
 *
 * Setup: set IMGBB_API_KEY in your Vercel project's Environment Variables
 * (free key from https://api.imgbb.com/). Nothing else to configure -
 * Vercel picks up files under /api automatically as serverless functions.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error:
        "Image hosting isn't configured on this deployment. Set IMGBB_API_KEY in your Vercel project settings.",
    });
  }

  try {
    const { image } = req.body || {};
    if (!image || typeof image !== "string") {
      return res.status(400).json({ error: "No image data provided" });
    }

    // Strip the "data:image/jpeg;base64," prefix if present - imgbb wants
    // the raw base64 payload only.
    const base64 = image.includes(",") ? image.split(",")[1] : image;

    // Rough size guard server-side too (base64 is ~33% bigger than the
    // binary it encodes) - keeps someone from hammering this endpoint with
    // huge payloads even if the client-side check is bypassed.
    const approxBytes = (base64.length * 3) / 4;
    if (approxBytes > 8 * 1024 * 1024) {
      return res.status(413).json({ error: "Image is too large" });
    }

    const form = new URLSearchParams();
    form.append("key", apiKey);
    form.append("image", base64);

    const uploadRes = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: form,
    });
    const data = await uploadRes.json();

    if (!uploadRes.ok || !data?.success) {
      return res.status(502).json({ error: "Upload failed, please try again" });
    }

    return res.status(200).json({ url: data.data.url });
  } catch {
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
