// backend/scripts/registerStocks.js
const { PrismaClient } = require('@prisma/client');
const { scrapeStocksList } = require('../utils/scrapeStocksList');
const { default: Counters } = require('../../capital-stock-app/src/pages/Counters');

const prisma = new PrismaClient();

// Optional: Prefill sector based on symbol or static mapping
const symbolToSector = {
  'SCOM': 'Telecommunications',
  'EQTY': 'Banking',
  'KCB': 'Banking',
  'COOP': 'Banking',
  'ABSA': 'Banking',
  'BRIT': 'Insurance',
  'BAT': 'Manufacturing',
  'BAMB': 'Manufacturing',
  'NSE': 'Financial Services',
  // Add more as needed
};

async function registerStocks() {
  console.log('📡 Scraping stock list from afx.kwayisi.org...');
  const stocks = await scrapeStocksList();
  console.log(`✅ Found ${counters.length} stocks.`);

  let inserted = 0, updated = 0;
  for (const stock of stocks) {
    const prefilledSector = symbolToSector[counter.symbol] || null;

    const result = await prisma.counter.upsert({
      where: { symbol: counter.symbol },
      update: {
        name: counter.name,
        sector: prefilledSector,   // update sector if mapping exists
        updatedAt: new Date(),
      },
      create: {
        symbol: counter.symbol,
        name: counter.name,
        sector: prefilledSector,
        isActive: true,
      },
    });
    if (result.createdAt === result.updatedAt) inserted++;
    else updated++;
  }

  console.log(`🎉 Registration complete: ${inserted} inserted, ${updated} updated.`);
}

registerStocks()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());