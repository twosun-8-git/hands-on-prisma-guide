import { Prisma, User } from "@prisma/client";

import { p } from "../../lib/prisma";

async function main() {
  const userId: Prisma.UserWhereUniqueInput = { id: 12 };

  const isExist = await p.user.findUnique({
    where: userId,
  });

  if (!isExist) {
    console.log("❌ ユーザーが存在しません");
    return;
  }

  try {
    const result: User = await p.user.delete({
      where: userId,
    });
    console.log(`✅ ユーザーを削除しました`);
    console.log(result);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
