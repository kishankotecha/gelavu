import { ValueTransformer } from 'typeorm';

/**
 * Converts PostgreSQL `decimal`/`numeric` string values to JS numbers on read.
 * Prevents string concatenation bugs when doing arithmetic on monetary/decimal columns.
 */
export const numericTransformer: ValueTransformer = {
  to: (value: number | null | undefined): number | null | undefined => value,
  from: (value: string | null | undefined): number | null => {
    if (value === null || value === undefined) {
      return null;
    }
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? null : parsed;
  },
};
