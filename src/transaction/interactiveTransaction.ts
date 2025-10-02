import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { p } from "../../lib/prisma";

// インタラクティブトランザクションの処理ブロック
export async function interactiveTransaction() {
  const result = await p.$transaction(async (tx) => {
    // 新規ユーザー作成 or 既存ユーザー取得
    const createtUser = async () => {
      try {
        const user = await tx.user.create({
          data: {
            email: "tamura@ex.com",
            name: "田村　一",
            sex: "male",
            age: 33,
            password: "password", // passwordカラムがある場合は設定
          },
        });
        console.log("✅ 新規ユーザーを作成しました:", user.name);
        // 新規のユーザー情報を返却
        return { user, isExist: false };
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          console.log("❌ ユーザーはすでに存在します:", error.message);

          const existUser = await tx.user.findUnique({
            where: {
              email: "tamura@ex.com",
            },
          });

          // nullチェック
          if (!existUser) {
            throw new Error("既存ユーザーの取得に失敗しました");
          }

          // 既存のユーザー情報を返却
          return { user: existUser, isExist: true };
        } else {
          throw error;
        }
      }
    };

    // 注文情報を作成
    const createOrder = async (userId: number) => {
      try {
        const order = await tx.order.create({
          data: {
            userId: userId,
            totalAmount: 700,
            status: "delivered",
            orderItems: {
              create: [
                {
                  productId: 8,
                  quantity: 1,
                  price: 700,
                },
              ],
            },
          },
          include: {
            user: true,
            orderItems: {
              include: {
                product: true,
              },
            },
          },
        });

        console.log("✅ 注文を作成しました。注文ID:", order.id);
        return order;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          console.error("❌ 注文作成でエラーが発生しました:", e.message);

          // エラーコードに応じた詳細なエラーハンドリング
          switch (e.code) {
            case "P2002":
              throw new Error("注文データが重複しています");
            case "P2003":
              throw new Error("関連するユーザーまたは商品が存在しません");
            case "P2025":
              throw new Error("指定された商品が見つかりません");
            default:
              throw new Error(`注文作成に失敗しました: ${e.message}`);
          }
        } else {
          console.error("❌ 予期しないエラーが発生しました:", e);
          throw e;
        }
      }
    };

    // 1. ユーザーを作成または取得
    const { user, isExist } = await createtUser();

    // 既存ユーザーの場合は注文を作成せずに早期リターン
    if (isExist) {
      return {
        user,
        order: null,
        message: "既存ユーザーのため注文は作成されませんでした",
      };
    }

    // 2. 新規ユーザーの場合のみ注文を作成
    const order = await createOrder(user.id);

    return {
      user,
      order,
      message: "新規ユーザーと注文を作成しました",
    };
  });

  return result;
}

async function main() {
  try {
    const result = await interactiveTransaction();

    console.log("\n === 実行結果 ===");
    console.log("メッセージ:", result.message);
    console.log("ユーザー:", result.user);
    if (result.order) {
      console.log("注文:", {
        id: result.order.id,
        totalAmount: result.order.totalAmount,
        status: result.order.status,
      });
    }
  } catch (error) {
    console.error("処理に失敗しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
