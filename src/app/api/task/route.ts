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

    return NextResponse.json([{
      monitored_nano_address: data.monitored_nano_address || "nano_1w9mxfsd8e7mrksw3pa148n9kpzuafyz4j1ebx848mfxh3wirbsqa7rqf4ci",
      known_nano_addresses: data.known_nano_addresses || ["nano_jdks9r8fncga7s63hdksid8n9kpzuafyz4j1ebx848mfxh3irbsqa7r0920a", "nano_8dks93jhd8e7m2ksw7pa148n9pzuafyz4j1ebx848mfxh3wirbsldox0laka"] ,
    }], { status: 200 });

  } catch (error) {
    const e = error as Error || { message: 'Unknown error' }
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

}
