"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const Crawler_1 = require("../scraper/Crawler");
const GeminiAdapter_1 = require("../llm/models/GeminiAdapter");
function main() {
  return __awaiter(this, void 0, void 0, function* () {
    // URL of the web page to scrape
    const url = "https://www.example.com";
    // Create a new scraper instance with the URL and strict mode enabled
    const scraper = new Crawler_1.Crawler(url, true);
    // Create a new GeminiAdapter instance with your API key and chosen model
    const gemini = new GeminiAdapter_1.GeminiAdapter(
      "YOUR_GOOGLE_GENERATIVE_AI_API_KEY", // Replace with your actual API key
      GeminiAdapter_1.GeminiModels.GEMINI_1_5_FLASH // Choose the model that suits your needs
    );
    try {
      // Extract text from the web page
      const text = yield scraper.extractText();
      // Define your prompt for the AI analysis
      const prompt = "Provide a summary of the key points in JSON format.";
      // Analyze the extracted text using the Gemini model
      const result = yield gemini.analyseText(text, prompt);
      // Output the result
      console.log("Analysis Result:", result);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
}
main();
