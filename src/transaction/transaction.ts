import { p } from "../../lib/prisma";

async function main() {
  const deleteUser = p.user.delete({
    where: {
      id: 15, // 存在するユーザーID
    },
  });

  const deleteProduct = p.product.delete({
    where: {
      id: 12, // 存在する商品ID
    },
  });

  const transaction = async () => {
    try {
      // トランザクション処理を配列で指定する
      const result = await p.$transaction([deleteUser, deleteProduct]);
      console.log(`✅ トランザクションの結果`);
      console.log(result);
    } catch (error) {
      console.error("❌ エラーが発生しました:", error);
    } finally {
      await p.$disconnect();
    }
  };

  await transaction();
}

main();
