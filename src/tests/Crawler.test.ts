import axios from "axios";
import { Crawler } from "../scraper/Crawler";
import { LLMAdapter } from "../llm/LLMAdapter";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock response for axios.get
mockedAxios.get.mockResolvedValue({
  data: "<html><body><p>Test content</p></body></html>",
});

class MockLLMAdapter implements LLMAdapter {
  apiKey = "test-api-key";

  analyseText(text: string, prompt: string): Promise<string> {
    return Promise.resolve("Mock analysis result");
  }
}

describe("Crawler", () => {
  const validUrl = "https://example.com";
  const invalidUrl = "invalid-url";
  let crawler: Crawler;
  const mockLLMAdapter = new MockLLMAdapter();
  const testPrompt = "Test prompt";

  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  test("should initialize with default strict value", () => {
    crawler = new Crawler(validUrl, mockLLMAdapter);
    expect(crawler).toBeDefined();
  });

  test("should scrape and analyze text from a valid URL", async () => {
    crawler = new Crawler(validUrl, mockLLMAdapter);
    const result = await crawler.scrape(testPrompt);
    expect(mockedAxios.get).toHaveBeenCalledWith(validUrl);
    expect(result).toBe("Mock analysis result");
  });

  test("should throw an error for an invalid URL", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));
    crawler = new Crawler(invalidUrl, mockLLMAdapter);
    await expect(crawler.scrape(testPrompt)).rejects.toThrow(
      "Failed to scrape and analyze the URL. Please check the URL and try again."
    );
  });

  test("should respect the strict mode", async () => {
    crawler = new Crawler(validUrl, mockLLMAdapter, false);
    const result = await crawler.scrape(testPrompt);
    expect(result).toBe("Mock analysis result");
  });
});
