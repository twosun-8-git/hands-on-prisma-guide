import { Prisma } from "@prisma/client";

import { p } from "../../lib/prisma";

async function main() {
  /** 下記のユーザーレコードが存在する前提で条件作成
    { name: "山田　太郎", sex: male, age: 18 }, // 更新されない
    { name: "岩井　次郎", sex: male, age: 24 }, // 更新されない
    { name: "内田　大輔", sex: male, age: 32 }, // 更新される
    { name: "涌田　浩一", sex: male, age: 68 }, // 更新される
    { name: "森田　次郎", sex: male, age: 30 }, // 更新される
  */

  const updateUser: Prisma.UserWhereInput = {
    sex: "male",
    age: {
      gte: 30,
    },
  };

  const updateData: Prisma.UserUpdateManyMutationInput = {
    age: {
      increment: 1,
    },
  };

  try {
    const result: Prisma.BatchPayload = await p.user.updateMany({
      where: {
        ...updateUser,
      },
      data: {
        ...updateData,
      },
    });

    console.log(`✅ ${result.count}件のユーザーを更新しました`);
    console.log(result);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
