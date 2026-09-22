import type { Locator } from "@playwright/test";

/** The element's declared family chain. Names only, never glyph metrics, so it
 *  holds whether or not the webfont has finished loading. */
export const fontFamily = (locator: Locator) => locator.evaluate((el) => getComputedStyle(el).fontFamily);

/** A family chain that leads with the given face. */
export const leadsWith = (face: string) => new RegExp(`^"?${face}"?,`);
