import { Prisma } from "@prisma/client";

import { p } from "../../lib/prisma";

async function main() {
  /** 下記の商品レコードが存在する前提で条件作成
    { name: "ジャパン バランス", price: 8000, stock: 45 }, // 削除される
    { name: "インド ヘビー", price: 5000, stock: 70 }, // 削除される
    { name: "フィリピン ストロング", price: 10200, stock: 90 }, // 削除されない
  */

  const deleteProduct: Prisma.ProductWhereInput = {
    price: {
      gte: 5000,
    },
    stock: {
      lt: 90,
    },
  };

  try {
    const result: Prisma.BatchPayload = await p.product.deleteMany({
      where: {
        ...deleteProduct,
      },
    });

    console.log(`✅ ${result.count}件の商品を削除しました`);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
