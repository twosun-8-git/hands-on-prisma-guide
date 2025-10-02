import { Prisma } from "@prisma/client";

import { p } from "../../lib/prisma";

async function main() {
  // id を指定
  const userId = 15;

  // 更新するデータ
  const newData: Prisma.UserUpdateInput = {
    age: 80,
  };

  const isExist = await p.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isExist) {
    console.log("❌ ユーザーが存在しません");
    return;
  }

  try {
    const result: Prisma.UserUpdateInput = await p.user.update({
      where: {
        id: userId,
      },
      data: {
        ...newData,
      },
    });

    console.log(`✅ ユーザーを更新しました`);
    console.log(result);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
