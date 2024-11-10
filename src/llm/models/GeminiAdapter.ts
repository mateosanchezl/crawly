import { LLMAdapter } from "../LLMAdapter";
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Enum representing the available Gemini models.
 */
export enum GeminiModels {
  /** Fast and versatile performance across a variety of tasks */
  GEMINI_1_5_FLASH = "gemini-1.5-flash",
  /** High volume and lower intelligence tasks */
  GEMINI_1_5_FLASH_8B = "gemini-1.5-flash-8b",
  /** Complex reasoning tasks requiring more intelligence */
  GEMINI_1_5_PRO = "gemini-1.5-pro",
  /** Natural language tasks, multi-turn text and code chat, and code generation */
  GEMINI_1_0_PRO = "gemini-1.0-pro",
  /** Measuring the relatedness of text strings */
  TEXT_EMBEDDING = "text-embedding-004",
  /** Providing source-grounded answers to questions */
  AQA = "aqa",
}

/**
 * Adapter class for interacting with Google's Gemini language models.
 * Extends the abstract LLMAdapter class.
 */
export class GeminiAdapter extends LLMAdapter {
  /** Your API key for Google Generative AI */
  public apiKey: string;

  /** The selected Gemini model */
  public model: GeminiModels;

  /**
   * Creates an instance of GeminiAdapter.
   * @param apiKey - Your Google Generative AI API key.
   * @param model - The Gemini model to use.
   */
  constructor(apiKey: string, model: GeminiModels) {
    super();
    this.apiKey = apiKey;
    this.model = model;
  }

  /**
   * Analyzes text using the specified Gemini model and prompt.
   * @param text - The text to analyze.
   * @param prompt - The prompt to guide the analysis.
   * @returns A promise that resolves to the generated content as a string.
   * @throws Will throw an error if content generation fails.
   */
  public async analyseText(text: string, prompt: string): Promise<string> {
    try {
      const genAI = new GoogleGenerativeAI(this.apiKey);

      const model = genAI.getGenerativeModel({ model: this.model });

      const result = await model.generateContent(prompt + text);

      return result.response.text();
    } catch (error) {
      console.error("An error occurred:", error);
      throw new Error("Error in generating content. Please check the prompt and try again.");
    }
  }
}
