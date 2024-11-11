import { LLMAdapter } from "../LLMAdapter";
/**
 * Enum representing the available Gemini models.
 */
export declare enum GeminiModels {
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
    AQA = "aqa"
}
/**
 * Adapter class for interacting with Google's Gemini language models.
 * Extends the abstract LLMAdapter class.
 */
export declare class GeminiAdapter extends LLMAdapter {
    /** Your API key for Google Generative AI */
    apiKey: string;
    /** The selected Gemini model */
    model: GeminiModels;
    /**
     * Creates an instance of GeminiAdapter.
     * @param apiKey - Your Google Generative AI API key.
     * @param model - The Gemini model to use.
     */
    constructor(apiKey: string, model: GeminiModels);
    /**
     * Analyzes text using the specified Gemini model and prompt.
     * @param text - The text to analyze.
     * @param prompt - The prompt to guide the analysis.
     * @returns A promise that resolves to the generated content as a string.
     * @throws Will throw an error if content generation fails.
     */
    analyseText(text: string, prompt: string): Promise<string>;
}
//# sourceMappingURL=GeminiAdapter.d.ts.map