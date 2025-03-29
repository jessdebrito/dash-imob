"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { RoomColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface RoomClientProps {
  data: RoomColumn[];
}

export const RoomClient: React.FC<RoomClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Quantidade de comodos (${data?.length})`}
          description="Gerencie as quantidades de comodos pré-definidos."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/rooms/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar novo
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="Chaves de API para comodos" />
      <Separator />
      <ApiList entityName="rooms" entityIdName="roomId" />
    </>
  );
};
