/**
 * Image safety helper to prevent Next.js <Image /> crashes when users
 * enter relative paths without leading slashes, invalid text, or empty values in the CMS.
 */
export function getSafeImageUrl(
  src?: string | null,
  fallback: string = "/images/hero-slide-clean.jpg"
): string {
  if (!src || typeof src !== "string") {
    return fallback;
  }

  const trimmed = src.trim();
  if (!trimmed) {
    return fallback;
  }

  // Already a valid Next.js root-relative path or web URL or data URI
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:")
  ) {
    return trimmed;
  }

  // If user typed "images/something.jpg" or "my-pic.png", ensure leading slash
  if (trimmed.includes(".") || trimmed.includes("/")) {
    return `/${trimmed}`;
  }

  // If user entered a plain string like "test" with no slash and no extension, fallback
  return fallback;
}
