// app/api/check-nano-balance.ts


export async function POST(request: Request) {

  const taskID = request.headers.get("X-TASK-ID")
  const password = request.headers.get("X-PASSWORD")

  console.log({taskID, password})


  return new Response("OK", {status: 200})


  // let session: GetSessionResponse
  // try {

  //   if(apiKey) {
  //     session = await getAPISession(apiKey)
  //   } else {
  //     session = await getSession()
  //   }

  //   if(!session.data || !session.data.sessionUUID || !session.data.id) {
  //     return new NextResponse("Invalid session", {status: 401})
  //   }

  // } catch (e) {
  //   console.log(e)
  //   console.log("Unable to get session")
  //   return new NextResponse("Unable to get session", {status: 401})
  // }

  // if(!session.data?.nanoDepositAddress) {
  //   console.log("No nano deposit address")
  //   return new NextResponse("No nano deposit address", {status: 500})
  // }

  // try {
    
  //   const result = await postRPCServers({
  //     action: 'account_balance',
  //     account: session.data.nanoDepositAddress
  //   });

  //   if (result) {

  //     const accountBalance = parseFloat(nanoCurrency.convert("" + result.balance, {
  //       from: nanoCurrency.Unit.raw,
  //       to: nanoCurrency.Unit.Nano
  //     }))

  //     const accountReceivable = parseFloat(nanoCurrency.convert("" + result.receivable, {
  //       from: nanoCurrency.Unit.raw,
  //       to: nanoCurrency.Unit.Nano
  //     }))
      
  //     const response = NextResponse.json({ 
  //       nanoDepositAddress: session.data.nanoDepositAddress,
  //       nanoReturnAddress: session.data.nanoReturnAddress,
  //       balance: accountBalance,
  //       receivable: accountReceivable,
  //       earned: session.data.earned
  //     }, {status: 200})

  //     if(session.cookies) {
  //       response.cookies.set(session.cookies)
  //     }
      
  //     return response

  //   } else {
  //     return new Response("Failed to fetch account balance", { status: 404});
  //   }

  // } catch (error: any) {

  //   console.log(error)
  //   console.error('Error:', error?.response?.data);
  //   return new Response("Internal Server Error", { status: 500});
  // }
}
