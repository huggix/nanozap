import { NextResponse } from "next/server"

export async function POST(request: Request) {

  const taskID = request.headers.get("X-TASK-ID")
  const password = request.headers.get("X-PASSWORD")

  console.log({taskID, password})

  return NextResponse.json({
    success: true,
    data: {
      what: "bamalam"
    }
  }, {
    status: 200
  })

}
