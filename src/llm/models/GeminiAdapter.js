"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiAdapter = exports.GeminiModels = void 0;
const LLMAdapter_1 = require("../LLMAdapter");
const generative_ai_1 = require("@google/generative-ai");
/**
 * Enum representing the available Gemini models.
 */
var GeminiModels;
(function (GeminiModels) {
    /** Fast and versatile performance across a variety of tasks */
    GeminiModels["GEMINI_1_5_FLASH"] = "gemini-1.5-flash";
    /** High volume and lower intelligence tasks */
    GeminiModels["GEMINI_1_5_FLASH_8B"] = "gemini-1.5-flash-8b";
    /** Complex reasoning tasks requiring more intelligence */
    GeminiModels["GEMINI_1_5_PRO"] = "gemini-1.5-pro";
    /** Natural language tasks, multi-turn text and code chat, and code generation */
    GeminiModels["GEMINI_1_0_PRO"] = "gemini-1.0-pro";
    /** Measuring the relatedness of text strings */
    GeminiModels["TEXT_EMBEDDING"] = "text-embedding-004";
    /** Providing source-grounded answers to questions */
    GeminiModels["AQA"] = "aqa";
})(GeminiModels || (exports.GeminiModels = GeminiModels = {}));
/**
 * Adapter class for interacting with Google's Gemini language models.
 * Extends the abstract LLMAdapter class.
 */
class GeminiAdapter extends LLMAdapter_1.LLMAdapter {
    /**
     * Creates an instance of GeminiAdapter.
     * @param apiKey - Your Google Generative AI API key.
     * @param model - The Gemini model to use.
     */
    constructor(apiKey, model) {
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
    analyseText(text, prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genAI = new generative_ai_1.GoogleGenerativeAI(this.apiKey);
                const model = genAI.getGenerativeModel({ model: this.model });
                const result = yield model.generateContent(prompt + text);
                return result.response.text();
            }
            catch (error) {
                console.error("An error occurred:", error);
                throw new Error("Error in generating content. Please check the prompt and try again.");
            }
        });
    }
}
exports.GeminiAdapter = GeminiAdapter;
