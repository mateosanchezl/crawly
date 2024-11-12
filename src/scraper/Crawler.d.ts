/**
 * A scraper that extracts and cleans text from a given URL using Cheerio.
 */
export declare class Crawler {
  /** The URL to scrape. */
  private url;
  /** Whether to perform strict cleaning of the extracted text. */
  private strict;
  /**
   * Creates an instance of Crawler.
   * @param url - The URL to scrape.
   * @param strict - Whether to perform strict cleaning (default is true).
   */
  constructor(url: string, strict?: boolean);
  /**
   * Extracts and cleans text from the URL.
   * @returns A promise that resolves to the extracted text.
   * @throws Will throw an error if text extraction fails.
   */
  extractText(): Promise<string>;
  /**
   * Cleans the extracted HTML content.
   * @param $ - The Cheerio instance containing the HTML content.
   * @returns The cleaned and trimmed text.
   */
  private cleanText;
}
//# sourceMappingURL=Crawler.d.ts.map
