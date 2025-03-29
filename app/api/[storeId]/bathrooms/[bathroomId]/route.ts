import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ bathroomId: string }> }
) {
  try {
    const { bathroomId } = await params;
    if (!bathroomId) {
      return new NextResponse("Bathroom id is required", { status: 400 });
    }

    const bathroom = await prismadb.bathroom.findUnique({
      where: {
        id: bathroomId,
      },
    });

    return NextResponse.json(bathroom);
  } catch (err) {
    console.log("[BATHROOM_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; bathroomId: string }> }
) {
  try {

    const { userId } = await auth();
    const { storeId, bathroomId } = await params;
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value URL is required", { status: 400 });
    }

    if (!bathroomId) {
      return new NextResponse("Bathroom id is required", { status: 400 });
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

    const bathroom = await prismadb.bathroom.updateMany({
      where: {
        id: bathroomId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(bathroom);
  } catch (err) {
    console.log("[BATHROOM_PATCH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ storeId: string; bathroomId: string }> }
) {
  try {
    const { userId } = await auth();
    const { storeId, bathroomId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!bathroomId) {
      return new NextResponse("Bathroom id is required", { status: 400 });
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

    const bathroom = await prismadb.bathroom.deleteMany({
      where: {
        id: bathroomId,
      },
    });

    return NextResponse.json(bathroom);
  } catch (err) {
    console.log("[BATHROOM_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
