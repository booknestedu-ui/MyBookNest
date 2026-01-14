"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/use-auth"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Script from "next/script"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function SubscribePaymentClient() {
  const params = useSearchParams()
  const { user } = useAuth()

  const plan = params.get("plan")!
  const amount = Number(params.get("amount"))
  const name = params.get("name")!
  const phone = params.get("phone")!
  const address = params.get("address")!

  useEffect(() => {
    if (!user) alert("Please login first")
  }, [user])

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded")
      return
    }

    const res = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amount * 100,
      }),
    })

    const order = await res.json()

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: "INR",
      name: "BookMyNest",
      description: `${plan} subscription`,
      order_id: order.id,

      prefill: { name, contact: phone },

      handler: async (response: any) => {
        await setDoc(doc(db, "subscriptions", user!.uid), {
          userId: user!.uid,
          plan,
          status: "active",
          amount,
          address,
          paymentId: response.razorpay_payment_id,
          startedAt: serverTimestamp(),
        })

        await addDoc(collection(db, "subscriptionPayments"), {
          userId: user!.uid,
          plan,
          amount,
          paymentId: response.razorpay_payment_id,
          createdAt: serverTimestamp(),
        })

        alert("Subscription Activated 🎉")
        window.location.href = "/dashboard"
      },

      modal: {
        ondismiss: () => alert("Payment cancelled"),
      },

      theme: { color: "#4f46e5" },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">
                Complete Subscription Payment
              </h2>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4 bg-background text-sm">
                <div className="flex justify-between">
                  <span>Plan</span>
                  <span className="capitalize">{plan}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold">₹{amount}</span>
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={handlePayment}>
                Pay ₹{amount}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
