import { Prisma } from "@prisma/client";

import { p } from "../../lib/prisma";

async function main() {
  // 新しい商品データ
  const products: Prisma.ProductCreateInput[] = [
    { name: "ジャパン バランス", price: 8000, stock: 45 },
    { name: "インド ヘビー", price: 5000, stock: 70 },
    { name: "フィリピン ストロング", price: 10200, stock: 90 },
  ];

  // createManyで複数レコードを作成
  try {
    const result = await p.product.createMany({
      data: products,
      skipDuplicates: true,
    });

    console.log(`✅ ${result.count}件の商品を作成しました`);
    console.log(result);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
