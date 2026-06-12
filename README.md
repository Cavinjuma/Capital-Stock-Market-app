
# 📈 Capital Stock Market web App

A sleek, high-performance financial dashboard web application built to monitor, record, and analyze stock purchases and sales. Designed with a modern, dark-themed UI to provide traders and investors with clear clarity at a glance on their profits, losses, and holding metrics.

<img width="1500" height="788" alt="image" src="https://github.com/user-attachments/assets/b94d18d4-5b18-43ea-9036-e7e528c618ee" />

## Live hosting: https://capital-stock-market-app.vercel.app/ 
## ✨ Features

*   **📊 Dynamic Sales & Purchases Logs:** Keep real-time tracking of individual stock quantities, purchase values, selling values, and exact execution dates.
*   **💡 Live Profit & Loss Tracking:** Instantly highlights financial outcomes with intuitive green (Profit) and red (Loss) indicators.
*   **🔍 Collapsible Table Views:** Optimizes workspace layout by displaying the top 4 records by default, featuring a seamless "Read More / Read Less" toggle state for extensive logs.
*   **📱 Fully Responsive:** Clean data tables designed with overflow safety (`overflow-x-auto`) ensuring smooth navigation on mobile, tablet, and desktop viewports.

## 🛠️ Tech Stack

*   **Frontend:** React (JSX), JavaScript (ES6+)
*   **Backend:** Node.js, express.js API, axios
*   **Database:** PostgreSQL
*   **Styling:** Tailwind CSS (Custom color palette, dark mode optimizations)
*   **State Management:** React Hooks (`useState`)

## 🚀 Getting Started & Installation

Follow these quick steps to get a copy of the project up and running locally.

### Prerequisites

Ensure you have **Node.js** (v16.x or higher) and **npm** installed on your system.

### 1. Clone the Repository
```bash
git clone [https://github.com/Cavinjuma/capital-stock-app.git](https://github.com/Cavinjuma/capital-stock-app.git)
cd capital-stock-app

```
### 2. Install Project Dependencies

Run the following command in your terminal to install React, Tailwind CSS, and other configuration packages:

```bash
npm install

```
### 3. Configure Tailwind CSS (If setting up fresh)

Ensure your `tailwind.config.js` file includes your source paths and any custom hex codes utilized in the dashboard UI:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0b0f19',
        cardBg: '#1a1f2e',
        borderColor: '#1f2937',
      },
    },
  },
  plugins: [],
}

```

### 4. Run the Development Server

Launch the application locally:

```bash
npm start

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to view the running dashboard.

---

## 📂 Project Structure

```text
public/
src/
 ├── charts/          # Analytics data visualization components
 ├── components/      # Reusable UI blocks
 │    ├── PurchasesTable.jsx   # Collapsible transactions tracker
 │    ├── SalesTable.jsx       # Real-time sales summary log
 │    ├── Navbar.jsx           # Global application navigation
 │    ├── Sidebar.jsx          # Contextual controls layout
 │    └── StatCard.jsx         # Metric visualization components
 ├── context/         # Application level state providers
 ├── data/            # Mock financial datasets for testing
 ├── layouts/         # Layout wrapper templates
 ├── pages/           # High-level route views
 ├── services/        # API request handlers
 └── App.js           # Core root application entry

```

---

## 💡 Core Feature Implementation Detail

The collapsible table state relies on a pure React array slicing strategy instead of complex DOM selector overrides:

```jsx
// Renders top 4 items when collapsed, or expands to reveal all records dynamically
{purchases
  .slice(0, isExpanded ? purchases.length : 4)
  .map((purchase, index) => (
    <tr key={index} className="border-b border-[#1f2937]">
      <td className="p-3 font-bold text-white">{purchase.stock}</td>
      <td className="p-3">{purchase.quantity}</td>
      <td className="p-3">Ksh {purchase.purchasePrice}</td>
      <td className="p-3">Ksh {(purchase.quantity * purchase.purchasePrice).toFixed(2)}</td>
      <td className="p-3">{new Date(purchase.createdAt).toLocaleDateString()}</td>
    </tr>
  ))
}


## 📄 License

This project is licensed under the MIT License - see the [LICENSE]() file for details.
