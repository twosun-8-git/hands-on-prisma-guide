import { User } from "@prisma/client";

import { p } from "../../lib/prisma";

async function main() {
  // 存在しない id を指定
  const userId = 99;

  try {
    const result: User = await p.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    console.log(`✅ ユーザー情報`);
    console.log(result);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
