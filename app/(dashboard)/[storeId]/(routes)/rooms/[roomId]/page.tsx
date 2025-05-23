import prismadb from "@/lib/prismadb";
import { RoomForm } from "./components/room-form";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string; storeId: string }>;
}) {
  const { roomId } = await params;
  
  const room = await prismadb.room.findUnique({
    where: {
      id: roomId,
    },
  });

  return (
    <div className="flex-col min-h-10/12">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <RoomForm initialData={room} />
      </div>
    </div>
  );
}
