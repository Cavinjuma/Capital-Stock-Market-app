# Capital Stock Backend

Node.js + Express backend service for the Capital Stock application with PostgreSQL database integration.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Database Setup:**
   - Install PostgreSQL if not already installed
   - Create a database named `capital_stock`
   - Run the schema.sql file to create tables:
     ```bash
     psql -U postgres -d capital_stock -f schema.sql
     ```

3. **Environment Variables:**
   - Copy `.env` file and update with your database credentials:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=capital_stock
     DB_USER=postgres
     DB_PASSWORD=your_password_here
     PORT=5000
     ```

4. **Start the server:**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### Counters
- `GET /api/counters` - Get all counters
- `POST /api/counters` - Create a new counter
  ```json
  {
    "companyName": "Apple Inc.",
    "symbol": "AAPL",
    "sector": "Technology"
  }
  ```

### Prices
- `GET /api/prices` - Get all prices
- `POST /api/prices` - Create a new price entry
  ```json
  {
    "stock": "AAPL",
    "date": "2024-01-15",
    "openingPrice": 185.00,
    "closingPrice": 190.00,
    "volume": 1000000
  }
  ```

### Purchases
- `GET /api/purchases` - Get all purchases
- `POST /api/purchases` - Create a new purchase
  ```json
  {
    "stock": "AAPL",
    "quantity": 100,
    "purchasePrice": 185.00
  }
  ```

### Sales
- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create a new sale
  ```json
  {
    "stock": "AAPL",
    "quantity": 50,
    "purchasePrice": 185.00,
    "sellingPrice": 190.00
  }
  ```

## Database Schema

The database consists of four main tables:
- `counters` - Stock counter registrations
- `prices` - Daily stock prices
- `purchases` - Stock purchase records
- `sales` - Stock sale records

See `schema.sql` for the complete database schema.