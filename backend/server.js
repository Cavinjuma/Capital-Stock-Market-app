const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { Decimal } = require('@prisma/client/runtime/library');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();
// Add these imports at the top of server.js
const axios = require('axios');
const cheerio = require('cheerio');


let cachedStocks = null;
let lastFetchTime = null;
const CACHE_TTL_MS = 30 * 1000; // 30 second

// Middleware
app.use(cors());
app.use(express.json()); // or configure with specific origin


// Scraping function
async function scrapeMyStocks() {
  const url = 'https://afx.kwayisi.org/nse/';
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
      },
      timeout: 15000
    });
    const $ = cheerio.load(data);
    let stocks = [];

    // Try multiple possible selectors
    const selectors = [
      'table.table-condensed tbody tr',
      'table tbody tr',
      'div.table-responsive table tbody tr',
      '#stockTable tbody tr'
    ];
    
    let rows = null;
    for (const sel of selectors) {
      rows = $(sel);
      if (rows.length > 0) {
        console.log(`Using selector: ${sel} found ${rows.length} rows`);
        break;
      }
    }
    
    if (!rows || rows.length === 0) {
      // Fallback: find any table with at least 4 columns
      const tables = $('table');
      for (let i = 0; i < tables.length; i++) {
        const candidateRows = $(tables[i]).find('tbody tr');
        if (candidateRows.length > 0 && $(candidateRows[0]).find('td').length >= 4) {
          rows = candidateRows;
          console.log(`Using fallback table #${i+1} with ${rows.length} rows`);
          break;
        }
      }
    }
    
    if (!rows || rows.length === 0) {
      throw new Error('No stock data rows found on the page.');
    }

    rows.each((i, row) => {
      const cells = $(row).find('td');
      if (cells.length >= 4) {
        const symbol = $(cells[0]).text().trim();
        const name = $(cells[1]).text().trim();
        let priceText = $(cells[3]).text().trim();
        let changeText = $(cells[4]).text().trim();
        let volumeText =cells.length >= 5? $(cells[2]).text().trim() : '0';

        // Parse price
        let price = 0;
        const priceMatch = priceText.match(/[\d,]+\.?\d*/);
        if (priceMatch) price = parseFloat(priceMatch[0].replace(/,/g, ''));
        
        // Parse change
        let change = 0;
        const changeMatch = changeText.match(/[+-]?\d+\.?\d*/);
        if (changeMatch) change = parseFloat(changeMatch[0]);
        
        // Parse volume
        let volume = 0;
        const volumeMatch = volumeText.match(/[\d,]+/);
        if (volumeMatch) volume = parseInt(volumeMatch[0].replace(/,/g, ''));

        if (symbol && name && price > 0) {
          stocks.push({ symbol, name, price, change, volume });
        }
      }
    });

    if (stocks.length === 0) {
      throw new Error('Parsed 0 stocks – column mapping may be wrong.');
    }
    
    console.log(`Successfully scraped ${stocks.length} stocks`);
    return stocks;
  } catch (error) {
    console.error('Scraping error:', error.message);
    throw new Error('Failed to fetch live data');
  }
}

// API endpoint
app.get('/api/nse', async (req, res) => {
  try {
    // Return cached data if fresh
    if (cachedStocks && lastFetchTime && (Date.now() - lastFetchTime) < CACHE_TTL_MS) {
      return res.json({
        success: true,
        source: 'cache',
        timestamp: lastFetchTime,
        data: cachedStocks
      });
    }

    const stocks = await scrapeMyStocks();
    cachedStocks = stocks;
    lastFetchTime = Date.now();

    res.json({
      success: true,
      source: 'live',
      timestamp: lastFetchTime,
      data: stocks
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Optional: single stock lookup
app.get('/api/nse/:symbol', async (req, res) => {
  try {
    const stocks = cachedStocks || await scrapeMyStocks();
    const stock = stocks.find(s => s.symbol.toUpperCase() === req.params.symbol.toUpperCase());
    if (!stock) {
      return res.status(404).json({ success: false, error: 'Stock not found' });
    }
    res.json({ success: true, data: stock });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Counters
app.get('/api/counters', async (req, res) => {
  try {
    const counters = await prisma.counter.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(counters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/counters', async (req, res) => {
  const { companyName, symbol, sector } = req.body;
  try {
    const counter = await prisma.counter.create({
      data: {
        companyName,
        symbol,
        sector,
      },
    });
    res.status(201).json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Prices
app.get('/api/prices', async (req, res) => {
  try {
    const prices = await prisma.price.findMany({
      orderBy: { date: 'desc' },
    });
    res.json(prices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/prices', async (req, res) => {
  const { stock, date, openingPrice, closingPrice, volume } = req.body;
  try {
    const price = await prisma.price.create({
      data: {
        stock,
        date: new Date(date),
        openingPrice: new Decimal(openingPrice),
        closingPrice: new Decimal(closingPrice),
        volume: parseInt(volume),
      },
    });
    res.status(201).json(price);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Purchases
app.get('/api/purchases', async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(purchases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/purchases', async (req, res) => {
  const { stock, quantity, purchasePrice, createdAt } = req.body;
  try {
    const data = {
      stock,
      quantity: parseInt(quantity),
      purchasePrice: new Decimal(purchasePrice),
    };
    if (createdAt) data.createdAt = new Date(createdAt);

    const purchase = await prisma.purchase.create({ data });
    res.status(201).json(purchase);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Sales
app.get('/api/sales', async (req, res) => {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(sales);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/sales', async (req, res) => {
  const { stock, quantity, purchasePrice, sellingPrice, createdAt } = req.body;
  try {
    const profit = new Decimal(sellingPrice).minus(new Decimal(purchasePrice)).times(new Decimal(quantity));
    const data = {
      stock,
      quantity: parseInt(quantity),
      purchasePrice: new Decimal(purchasePrice),
      sellingPrice: new Decimal(sellingPrice),
      profit,
    };
    if (createdAt) data.createdAt = new Date(createdAt);

    const sale = await prisma.sale.create({ data });
    res.status(201).json(sale);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// server.js – add this route
app.post('/api/admin/register-stocks', async (req, res) => {
  try {
    const { scrapeStocksList } = require('./utils/scrapeStocksList');
    const stocks = await scrapeStocksList();
    let inserted = 0, updated = 0;

    for (const stock of stocks) {
      const result = await prisma.stock.upsert({
        where: { symbol: stock.symbol },
        update: { name: stock.name },
        create: { symbol: stock.symbol, name: stock.name, isActive: true },
      });
      if (result.createdAt === result.updatedAt) inserted++;
      else updated++;
    }
    res.json({ success: true, inserted, updated, total: stocks.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
