import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/checkAuth"
import { checkAddress } from "nanocurrency";

const checkParams = (body: {
  hook_url: string,
  monitored_nano_address: string,
  known_nano_addresses: string[],
  task_id: string
}) => {

  const {
    hook_url,
    monitored_nano_address,
    known_nano_addresses,
    task_id
  } = body

  if (!hook_url) {
    return { error: 'Hook URL is required' };
  }
  if (!monitored_nano_address) {
    return { error: 'Monitored Nano Address is required' };
  }
  if (!known_nano_addresses) {
    return { error: 'Known Nano Addresses is required' };
  }
  if (!task_id) {
    return { error: 'Task id is required' };
  }

  if (!checkAddress(monitored_nano_address)) {
    return { error: 'Monitored Nano Address is invalid' };
  }

  if (known_nano_addresses.length > 0) {
    for (let i = 0; i < known_nano_addresses.length; i++) {
      if (!checkAddress(known_nano_addresses[i])) {
        return { error: 'Known Nano Address is invalid' };
      }
    }
  }

  return null
}

export async function POST(request: Request) {

  const body = await request.json()

  if(checkParams(body) !== null) {
    return NextResponse.json(checkParams(body), { status: 400 });
  }

  const {
    hook_url,
    monitored_nano_address,
    known_nano_addresses,
    task_id,
    password
  } = body

  console.log({
    hook_url,
    monitored_nano_address,
    known_nano_addresses,
    task_id,
    password
  })

  try {
    
    await checkAuth(task_id, password)

    // Update postgress with new data
     await sql`
      UPDATE tasks
      SET hook_url = ${hook_url},
      monitored_nano_address = ${monitored_nano_address},
      known_nano_addresses = ${known_nano_addresses}
      WHERE task_id = ${task_id}
    `;

    return NextResponse.json({
      success: true,
    }, { status: 200 });

  } catch (error) {
    const e = error as Error || { message: 'Unknown error' }
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

}
