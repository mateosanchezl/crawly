import { GeminiAdapter, GeminiModels } from "./llm/models/GeminiAdapter";
import { CheerioScraper } from "./scraper/CheerioScraper";

async function scrape() {
  const url = "https://www.coca-colacompany.com/about-us";
  const scraper = new CheerioScraper(url, true);
  const gemini = new GeminiAdapter(
    "***REMOVED***",
    GeminiModels.GEMINI_1_5_FLASH
  );

  try {
    const text = await scraper.extractText();

    const result = await gemini.analyseText(
      text,
      "Give me information about this company for a cover letter in JSON format."
    );

    console.log("Result: ", result);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

scrape();
