import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import prismadb from "@/lib/prismadb";

import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";

const BillboardsPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item: { id: string; label: string; createdAt: Date }) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    }),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
