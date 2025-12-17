import { QuoteTemplate } from "../backend/quotes";

/**
 * Generate a lightweight SVG preview for a template
 * Used to display template thumbnails without loading full-size images
 * 
 * @param template QuoteTemplate to generate preview for
 * @param width Preview width in pixels
 * @param height Preview height in pixels
 * @returns Data URI for SVG preview
 */
export function generateTemplatePreviewURI(
  template: QuoteTemplate,
  width: number = 120,
  height: number = 160
): string {
  // Generate a gradient based on template category
  const gradientMap: Record<string, string> = {
    GOOD_MORNING: "FFD700,FFA500", // Gold to orange
    MOTIVATIONAL: "FF6B6B,FF4757", // Red gradient
    SHAYARI: "DA70D6,FF69B4", // Purple to pink
    RELIGIOUS: "FFD700,DAA520", // Gold gradient
    LOVE: "FF69B4,FFB6C1", // Pink gradient
    FESTIVAL: "FF6B9D,FFC0CB" // Coral to pink
  };

  const category = template.categories[0] || "GOOD_MORNING";
  const [color1, color2] = gradientMap[category]?.split(",") || ["6a0dad", "8b5cf6"];

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      <text x="${width / 2}" y="${height / 2}" font-size="12" fill="white" text-anchor="middle" dy=".3em">
        ${template.id.replace("tmpl_", "").replace(/_/g, " ")}
      </text>
    </svg>
  `.trim();

  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Generate preview URI using canvas (React Native compatible)
 * Fallback to SVG if canvas unavailable
 * 
 * @param template QuoteTemplate
 * @returns Data URI string
 */
export function getPreviewImage(template: QuoteTemplate): string {
  // For mobile, return SVG preview
  return generateTemplatePreviewURI(template, 120, 160);
}
