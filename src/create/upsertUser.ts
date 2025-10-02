import { Prisma } from "@prisma/client";

import { p } from "../../lib/prisma";

async function main() {
  const email = "morita@ex.com";
  const age = 52;
  const createData = {
    email,
    name: "森田 次郎",
    sex: "male",
    age,
    password: "password", // passwordカラムがある場合は設定
  };

  try {
    const result: Prisma.UserCreateInput = await p.user.upsert({
      where: { email: email }, // email（ unique ） で検索
      update: { age: age }, // 存在する場合は年齢を更新
      create: createData, // 存在しない場合は作成
    });

    console.log(`✅ upsert の結果（更新されたレコード）`);
    console.log(result);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
