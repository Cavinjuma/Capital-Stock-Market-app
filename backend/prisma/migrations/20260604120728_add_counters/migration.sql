-- CreateTable
CREATE TABLE "counters" (
    "id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "sector" TEXT,
    "industry" TEXT,
    "marketCap" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "counters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prices" (
    "id" SERIAL NOT NULL,
    "stock" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "opening_price" DECIMAL(65,30) NOT NULL,
    "closing_price" DECIMAL(65,30) NOT NULL,
    "volume" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "stock" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchase_price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "stock" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchase_price" DECIMAL(65,30) NOT NULL,
    "selling_price" DECIMAL(65,30) NOT NULL,
    "profit" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "counters_symbol_key" ON "counters"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "prices_stock_date_key" ON "prices"("stock", "date");
