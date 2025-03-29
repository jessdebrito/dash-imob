import prismadb from "@/lib/prismadb";
import { BathroomForm } from "./components/bathroom-form";

const BathroomPage = async ({
  params,
}: {
  params: Promise<{ bathroomId: string }>;
}) => {
  const { bathroomId } = await params;
  const bathroom = await prismadb.bathroom.findUnique({
    where: {
      id: bathroomId,
    },
  });

  return (
    <div className="flex-col min-h-10/12">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <BathroomForm initialData={bathroom} />
      </div>
    </div>
  );
};

export default BathroomPage;
