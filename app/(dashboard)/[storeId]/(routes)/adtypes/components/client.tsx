"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { AdtypeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface AdtypeClientProps {
  data: AdtypeColumn[];
}

export const AdtypeClient: React.FC<AdtypeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Tipos de anúncios (${data?.length})`}
          description="Gerencie todas as categorias"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/adtypes/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar novo
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="Chaves de API para tipos de anúncios" />
      <Separator />
      <ApiList entityName="adtypes" entityIdName="adtypeId" />
    </>
  );
};
