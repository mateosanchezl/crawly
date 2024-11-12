import * as cheerio from "cheerio";
import axios from "axios";

/**
 * A scraper that extracts and cleans text from a given URL using Cheerio.
 */
export class Crawler {
  /** The URL to scrape. */
  private url: string;
  /** Whether to perform strict cleaning of the extracted text. */
  private strict: boolean;

  /**
   * Creates an instance of Crawler.
   * @param url - The URL to scrape.
   * @param strict - Whether to perform strict cleaning (default is true).
   */
  constructor(url: string, strict: boolean = true) {
    this.url = url;
    this.strict = strict;
  }

  /**
   * Extracts and cleans text from the URL.
   * @returns A promise that resolves to the extracted text.
   * @throws Will throw an error if text extraction fails.
   */
  public async extractText(): Promise<string> {
    try {
      console.log(`Fetching URL: ${this.url}`);
      // Fetch the page content
      const { data } = await axios.get(this.url);

      // Load the page content into Cheerio
      const $ = cheerio.load(data);

      // Clean and return the extracted text
      return this.cleanText($);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to extract text from the URL. Please check the URL and try again.");
    }
  }

  /**
   * Cleans the extracted HTML content.
   * @param $ - The Cheerio instance containing the HTML content.
   * @returns The cleaned and trimmed text.
   */
  private cleanText($: cheerio.CheerioAPI): string {
    // Remove scripts, styles, and other unwanted elements
    $("script, style, footer, header").remove();

    // Strict cleaning
    this.strict &&
      $("iframe, nav, .hidden, [aria-hidden='true'], noscript, link, meta, img").remove();

    // Extract text from body content
    const text = $("body").text();

    return text.replace(/\s+/g, " ").trim();
  }
}
