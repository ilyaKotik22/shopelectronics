-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "year" TEXT NOT NULL,
    "screen_size" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "screen_type" TEXT NOT NULL,
    "refresh_rate" TEXT NOT NULL,
    "camera_mp" TEXT NOT NULL,
    "battery" TEXT NOT NULL,
    "waterproof" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
