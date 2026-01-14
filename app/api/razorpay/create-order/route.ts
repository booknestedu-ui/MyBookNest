import Razorpay from "razorpay"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { amount } = await req.json()

    if (!amount || typeof amount !== "number") {
      return NextResponse.json(
        { error: "Amount missing or invalid" },
        { status: 400 }
      )
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
      console.error("ENV missing", { keyId, keySecret })
      return NextResponse.json(
        { error: "Razorpay keys missing" },
        { status: 500 }
      )
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })

    const order = await razorpay.orders.create({
      amount, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    })

    return NextResponse.json(order)
  } catch (err: any) {
    console.error("CREATE ORDER ERROR:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
