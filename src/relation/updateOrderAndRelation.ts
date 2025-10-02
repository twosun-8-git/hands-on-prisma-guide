import { p } from "../../lib/prisma";

async function main() {
  try {
    const result = await p.order.update({
      where: {
        id: 12, // 更新対象の注文ID
      },
      data: {
        status: "pending", // ステータスを更新
        totalAmount: 5700, // 注文数が変更されたので合計金額を更新
        orderItems: {
          // 関連する orderItems を同時に更新
          update: {
            where: { id: 29 }, // 更新対象の注文明細ID
            data: {
              quantity: 3, // 1 → 3に数量を変更
            },
          },
        },
      },
      include: {
        orderItems: true,
      },
    });

    console.log(`✅ 注文情報と注文明細を更新しました`);
    console.log(result);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
