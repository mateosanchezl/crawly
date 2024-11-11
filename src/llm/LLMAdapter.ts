/**
 * Abstract class representing an LLM (Large Language Model) adapter.
 */
export abstract class LLMAdapter {
  /**
   * The API key for authentication.
   */
  abstract apiKey: string;

  /**
   * Analyzes the given text using the specified prompt.
   * @param text - The text to analyze.
   * @param prompt - The prompt to guide the analysis.
   * @returns A promise resolving to the analysis result.
   */
  abstract analyseText(text: string, prompt: string): Promise<any>;
}
