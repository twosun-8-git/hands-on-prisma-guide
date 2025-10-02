import { p } from "../../lib/prisma";

async function main() {
  // Orderモデルにある userId を指定
  const userId = 1;

  try {
    const result = await p.user.findUnique({
      where: {
        id: userId,
      },
      // リレーション
      include: {
        orders: true, // Order を含める（リレーション User ⇔ Order ）
      },
    });

    console.log(`✅ ユーザーと注文情報`);
    console.log(result);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
