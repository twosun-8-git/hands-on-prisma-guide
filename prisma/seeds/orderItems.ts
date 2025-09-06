import { Prisma } from "@prisma/client";

import { p } from "../../lib/prisma";

const orderItems: Prisma.OrderItemCreateManyInput[] = [
  {
    orderId: 1,
    productId: 1,
    quantity: 3,
    price: 1800,
  },
  {
    orderId: 2,
    productId: 4,
    quantity: 1,
    price: 1900,
  },
  {
    orderId: 2,
    productId: 3,
    quantity: 1,
    price: 1400,
  },
  {
    orderId: 3,
    productId: 7,
    quantity: 1,
    price: 2800,
  },
  {
    orderId: 4,
    productId: 6,
    quantity: 2,
    price: 3500,
  },
  {
    orderId: 5,
    productId: 2,
    quantity: 1,
    price: 1600,
  },
  {
    orderId: 5,
    productId: 5,
    quantity: 1,
    price: 2000,
  },
  {
    orderId: 5,
    productId: 8,
    quantity: 1,
    price: 700,
  },
  {
    orderId: 6,
    productId: 6,
    quantity: 1,
    price: 3500,
  },
  {
    orderId: 7,
    productId: 3,
    quantity: 1,
    price: 1400,
  },
  {
    orderId: 8,
    productId: 1,
    quantity: 3,
    price: 1800,
  },
  {
    orderId: 8,
    productId: 4,
    quantity: 1,
    price: 1900,
  },
  {
    orderId: 8,
    productId: 8,
    quantity: 3,
    price: 700,
  },
];

async function main() {
  try {
    const seedOrderItems = await p.orderItem.createMany({
      data: orderItems,
      skipDuplicates: true,
    });
    console.log(`✅ ${seedOrderItems.count}件の注文明細を作成しました`);
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
  } finally {
    await p.$disconnect();
  }
}

main();
