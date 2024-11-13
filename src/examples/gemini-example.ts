import { Crawler } from "../scraper/Crawler";
import { GeminiModels, GeminiAdapter } from "../llm/models/GeminiAdapter";

async function main() {
  // URL of the web page to scrape
  const url = "https://www.example.com";

  // Create a new GeminiAdapter instance with your API key and chosen model
  const gemini = new GeminiAdapter(
    "YOUR_GOOGLE_GENERATIVE_AI_API_KEY", // Replace with your actual API key
    GeminiModels.GEMINI_1_5_FLASH // Choose the model that suits your needs
  );

  // Create a new crawler instance with the URL, LLM adapter, and strict mode enabled
  const crawler = new Crawler(url, gemini, true);

  try {
    // Define your prompt for the AI analysis
    const prompt = "Provide a summary of the key points in JSON format.";

    // Scrape and analyze the content
    const result = await crawler.scrape(prompt);

    // Output the result
    console.log("Analysis Result:", result);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
