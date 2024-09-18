import { reformatResponse, Task } from "@/lib/formatResponse";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const api_key = request.headers.get('x-api-key');

  if (api_key !== process.env.API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {

    const response = await sql<Task>`
      SELECT task_id, hook_url, monitored_nano_address, known_nano_addresses FROM tasks
      WHERE hook_url IS NOT NULL
      AND monitored_nano_address IS NOT NULL
      AND known_nano_addresses IS NOT NULL
      AND (expires_at > NOW() OR expires_at IS NULL)
    `;

    // Example response:
  //   const response = {
  //     rows: [
  //       {
  //           "task_id": "lool",
  //           "hook_url": "https://hooks.zapier.com/hooks/standard/20103097/6d48fd7ab7004ad4a2967efc028c4cc5/",
  //           "monitored_nano_address": "lo",
  //           "known_nano_addresses": [
  //               "blo",
  //               'asdf',
  //               'asdf1'
  //           ]
  //       },
  //       {
  //         "task_id": "sdf1231",
  //         "hook_url": "https://hooks.zapier.com/hooks/standard/20102097/6d48fd7ab7004ad4a2967efc028c4cc5/",
  //         "monitored_nano_address": "400102123",
  //         "known_nano_addresses": [
  //             "blo",
  //             'asdf',
  //             '12309130'
  //         ]
  //     },
  //      {
  //         "task_id": "john324",
  //         "hook_url": "https://hooks.zapier.com/hooks/standard/20102097/6d48fd7ab7004ad4a220167efc028c4cc5/",
  //         "monitored_nano_address": "400102123",
  //         "known_nano_addresses": [
  //             'blkjasdj1219',
  //             '12309130'
  //         ]
  //     }
  //   ]
  // }

  const result = reformatResponse(response.rows);

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    const e = error as Error || { message: 'Unknown error' }
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

}
