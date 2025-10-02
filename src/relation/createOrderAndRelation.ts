import { p } from "../../lib/prisma";

async function main() {
  try {
    const result = await p.order.create({
      data: {
        userId: 1, // 存在するユーザー
        totalAmount: 1900,
        status: "delivered",
        // 関連する orderItems を同時に作成
        orderItems: {
          create: [
            {
              productId: 4,
              quantity: 1,
              price: 1900,
            },
          ],
        },
      },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    console.log(`✅ 注文情報と注文明細を作成しました`);
    console.log(result);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
