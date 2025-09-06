import { Prisma } from "@prisma/client";

import { p } from "../../lib/prisma";

const orders: Prisma.OrderCreateManyInput[] = [
  {
    userId: 1,
    totalAmount: 5400,
    status: "delivered",
  },
  {
    userId: 2,
    totalAmount: 3300,
    status: "shipped",
  },
  {
    userId: 3,
    totalAmount: 2800,
    status: "processing",
  },
  {
    userId: 4,
    totalAmount: 7000,
    status: "pending",
  },
  {
    userId: 5,
    totalAmount: 4300,
    status: "delivered",
  },
  {
    userId: 6,
    totalAmount: 3500,
    status: "cancelled",
  },
  {
    userId: 1,
    totalAmount: 1400,
    status: "delivered",
  },
  {
    userId: 2,
    totalAmount: 9300,
    status: "processing",
  },
];

async function main() {
  try {
    const seedOrders = await p.order.createMany({
      data: orders,
      skipDuplicates: true,
    });
    console.log(`✅ ${seedOrders.count}件の注文を作成しました`);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
