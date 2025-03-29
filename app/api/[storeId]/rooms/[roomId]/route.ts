import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const { roomId } = await params;
    if (!roomId) {
      return new NextResponse("Room id is required", { status: 400 });
    }

    const room = await prismadb.room.findUnique({
      where: {
        id: roomId,
      },
    });

    return NextResponse.json(room);
  } catch (err) {
    console.log("[ROOM_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; roomId: string }> }
) {
  try {

    const { userId } = await auth();
    const { storeId, roomId } = await params;
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

    if (!roomId) {
      return new NextResponse("Room id is required", { status: 400 });
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

    const room = await prismadb.room.updateMany({
      where: {
        id: roomId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(room);
  } catch (err) {
    console.log("[ROOM_PATCH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ storeId: string; roomId: string }> }
) {
  try {
    const { userId } = await auth();
    const { storeId, roomId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!roomId) {
      return new NextResponse("Room id is required", { status: 400 });
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

    const room = await prismadb.room.deleteMany({
      where: {
        id: roomId,
      },
    });

    return NextResponse.json(room);
  } catch (err) {
    console.log("[ROOM_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
