import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

export default async function ProductPage({
  params,
}: {
  params: { productId: string; storeId: string };
}) {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const adtypes = await prismadb.adtype.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const rooms = await prismadb.room.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const bathrooms = await prismadb.bathroom.findMany({
    where: {
      storeId: params.storeId,
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
