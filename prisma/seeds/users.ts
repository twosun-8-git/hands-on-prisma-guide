import { Prisma } from "@prisma/client";

import { p } from "../../lib/prisma";

const users: Prisma.UserCreateInput[] = [
  {
    name: "山田　太郎",
    email: "yamada@ex.com",
    sex: "male",
    age: 18,
  },
  {
    name: "鈴木　花子",
    email: "suzuki@ex.com",
    sex: "female",
    age: 20,
  },
  {
    name: "岩井　次郎",
    email: "iwai@ex.com",
    sex: "male",
    age: 24,
  },
  {
    name: "小林　幸子",
    email: "kobayashi@ex.com",
    sex: "female",
    age: 28,
  },
  {
    name: "内田　大輔",
    email: "uchida@ex.com",
    sex: "male",
    age: 31,
  },
  {
    name: "佐藤　綾香",
    email: "satou@ex.com",
    sex: "female",
    age: 44,
  },
];

async function main() {
  try {
    const seedUsers = await p.user.createMany({
      data: users,
      skipDuplicates: true,
    });
    console.log(`✅ ${seedUsers.count}件のユーザーを作成しました`);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
