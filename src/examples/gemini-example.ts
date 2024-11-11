import { CheerioScraper } from "../scraper/CheerioScraper";
import { GeminiModels, GeminiAdapter } from "../llm/models/GeminiAdapter";

async function main() {
  // URL of the web page to scrape
  const url = "https://www.example.com";

  // Create a new scraper instance with the URL and strict mode enabled
  const scraper = new CheerioScraper(url, true);

  // Create a new GeminiAdapter instance with your API key and chosen model
  const gemini = new GeminiAdapter(
    "YOUR_GOOGLE_GENERATIVE_AI_API_KEY", // Replace with your actual API key
    GeminiModels.GEMINI_1_5_FLASH // Choose the model that suits your needs
  );

  try {
    // Extract text from the web page
    const text = await scraper.extractText();

    // Define your prompt for the AI analysis
    const prompt = "Provide a summary of the key points in JSON format.";

    // Analyze the extracted text using the Gemini model
    const result = await gemini.analyseText(text, prompt);

    // Output the result
    console.log("Analysis Result:", result);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
