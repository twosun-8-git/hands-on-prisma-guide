import { Prisma } from "@prisma/client";

import { p } from "../../lib/prisma";

const products: Prisma.ProductCreateInput[] = [
  { name: "エチオピア ブレンド", price: 1800, stock: 50 },
  { name: "コロンビア マイルド", price: 1600, stock: 80 },
  { name: "ブラジル サントス", price: 1400, stock: 100 },
  { name: "グアテマラ リッチ", price: 1900, stock: 30 },
  { name: "ケニア フルーティー", price: 2000, stock: 40 },
  { name: "ジャマイカ プレミアム", price: 3500, stock: 5 },
  { name: "ハワイ スムース", price: 2800, stock: 25 },
  { name: "ペルー オーガニック", price: 700, stock: 60 },
];

async function main() {
  try {
    const seedProducts = await p.product.createMany({
      data: products,
      skipDuplicates: true,
    });
    console.log(`✅ ${seedProducts.count}件の商品を作成しました`);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
