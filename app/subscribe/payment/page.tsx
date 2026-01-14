import { Suspense } from "react"
import SubscribePaymentClient from "./subscribe-payment-client"

export default function SubscribePaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading payment...</div>}>
      <SubscribePaymentClient />
    </Suspense>
  )
}
