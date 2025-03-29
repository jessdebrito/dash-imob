"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BathroomColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BathroomClientProps {
  data: BathroomColumn[];
}

export const BathroomClient: React.FC<BathroomClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Quantidade de banheiros (${data?.length})`}
          description="Gerencie as quantidades de banheiros pré-definidos."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/bathrooms/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar novo
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="Chaves de API para tamanhos" />
      <Separator />
      <ApiList entityName="bathrooms" entityIdName="bathroomId" />
    </>
  );
};
