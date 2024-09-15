import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/checkAuth"

export async function DELETE(request: Request) {

  const body = await request.json()

  try {

    if (!body.task_id) {
      throw new Error('Task id is required')
    }
    
    await checkAuth(body.task_id, body.password)

    // Update postgress with new data
     await sql`
      UPDATE tasks
      SET hook_url = NULL,
      monitored_nano_address = NULL,
      known_nano_addresses = NULL
      WHERE task_id = ${body.task_id}
    `;

    return NextResponse.json({
      success: true,
    }, { status: 200 });

  } catch (error) {
    const e = error as Error || { message: 'Unknown error' }
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

}
