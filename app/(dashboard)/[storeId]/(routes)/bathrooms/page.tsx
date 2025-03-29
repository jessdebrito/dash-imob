import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import prismadb from "@/lib/prismadb";

import { BathroomClient } from "./components/client";
import { BathroomColumn } from "./components/columns";

const BathroomsPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const bathrooms = await prismadb.bathroom.findMany({
    where: {
      storeId: storeId,
    },
    
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBathrooms: BathroomColumn[] = bathrooms.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    }),
  }));

  return (
    <div className="flex-col min-h-10/12">
      <div className="flex-1 p-8 pt-6 space-y-4 min-h-full">
        <BathroomClient data={formattedBathrooms} />
      </div>
    </div>
  );
};

export default BathroomsPage;
