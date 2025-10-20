export const SORT_OPTIONS = {
  NAME_ASC: 'name_asc',
  COUNT_ASC: 'count_asc',
  COUNT_DESC: 'count_desc',
} as const;

export type SortOption = typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS];

export const SORT_LABELS: Record<SortOption, string> = {
  [SORT_OPTIONS.NAME_ASC]: 'Name (A-Z)',
  [SORT_OPTIONS.COUNT_ASC]: 'Count (Asc)',
  [SORT_OPTIONS.COUNT_DESC]: 'Count (Desc)',
};