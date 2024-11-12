"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crawler = void 0;
const cheerio = __importStar(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
/**
 * A scraper that extracts and cleans text from a given URL using Cheerio.
 */
class Crawler {
  /**
   * Creates an instance of Crawler.
   * @param url - The URL to scrape.
   * @param strict - Whether to perform strict cleaning (default is true).
   */
  constructor(url, strict = true) {
    this.url = url;
    this.strict = strict;
  }
  /**
   * Extracts and cleans text from the URL.
   * @returns A promise that resolves to the extracted text.
   * @throws Will throw an error if text extraction fails.
   */
  extractText() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        console.log(`Fetching URL: ${this.url}`);
        // Fetch the page content
        const { data } = yield axios_1.default.get(this.url);
        // Load the page content into Cheerio
        const $ = cheerio.load(data);
        // Clean and return the extracted text
        return this.cleanText($);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to extract text from the URL. Please check the URL and try again.");
      }
    });
  }
  /**
   * Cleans the extracted HTML content.
   * @param $ - The Cheerio instance containing the HTML content.
   * @returns The cleaned and trimmed text.
   */
  cleanText($) {
    // Remove scripts, styles, and other unwanted elements
    $("script, style, footer, header").remove();
    // Strict cleaning
    this.strict &&
      $("iframe, nav, .hidden, [aria-hidden='true'], noscript, link, meta, img").remove();
    // Extract text from body content
    const text = $("body").text();
    return text.replace(/\s+/g, " ").trim();
  }
}
exports.Crawler = Crawler;
