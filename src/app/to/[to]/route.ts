import { NextRequest, NextResponse } from "next/server";
import { redirects } from "@/lib/redirects"

type Context = {
  params: Promise<{to: string}>;
}

export async function GET(req: NextRequest, { params }: Context) {
  const { to } = await params

  const r = redirects.find(item => item.from === to)

  if (r) {
    return NextResponse.redirect(r.to, 307);
  }

  return NextResponse.json(
    {
    "error": "404 redirect not found"
    }, 
    { status: 404}
  )
}