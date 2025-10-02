import { Prisma } from "@prisma/client";

import { p } from "../../lib/prisma";

async function main() {
  // 作成するユーザーデータ
  const user: Prisma.UserCreateInput = {
    email: "wakita@ex.com",
    name: "涌田　浩一",
    sex: "male",
    age: 48,
    password: "password", // passwordカラムがある場合は設定
  };

  // createで単一レコードを作成
  try {
    const result = await p.user.create({
      data: user,
    });

    console.log(`✅ ユーザーを作成しました`);
    console.log(result);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
