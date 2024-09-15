import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/checkAuth"

export async function GET(request: Request) {
    
  const {searchParams} = new URL(request.url);
  const task_id = searchParams.get("task_id");
  const password = searchParams.get("password");

  try {

    if (!task_id) {
      throw new Error('Task id is required')
    }
    
    const data = await checkAuth(task_id, password)

    return NextResponse.json({
      success: true,
      data: [data]
    }, { status: 200 });

  } catch (error) {
    const e = error as Error || { message: 'Unknown error' }
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

}
