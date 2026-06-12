// backend/utils/scrapeStocksList.js
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeStocksList() {
  const url = 'https://afx.kwayisi.org/nse/';
  const { data } = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  const $ = cheerio.load(data);
  const stocks = [];

  // Find the main table (adjust selector if needed)
  const table = $('#stockTable').length ? $('#stockTable') : $('table').first();
  table.find('tbody tr').each((i, row) => {
    const cells = $(row).find('td');
    if (cells.length >= 2) {
      const symbol = $(cells[0]).text().trim();
      const name = $(cells[1]).text().trim();
      if (symbol && name) {
        stocks.push({ symbol, name });
      }
    }
  });
  return counters;
}

module.exports = { scrapeStocksList };