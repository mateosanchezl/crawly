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
describe("Crawler", () => {
  const validUrl = "https://example.com";
  const invalidUrl = "invalid-url";
  let scraper;
  test("should initialize with default strict value", () => {
    scraper = new Crawler_1.Crawler(validUrl);
    expect(scraper).toBeDefined();
  });
  test("should extract text from a valid URL", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      scraper = new Crawler_1.Crawler(validUrl);
      const text = yield scraper.extractText();
      expect(typeof text).toBe("string");
      expect(text.length).toBeGreaterThan(0);
    }));
  test("should throw an error for an invalid URL", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      scraper = new Crawler_1.Crawler(invalidUrl);
      yield expect(scraper.extractText()).rejects.toThrow(
        "Failed to extract text from the URL. Please check the URL and try again."
      );
    }));
  test("should respect the strict mode", () =>
    __awaiter(void 0, void 0, void 0, function* () {
      scraper = new Crawler_1.Crawler(validUrl, false);
      const text = yield scraper.extractText();
      expect(typeof text).toBe("string");
    }));
});
