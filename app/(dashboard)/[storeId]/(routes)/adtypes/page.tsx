import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import prismadb from "@/lib/prismadb";
import { Adtype } from "@prisma/client";

import { AdtypeClient } from "./components/client";
import { AdtypeColumn } from "./components/columns";

interface AdtypeWithBillboard extends Adtype {
  billboard: {
    label: string;
  };
}

const AdtypesPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const adtypes: AdtypeWithBillboard[] = await prismadb.adtype.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedAdtypes: AdtypeColumn[] = adtypes.map((item: AdtypeWithBillboard) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    }),
  }));

  return (
    <div className="flex-col min-h-10/12">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <AdtypeClient data={formattedAdtypes} />
      </div>
    </div>
  );
};

export default AdtypesPage;
