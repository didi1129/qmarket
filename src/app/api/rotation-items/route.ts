import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { dateFormat } = await req.json();

  if (!dateFormat) {
    return NextResponse.json(
      { message: "dateFormat is required" },
      { status: 400 }
    );
  }

  revalidateTag(`rotation-${dateFormat}`);

  return NextResponse.json({
    revalidated: true,
    tag: `rotation-${dateFormat}`,
  });
}
