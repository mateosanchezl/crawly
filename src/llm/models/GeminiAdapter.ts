import { LLMAdapter } from "../LLMAdapter";
import { GenerateContentResult, GoogleGenerativeAI } from "@google/generative-ai";

export enum GeminiModels {
  GEMINI_1_5_FLASH = "gemini-1.5-flash",
  GEMINI_1_5_FLASH_8B = "gemini-1.5-flash-8b",
  GEMINI_1_5_PRO = "gemini-1.5-pro",
  GEMINI_1_0_PRO = "gemini-1.0-pro",
  TEXT_EMBEDDING = "text-embedding-004",
  AQA = "aqa",
}

export class GeminiAdapter extends LLMAdapter {
  apiKey: string;
  model: GeminiModels;

  constructor(apiKey: string, model: GeminiModels) {
    super();
    this.apiKey = apiKey;
    this.model = model;
  }

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
