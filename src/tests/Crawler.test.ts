import { Crawler } from "../scraper/Crawler";

describe("Crawler", () => {
  const validUrl = "https://example.com";
  const invalidUrl = "invalid-url";
  let scraper: Crawler;

  test("should initialize with default strict value", () => {
    scraper = new Crawler(validUrl);
    expect(scraper).toBeDefined();
  });

  test("should extract text from a valid URL", async () => {
    scraper = new Crawler(validUrl);
    const text = await scraper.extractText();
    expect(typeof text).toBe("string");
    expect(text.length).toBeGreaterThan(0);
  });

  test("should throw an error for an invalid URL", async () => {
    scraper = new Crawler(invalidUrl);
    await expect(scraper.extractText()).rejects.toThrow(
      "Failed to extract text from the URL. Please check the URL and try again."
    );
  });

  test("should respect the strict mode", async () => {
    scraper = new Crawler(validUrl, false);
    const text = await scraper.extractText();
    expect(typeof text).toBe("string");
  });
});
