

export interface BaseFilter {
  id: string;
  name: string;
  type: string;
}

export type Filter =
  | (BaseFilter & { type: 'range'; min: number; max: number; step?: number; currency?: string })
  | (BaseFilter & { type: 'checkbox'; choices: string[]  });

type FinalFilter = {
  value: string,
  defaultFilter: Filter[]
  filters: Filter[]
}

export type FiltersByCategory = Record<string, FinalFilter>;