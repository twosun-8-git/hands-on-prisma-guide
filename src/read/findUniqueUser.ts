import { User } from "@prisma/client";

import { p } from "../../lib/prisma";

async function main() {
  // id を指定
  const userId = 1;

  try {
    const result: User | null = await p.user.findUnique({
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
