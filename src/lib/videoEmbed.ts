// Small, shared helpers for embedding external videos safely/consistently.

export const normalizeExternalUrl = (input: string): string => {
  const raw = (input || "").trim();
  if (!raw) return "";

  // Already absolute
  if (/^https?:\/\//i.test(raw)) return raw;

  // Protocol-relative
  if (raw.startsWith("//")) return `https:${raw}`;

  // Common case: "www.facebook.com/..."
  if (raw.startsWith("www.")) return `https://${raw}`;

  // Fallback: treat as https host/path
  return `https://${raw}`;
};

export const getEmbedUrl = (input: string): string => {
  const url = normalizeExternalUrl(input);
  if (!url) return "";

  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`;

  // Facebook: reels/videos/pages
  if (url.includes("facebook.com") || url.includes("fb.watch")) {
    // If it's already a plugin URL, keep it.
    if (url.includes("facebook.com/plugins/video.php")) return url;
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&lazy=true`;
  }

  return url;
};
