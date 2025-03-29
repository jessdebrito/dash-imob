import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import prismadb from "@/lib/prismadb";

import { RoomClient } from "./components/client";
import { RoomColumn } from "./components/columns";

const RoomsPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const rooms = await prismadb.room.findMany({
    where: {
      storeId: storeId,
    },
    
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedRooms: RoomColumn[] = rooms.map((item) => ({
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
        <RoomClient data={formattedRooms} />
      </div>
    </div>
  );
};

export default RoomsPage;
