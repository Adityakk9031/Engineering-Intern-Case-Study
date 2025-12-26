
export type QuoteCategory =
  | "GOOD_MORNING"
  | "MOTIVATIONAL"
  | "SHAYARI"
  | "RELIGIOUS"
  | "LOVE"
  | "FESTIVAL";

export type SafeBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type QuoteTemplate = {
  id: string;
  fileName: string;
  previewFileName: string;
  orientation: "portrait" | "landscape";
  categories: QuoteCategory[];
  nameBounds: SafeBounds;
  photoBounds: SafeBounds;
  dateBounds: SafeBounds;
  quoteBounds?: SafeBounds; // Optional for future template design
};
export type QuoteTemplate2 = {
  id: string;
  fileName: string;
  previewFileName: string;
  orientation: "portrait" | "landscape";
  categories: QuoteCategory[];
  quoteBounds?: SafeBounds; 
   // Optional for future template design
};

// NOTE: These metadata values assume 540x960 previews.
// Adjust in-app placement via styles if you change template sizes.
export const quoteTemplates: QuoteTemplate[] = [
  // GOOD_MORNING templates
  {
    id: "tmpl_good_morning_1",
    fileName: "gm1.jpg",
    previewFileName: "gm1_preview.jpg",
    orientation: "portrait",
    categories: ["GOOD_MORNING"],
    nameBounds: { x: 60, y: 650, width: 420, height: 80 },
    photoBounds: { x: 40, y: 740, width: 64, height: 64 },
    dateBounds: { x: 40, y: 80, width: 160, height: 48 },
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  {
    id: "tmpl_good_morning_2",
    fileName: "gm2.jpg",
    previewFileName: "gm2_preview.jpg",
    orientation: "portrait",
    categories: ["GOOD_MORNING"],
    nameBounds: { x: 60, y: 650, width: 420, height: 80 },
    photoBounds: { x: 40, y: 740, width: 64, height: 64 },
    dateBounds: { x: 40, y: 80, width: 160, height: 48 },
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  // MOTIVATIONAL templates
  {
    id: "tmpl_motivational_1",
    fileName: "motivational1.jpg",
    previewFileName: "motivational1_preview.jpg",
    orientation: "portrait",
    categories: ["MOTIVATIONAL"],
    nameBounds: { x: 60, y: 640, width: 420, height: 80 },
    photoBounds: { x: 40, y: 730, width: 64, height: 64 },
    dateBounds: { x: 40, y: 90, width: 160, height: 48 },
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  {
    id: "tmpl_motivational_2",
    fileName: "motivational2.jpg",
    previewFileName: "motivational2_preview.jpg",
    orientation: "portrait",
    categories: ["MOTIVATIONAL"],
    nameBounds: { x: 60, y: 640, width: 420, height: 80 },
    photoBounds: { x: 40, y: 730, width: 64, height: 64 },
    dateBounds: { x: 40, y: 90, width: 160, height: 48 },
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  // SHAYARI templates
  {
    id: "tmpl_shayari_1",
    fileName: "shayari1.jpg",
    previewFileName: "shayari1_preview.jpg",
    orientation: "portrait",
    categories: ["SHAYARI"],
    nameBounds: { x: 60, y: 660, width: 420, height: 80 },
    photoBounds: { x: 40, y: 750, width: 64, height: 64 },
    dateBounds: { x: 40, y: 90, width: 160, height: 48 },
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  {
    id: "tmpl_shayari_2",
    fileName: "shayari2.jpg",
    previewFileName: "shayari2_preview.jpg",
    orientation: "portrait",
    categories: ["SHAYARI"],
    nameBounds: { x: 60, y: 660, width: 420, height: 80 },
    photoBounds: { x: 40, y: 750, width: 64, height: 64 },
    dateBounds: { x: 40, y: 90, width: 160, height: 48 },
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  // RELIGIOUS templates
  {
    id: "tmpl_religious_1",
    fileName: "religious1.jpg",
    previewFileName: "religious1_preview.jpg",
    orientation: "portrait",
    categories: ["RELIGIOUS"],
    nameBounds: { x: 60, y: 650, width: 420, height: 80 },
    photoBounds: { x: 40, y: 740, width: 64, height: 64 },
    dateBounds: { x: 40, y: 80, width: 160, height: 48 },
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  {
    id: "tmpl_religious_2",
    fileName: "religious2.jpg",
    previewFileName: "religious2_preview.jpg",
    orientation: "portrait",
    categories: ["RELIGIOUS"],
    nameBounds: { x: 60, y: 650, width: 420, height: 80 },
    photoBounds: { x: 40, y: 740, width: 64, height: 64 },
    dateBounds: { x: 40, y: 80, width: 160, height: 48 },
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  // LOVE templates
  {
    id: "tmpl_love_1",
    fileName: "love1.jpg",
    previewFileName: "love1_preview.jpg",
    orientation: "portrait",
    categories: ["LOVE"],
    nameBounds: { x: 60, y: 650, width: 420, height: 80 },
    photoBounds: { x: 40, y: 740, width: 64, height: 64 },
    dateBounds: { x: 40, y: 80, width: 160, height: 48 },
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  {
    id: "tmpl_love_2",
    fileName: "love2.jpg",
    previewFileName: "love2_preview.jpg",
    orientation: "portrait",
    categories: ["LOVE"],
    nameBounds: { x: 60, y: 650, width: 420, height: 80 },
    photoBounds: { x: 40, y: 740, width: 64, height: 64 },
    dateBounds: { x: 40, y: 80, width: 160, height: 48 },
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  // FESTIVAL templates
  {
    id: "tmpl_festival_1",
    fileName: "festival1.jpg",
    previewFileName: "festival1_preview.jpg",
    orientation: "portrait",
    categories: ["FESTIVAL"],
    nameBounds: { x: 60, y: 650, width: 420, height: 80 },
    photoBounds: { x: 40, y: 740, width: 64, height: 64 },
    dateBounds: { x: 40, y: 80, width: 160, height: 48 },
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  {
    id: "tmpl_festival_2",
    fileName: "festival2.jpg",
    previewFileName: "festival2_preview.jpg",
    orientation: "portrait",
    categories: ["FESTIVAL"],
    nameBounds: { x: 60, y: 650, width: 420, height: 80 },
    photoBounds: { x: 40, y: 740, width: 64, height: 64 },
    dateBounds: { x: 40, y: 80, width: 160, height: 48 },
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  }
];

export const quoteTemplates2: QuoteTemplate2[] = [
  // GOOD_MORNING templates
  {
    id: "tmpl_good_morning_1",
    fileName: "gm1.jpg",
    previewFileName: "gm1_preview.jpg",
    orientation: "portrait",
    categories: ["GOOD_MORNING"],
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  {
    id: "tmpl_good_morning_2",
    fileName: "gm2.jpg",
    previewFileName: "gm2_preview.jpg",
    orientation: "portrait",
    categories: ["GOOD_MORNING"],
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  // MOTIVATIONAL templates
  {
    id: "tmpl_motivational_1",
    fileName: "motivational1.jpg",
    previewFileName: "motivational1_preview.jpg",
    orientation: "portrait",
    categories: ["MOTIVATIONAL"],
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  {
    id: "tmpl_motivational_2",
    fileName: "motivational2.jpg",
    previewFileName: "motivational2_preview.jpg",
    orientation: "portrait",
    categories: ["MOTIVATIONAL"],
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  // SHAYARI templates
  {
    id: "tmpl_shayari_1",
    fileName: "shayari1.jpg",
    previewFileName: "shayari1_preview.jpg",
    orientation: "portrait",
    categories: ["SHAYARI"],
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  {
    id: "tmpl_shayari_2",
    fileName: "shayari2.jpg",
    previewFileName: "shayari2_preview.jpg",
    orientation: "portrait",
    categories: ["SHAYARI"],
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  // RELIGIOUS templates
  {
    id: "tmpl_religious_1",
    fileName: "religious1.jpg",
    previewFileName: "religious1_preview.jpg",
    orientation: "portrait",
    categories: ["RELIGIOUS"],
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  {
    id: "tmpl_religious_2",
    fileName: "religious2.jpg",
    previewFileName: "religious2_preview.jpg",
    orientation: "portrait",
    categories: ["RELIGIOUS"],
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  // LOVE templates
  {
    id: "tmpl_love_1",
    fileName: "love1.jpg",
    previewFileName: "love1_preview.jpg",
    orientation: "portrait",
    categories: ["LOVE"],
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  {
    id: "tmpl_love_2",
    fileName: "love2.jpg",
    previewFileName: "love2_preview.jpg",
    orientation: "portrait",
    categories: ["LOVE"],
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  // FESTIVAL templates
  {
    id: "tmpl_festival_1",
    fileName: "festival1.jpg",
    previewFileName: "festival1_preview.jpg",
    orientation: "portrait",
    categories: ["FESTIVAL"],
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  },
  {
    id: "tmpl_festival_2",
    fileName: "festival2.jpg",
    previewFileName: "festival2_preview.jpg",
    orientation: "portrait",
    categories: ["FESTIVAL"],
    quoteBounds: { x: 20, y: 200, width: 500, height: 200 }
  }
];

export async function listTemplates(): Promise<QuoteTemplate[]> {
  return quoteTemplates;
}

export async function listTemplates2(): Promise<QuoteTemplate2[]> {
  return quoteTemplates2;
}
/**
 * Get templates filtered by category
 * @param category Category to filter by
 * @returns Array of templates for that category
 */
export function getTemplatesByCategory(category: QuoteCategory): QuoteTemplate[] {
  return quoteTemplates.filter((t) =>
    t.categories.includes(category)
  );
}

export function getTemplatesByCategory2(category: QuoteCategory): QuoteTemplate2[] {
  return quoteTemplates.filter((t) =>
    t.categories.includes(category)
  );
}

/**
 * Get a random template from a category
 * @param category Category to pick from
 * @returns Random template or undefined if category has no templates
 */
export function getRandomTemplateByCategory(category: QuoteCategory): QuoteTemplate | undefined {
  const templates = getTemplatesByCategory(category);
  if (templates.length === 0) return undefined;
  return templates[Math.floor(Math.random() * templates.length)];
}

export function getRandomTemplateByCategory2(category: QuoteCategory): QuoteTemplate2 | undefined {
  const templates = getTemplatesByCategory2(category);
  if (templates.length === 0) return undefined;
  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Get template by ID
 * @param id Template ID
 * @returns Template or undefined
 */
export function getTemplateById(id: string): QuoteTemplate | undefined {
  return quoteTemplates.find((t) => t.id === id);
}

export function getTemplateById2(id: string): QuoteTemplate2 | undefined {
  return quoteTemplates2.find((t) => t.id === id);
}





