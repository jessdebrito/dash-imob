import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";

export default async function ColorPage({
  params,
}: {
  params: Promise<{ colorId: string; storeId: string }>;
}) {
  const { colorId } = await params;
  
  const color = await prismadb.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}
