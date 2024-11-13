import { LLMAdapter } from "../llm/LLMAdapter";
/**
 * A web crawler that extracts and cleans text from a given URL and generates analysis using a language model adapter.
 */
export declare class Crawler {
    /** The URL to scrape. */
    private url;
    /** Whether to perform strict cleaning of the extracted text. */
    private strict;
    /** The language model adapter to use for generating analysis. */
    private model;
    /**
     * Creates an instance of Crawler.
     * @param url - The URL to scrape.
     * @param model - The LLM adapter to use for generating analysis.
     * @param strict - Whether to perform strict cleaning (default is true).
     */
    constructor(url: string, model: LLMAdapter, strict?: boolean);
    /**
     * Scrapes the URL, cleans the extracted text, and generates analysis using the provided prompt.
     * @param prompt - The prompt to guide the language model analysis.
     * @returns A promise that resolves to the analysis result.
     * @throws Will throw an error if scraping or analysis fails.
     */
    scrape(prompt: string): Promise<string>;
    /**
     * Extracts and cleans text from the URL.
     * @returns A promise that resolves to the cleaned text.
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