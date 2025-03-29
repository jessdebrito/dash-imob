import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const {
      name,
      location,
      description,
      price,
      parking,
      petFriendly = false,
      addSpace = false,
      builtYear,
      renovationYear,
      heating = false,
      airConditioning = false,
      fireplace = false,
      ventilation = false,
      intercom = false,
      cableTv = false,
      elevator = false,
      internet = false,
      categoryId,
      colorId,
      sizeId,
      roomId,
      bathroomId,
      adtypeId,
      images,
      isFeatured = false,
      isArchived = false,
    } = body;

    const { storeId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (
      !name ||
      !location ||
      !description ||
      !price ||
      !categoryId ||
      !colorId ||
      !sizeId ||
      !roomId ||
      !bathroomId ||
      !adtypeId ||
      !storeId
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        location,
        description,
        price,
        parking,
        petFriendly,
        addSpace,
        builtYear,
        renovationYear,
        heating,
        airConditioning,
        fireplace,
        ventilation,
        intercom,
        cableTv,
        elevator,
        internet,
        categoryId,
        colorId,
        sizeId,
        roomId,
        bathroomId,
        adtypeId,
        storeId,
        isFeatured,
        isArchived,
        images: {
          createMany: {
            data: images.map((image: { url: string }) => ({ url: image.url })),
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.log(`[PRODUCTS_POST] ${err}`);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const roomId = searchParams.get("roomId") || undefined;
    const bathroomId = searchParams.get("bathroomId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: storeId,
        categoryId,
        colorId,
        sizeId,
        roomId,
        bathroomId,
        isFeatured: false,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
        room: true,
        bathroom: true,
        adtype: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (err) {
    console.log(`[PRODUCTS_GET] ${err}`);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}
