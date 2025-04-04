import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

interface SizePageProps {
  params: Promise<{
    sizeId: string;
    storeId: string;
  }>;
}

const SizePage = async ({ params }: SizePageProps) => {
  const { sizeId } = await params;
  const size = await prismadb.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return (
    <div className="flex-col min-h-10/12">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
