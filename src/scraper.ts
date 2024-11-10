import axios from "axios";
import cheerio from "cheerio";

export async function scrape() {
  const url = "https://www.google.com";
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const title = $("title").text();
  console.log(title);
}

(async () => {
  await scrape();
})();
