export const LANGUAGES = ['es', 'en', 'fr', 'de', 'it', 'zh'] as const;
export type lang = (typeof LANGUAGES)[number];
export const PROFICIENCY = [
  'basic',
  'intermediate',
  'advanced',
  'native',
] as const;
export type proficiency = (typeof PROFICIENCY)[number];

// t("languages:es")
// t("languages:en")
// t("languages:fr")
// t("languages:de")
// t("languages:it")
// t("languages:zh")

// t("languages:basic")
// t("languages:intermediate")
// t("languages:advanced")
// t("languages:native")
