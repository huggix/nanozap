import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/checkAuth"

export async function GET(request: Request) {

  const body = await request.json()

  try {

    if (!body.task_id) {
      throw new Error('Task id is required')
    }
    
    const data = await checkAuth(body.task_id, body.password)

    return NextResponse.json({
      success: true,
      data: [data]
    }, { status: 200 });

  } catch (error) {
    const e = error as Error || { message: 'Unknown error' }
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

}
