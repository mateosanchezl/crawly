import { GeminiAdapter } from "./llm/models/GeminiAdapter";
import { CheerioScraper } from "./scraper/CheerioScraper";

async function run() {
  const url = "https://www.investopedia.com/ask/answers/05/ltbondrisk.asp";
  const scraper = new CheerioScraper(url, true);

  try {
    console.log("Starting extraction...");
    const text = await scraper.extractText();
    console.log("Extraction complete.");
    console.log(text);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

run();
