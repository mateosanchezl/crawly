import * as cheerio from "cheerio";
import axios from "axios";

export class CheerioScraper {
  private url: string;
  private strict: boolean;

  constructor(url: string, strict: boolean = true) {
    this.url = url;
    this.strict = strict;
  }

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

  private cleanText($: cheerio.CheerioAPI): string {
    // Remove scripts, styles, and other unwanted elements
    $("script, style, footer, header").remove();

    // Strict cleaning
    console.log("Strict:", this.strict);
    this.strict &&
      $("iframe, nav, .hidden, [aria-hidden='true'], noscript, link, meta, img").remove();

    // Extract text from body content
    const text = $("body").text();

    return text.replace(/\s+/g, " ").trim();
  }
}
