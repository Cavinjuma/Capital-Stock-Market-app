const axios = require('axios');
const cheerio = require('cheerio');

async function debugAfx() {
  const url = 'https://afx.kwayisi.org/nse/';
  try {
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const $ = cheerio.load(data);
    
    // Find the main table (usually with id="stockTable" or class="table")
    let table = $('#stockTable');
    if (table.length === 0) table = $('table').first();
    
    console.log('Table found:', table.length > 0);
    
    // Log headers
    const headers = [];
    table.find('thead th').each((i, th) => {
      headers.push($(th).text().trim());
    });
    console.log('Headers:', headers);
    
    // Log first data row cells with indices
    const firstRow = table.find('tbody tr').first();
    const cells = firstRow.find('td');
    console.log(`First row has ${cells.length} cells:`);
    cells.each((idx, cell) => {
      console.log(`  cell[${idx}]: "${$(cell).text().trim()}"`);
    });
    
  } catch (err) {
    console.error('Error:', err.message);
  }
}

debugAfx();