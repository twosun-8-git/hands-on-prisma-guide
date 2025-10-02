import { User } from "@prisma/client";

import { p } from "../../lib/prisma";

async function main() {
  // id を指定
  const userId = 1;

  try {
    const result = await p.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        orders: {
          select: {
            totalAmount: true,
            status: true,
            orderItems: {
              select: {
                productId: true,
                price: true,
                quantity: true,
              },
            },
          },
        },
      },
    });

    console.log(`✅ ユーザーと注文情報など`);
    console.dir(result, { depth: null });
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
