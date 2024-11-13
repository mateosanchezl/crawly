import * as cheerio from "cheerio";
import axios from "axios";
import { LLMAdapter } from "../llm/LLMAdapter";

/**
 * A web crawler that extracts and cleans text from a given URL and generates analysis using a language model adapter.
 */
export class Crawler {
  /** The URL to scrape. */
  private url: string;
  /** Whether to perform strict cleaning of the extracted text. */
  private strict: boolean;
  /** The language model adapter to use for generating analysis. */
  private model: LLMAdapter;

  /**
   * Creates an instance of Crawler.
   * @param url - The URL to scrape.
   * @param model - The LLM adapter to use for generating analysis.
   * @param strict - Whether to perform strict cleaning (default is true).
   */
  constructor(url: string, model: LLMAdapter, strict: boolean = true) {
    this.url = url;
    this.strict = strict;
    this.model = model;
  }

  /**
   * Scrapes the URL, cleans the extracted text, and generates analysis using the provided prompt.
   * @param prompt - The prompt to guide the language model analysis.
   * @returns A promise that resolves to the analysis result.
   * @throws Will throw an error if scraping or analysis fails.
   */
  public async scrape(prompt: string): Promise<string> {
    try {
      const text = await this.extractText();

      // Generate analysis of the cleaned text using the language model
      const result = await this.model.analyseText(text, prompt);

      return result;
    } catch (error) {
      throw new Error("Failed to scrape and analyze the URL. Please check the URL and try again.");
    }
  }

  /**
   * Extracts and cleans text from the URL.
   * @returns A promise that resolves to the cleaned text.
   * @throws Will throw an error if text extraction fails.
   */
  public async extractText(): Promise<string> {
    try {
      // Fetch the page content
      const { data } = await axios.get(this.url);

      // Load the page content into Cheerio
      const $ = cheerio.load(data);

      // Clean and return the extracted text
      return this.cleanText($);
    } catch (error) {
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
    if (this.strict) {
      $("iframe, nav, .hidden, [aria-hidden='true'], noscript, link, meta, img").remove();
    }

    // Extract text from body content
    const text = $("body").text();

    return text.replace(/\s+/g, " ").trim();
  }
}
