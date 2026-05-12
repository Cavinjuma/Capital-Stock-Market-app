# Capital Stock App

A full-stack web application for tracking stock counters, prices, purchases, and sales with React frontend and Node.js/Express backend with PostgreSQL database.

## Project Structure

```
capital-stock-app/     # React frontend
backend/              # Node.js/Express API server
```

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Setup

### 1. Clone and Install Dependencies

```bash
# Install all dependencies
npm run web:install
npm run backend:install
```

### 2. Database Setup

1. Install PostgreSQL and create a database named `capital_stock`
2. Run the database schema:
   ```bash
   psql -U postgres -d capital_stock -f backend/schema.sql
   ```

### 3. Environment Configuration

Update `backend/.env` with your database credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=capital_stock
DB_USER=postgres
DB_PASSWORD=your_password_here
PORT=5000
```

### 4. Start the Application

```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run backend:dev  # Backend on port 5000
npm run web:dev      # Frontend on port 5173
```

## Features

- **Stock Counter Registration**: Register new stock counters with company details
- **Price Tracking**: Record daily stock prices (opening, closing, volume)
- **Purchase Management**: Track stock purchases with quantities and prices
- **Sales Management**: Record stock sales and calculate profit/loss
- **Dashboard**: View all data with charts and statistics

## API Endpoints

The backend provides RESTful API endpoints for all data operations:

- `GET/POST /api/counters` - Stock counter management
- `GET/POST /api/prices` - Daily price tracking
- `GET/POST /api/purchases` - Purchase records
- `GET/POST /api/sales` - Sales records

## Technologies Used

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Recharts (for data visualization)

### Backend
- Node.js
- Express.js
- PostgreSQL
- CORS support

## Development

### Frontend Development
```bash
cd capital-stock-app
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Building for Production
```bash
npm run build  # Builds the frontend
npm run backend:start  # Starts the backend in production mode
```