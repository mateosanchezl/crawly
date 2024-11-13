import { GeminiAdapter, GeminiModels } from "../llm/models/GeminiAdapter";
import { GoogleGenerativeAI } from "@google/generative-ai";

jest.mock("@google/generative-ai");

describe("GeminiAdapter", () => {
  const apiKey = "test-api-key";
  const model = GeminiModels.GEMINI_1_5_FLASH;
  let adapter: GeminiAdapter;

  beforeEach(() => {
    adapter = new GeminiAdapter(apiKey, model);
  });

  test("should initialize with the correct API key and model", () => {
    expect(adapter.apiKey).toBe(apiKey);
    expect(adapter.model).toBe(model);
  });

  test("should generate analysis using the specified model and prompt", async () => {
    const text = "This is a test text.";
    const prompt = "Analyze this: ";
    const mockResponse = {
      response: {
        text: jest.fn().mockReturnValue("Generated content"),
      },
    };

    // Mock the methods of GoogleGenerativeAI
    (GoogleGenerativeAI as jest.Mock).mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: jest.fn().mockResolvedValue(mockResponse),
      }),
    }));

    const result = await adapter.analyseText(text, prompt);
    expect(result).toBe("Generated content");
  });

  test("should throw an error if content generation fails", async () => {
    const text = "This is a test text.";
    const prompt = "Analyze this: ";

    // Mock generateContent to reject
    (GoogleGenerativeAI as jest.Mock).mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: jest.fn().mockRejectedValue(new Error("Generation failed")),
      }),
    }));

    await expect(adapter.analyseText(text, prompt)).rejects.toThrow(
      "Error in generating content. Please check the prompt and try again."
    );
  });
});
