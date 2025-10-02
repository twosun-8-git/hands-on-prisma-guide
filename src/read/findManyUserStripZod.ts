import { z } from "zod";

import { p } from "../../lib/prisma";

/** [ TypeScript でのレスポンスの型定義 ]
 * TypeScriptの仕様で型に明示されたプロパティを満たしていれば他のプロパティも含まれてしまう。
 */
// type UserResponse = {
// id: number;
// name: string;
// 実際のレスポンスには下記プロパティも含まれてしまう。
// email,
// sex,
// age,
// married,
// password,
// createdAt,
// updatedAt
// };

/** [ Zodを使用したのレスポンスの型定義 ]
 * 明示的に定義されていないプロパティは含まれない。
 */
const UserResponseIdAndName = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
  })
);
type UserResponseIdAndName = z.infer<typeof UserResponseIdAndName>;

async function main() {
  try {
    // zodを使用しない場合
    // const result: UserResponse[] = await p.user.findMany();

    // zodを使用した場合
    const result = UserResponseIdAndName.parse(await p.user.findMany());

    console.log(`✅ ${result.length}件のユーザー情報を読み取りました`);
    console.log(result);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
