import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ adtypeId: string }> }
) {
  try {
    const { adtypeId } = await params;
    if (!adtypeId) {
      return new NextResponse("Ad type id is required", { status: 400 });
    }

    const adtype = await prismadb.adtype.findUnique({
      where: {
        id: adtypeId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(adtype);
  } catch (err) {
    console.log("[ADTYPE_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; adtypeId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { name, billboardId } = body;
    const { storeId, adtypeId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard URL is required", { status: 400 });
    }

    if (!adtypeId) {
      return new NextResponse("Ad type id is required", { status: 400 });
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

    const adtype = await prismadb.adtype.updateMany({
      where: {
        id: adtypeId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(adtype);
  } catch (err) {
    console.log("[ADTYPE_PATCH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ storeId: string; adtypeId: string }> }
) {
  try {
    const { userId } = await auth();
    const { storeId, adtypeId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!adtypeId) {
      return new NextResponse("Ad type id is required", { status: 400 });
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

    const adtype = await prismadb.adtype.deleteMany({
      where: {
        id: adtypeId,
      },
    });

    return NextResponse.json(adtype);
  } catch (err) {
    console.log("[ADTYPE_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
