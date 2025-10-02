import { Product } from "@prisma/client";

import { p } from "../../lib/prisma";

async function main() {
  const findProduct = {
    price: {
      gte: 2000,
    },
  };

  try {
    const result: Product[] = await p.product.findMany({
      where: {
        ...findProduct,
      },
    });

    console.log(`✅ ${result.length}件の商品を読み取りました`);
    console.log(result);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
