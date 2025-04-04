import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  let totalRevenue = 0;
  
  for (const order of paidOrders) {
    for (const item of order.orderItems) {
      totalRevenue += Number(item.product.price);
    }
  }

  return totalRevenue;
};