
import { NextResponse } from "next/server"
import { checkAuth } from "@/lib/checkAuth"
import { createAccount } from "@/lib/createAccount"

export async function POST(request: Request) {

  const taskID = request.headers.get("X-TASK-ID")
  const password = request.headers.get("X-PASSWORD")

  if (!taskID) {
    return NextResponse.json({ error: 'Task id is required' }, { status: 400 });
  }

  try {
    const data = await checkAuth(taskID, password)
    return NextResponse.json({
      success: true,
      created: false,
      data
    }, { status: 200 });
  } catch (error) {

    const e = error as Error || { message: 'Unknown error' }

    if(e.message === "Task ID not found") {

      try {
        const data = await createAccount(taskID, password)
        return NextResponse.json({
          success: true,
          created: true,
          data
        }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: e.message }, { status: 400 });
      }

    } else {

      return NextResponse.json({ error: e.message }, { status: 400 });
    }

  }

}
