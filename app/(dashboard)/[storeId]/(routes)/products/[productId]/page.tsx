import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string; storeId: string }>;
}) {
  const { productId, storeId } = await params;
  
  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
  });
  const adtypes = await prismadb.adtype.findMany({
    where: {
      storeId: storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: storeId,
    },
  });

  const rooms = await prismadb.room.findMany({
    where: {
      storeId: storeId,
    },
  });

  const bathrooms = await prismadb.bathroom.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          rooms={rooms}
          bathrooms={bathrooms}
          adtypes={adtypes}
          initialData={product}
        />
      </div>
    </div>
  );
}
