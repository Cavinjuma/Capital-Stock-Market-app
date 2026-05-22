-- Database Schema for Capital Stock App

-- Create database if it doesn't exist 
-- CREATE DATABASE capital_stock;


-- Counters table
CREATE TABLE IF NOT EXISTS counters (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  symbol VARCHAR(10) NOT NULL UNIQUE,
  sector VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prices table
CREATE TABLE IF NOT EXISTS prices (
  id SERIAL PRIMARY KEY,
  stock VARCHAR(10) NOT NULL,
  date DATE NOT NULL,
  opening_price DECIMAL(10,2) NOT NULL,
  closing_price DECIMAL(10,2) NOT NULL,
  volume INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(stock, date)
);

-- Purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id SERIAL PRIMARY KEY,
  stock VARCHAR(10) NOT NULL,
  quantity INTEGER NOT NULL,
  purchase_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales table
CREATE TABLE IF NOT EXISTS sales (
  id SERIAL PRIMARY KEY,
  stock VARCHAR(10) NOT NULL,
  quantity INTEGER NOT NULL,
  purchase_price DECIMAL(10,2) NOT NULL,
  selling_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_prices_stock_date ON prices(stock, date);
CREATE INDEX IF NOT EXISTS idx_purchases_stock ON purchases(stock);
CREATE INDEX IF NOT EXISTS idx_sales_stock ON sales(stock);