import prismadb from "@/lib/prismadb";
import { AdtypeForm } from "./components/adtype-form";

const AdtypePage = async ({
  params,
}: {
  params: Promise<{ adtypeId: string; storeId: string }>;
}) => {
  const { adtypeId, storeId } = await params;
  const adtype = await prismadb.adtype.findUnique({
    where: {
      id: adtypeId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <AdtypeForm billboards={billboards} initialData={adtype} />
      </div>
    </div>
  );
};

export default AdtypePage;
