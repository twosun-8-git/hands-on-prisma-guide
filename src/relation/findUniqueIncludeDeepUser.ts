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
        orders: {
          // Order を含める（リレーション User ⇔ Order ）
          include: {
            orderItems: true, // orderItems を含める（リレーション Order ⇔ orderItems ）
          },
        },
      },
    });

    console.log(`✅ ユーザーと注文情報など`);
    // console.log はネストが深すぎると省略するため console.dir を使用
    console.dir(result, { depth: null });
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
