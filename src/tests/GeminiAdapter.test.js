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
const GeminiAdapter_1 = require("../llm/models/GeminiAdapter");
const generative_ai_1 = require("@google/generative-ai");
jest.mock("@google/generative-ai");
describe("GeminiAdapter", () => {
    const apiKey = "test-api-key";
    const model = GeminiAdapter_1.GeminiModels.GEMINI_1_5_FLASH;
    let adapter;
    beforeEach(() => {
        adapter = new GeminiAdapter_1.GeminiAdapter(apiKey, model);
    });
    test("should initialize with the correct API key and model", () => {
        expect(adapter.apiKey).toBe(apiKey);
        expect(adapter.model).toBe(model);
    });
    test("should analyze text using the specified model and prompt", () => __awaiter(void 0, void 0, void 0, function* () {
        const text = "This is a test text.";
        const prompt = "Analyze this: ";
        const mockResponse = { response: { text: jest.fn().mockReturnValue("Generated content") } };
        generative_ai_1.GoogleGenerativeAI.mockImplementation(() => ({
            getGenerativeModel: jest.fn().mockReturnValue({
                generateContent: jest.fn().mockResolvedValue(mockResponse),
            }),
        }));
        const result = yield adapter.analyseText(text, prompt);
        expect(result).toBe("Generated content");
    }));
    test("should throw an error if content generation fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const text = "This is a test text.";
        const prompt = "Analyze this: ";
        generative_ai_1.GoogleGenerativeAI.mockImplementation(() => ({
            getGenerativeModel: jest.fn().mockReturnValue({
                generateContent: jest.fn().mockRejectedValue(new Error("Generation failed")),
            }),
        }));
        yield expect(adapter.analyseText(text, prompt)).rejects.toThrow("Error in generating content. Please check the prompt and try again.");
    }));
});
