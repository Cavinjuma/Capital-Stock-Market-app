const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { Decimal } = require('@prisma/client/runtime/library');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

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