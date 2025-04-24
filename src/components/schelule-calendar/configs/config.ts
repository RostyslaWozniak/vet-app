/**
 * Calendar configuration constants
 */

const DEFAULT_CELL_SIZE = 60;

export const CALENDAR_CONFIG = {
  // Cell size options for the calendar grid
  CELL_SIZES: [
    { label: "S", value: DEFAULT_CELL_SIZE },
    { label: "M", value: 120 },
    { label: "L", value: 160 },
  ],
  // Default cell size in pixels
  DEFAULT_CELL_SIZE: DEFAULT_CELL_SIZE,
};
