export interface FilterChoice {
  value: string;
  label?: string;
}

export interface BaseFilter {
  id: string;
  name: string;
  type: string;
}

export type Filter =
  | (BaseFilter & { type: 'range'; min: number; max: number; step?: number; currency?: string })
  | (BaseFilter & { type: 'checkbox'; choices: string[] | FilterChoice[] });

export type FiltersByCategory = Record<string, Filter[]>;