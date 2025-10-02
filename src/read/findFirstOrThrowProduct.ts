import { Product } from "@prisma/client";

import { p } from "../../lib/prisma";

async function main() {
  const findProduct = {
    price: {
      gte: 9999, // 存在しない金額を指定
    },
  };

  try {
    const result: Product | null = await p.product.findFirstOrThrow({
      where: {
        ...findProduct,
      },
    });

    console.log(`✅ ${result ? 1 : 0}件の商品を読み取りました`);
    console.log(result);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
