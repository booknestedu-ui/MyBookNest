"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { doc, getDoc, updateDoc, increment, addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Book } from "@/lib/types"
import Script from "next/script"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PaymentPage() {
  const { id } = useParams()
  const params = useSearchParams()

  const days = Number(params.get("days"))
  const discount = Number(params.get("discount"))
  const couponId = params.get("couponId")

  const [book, setBook] = useState<Book | null>(null)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    const fetchBook = async () => {
      const snap = await getDoc(doc(db, "books", id as string))
      if (snap.exists()) {
        setBook({ id: snap.id, ...(snap.data() as any) })
      }
    }
    fetchBook()
  }, [id])

  if (!book) return <div>Loading...</div>

  const pricePerDay = book.pricePerMonth / 30
  const subtotal = pricePerDay * days
  const total = Math.max(subtotal - discount, 0)

  /* ================= RAZORPAY ================= */
  const handlePayment = async () => {
  if (!name || !phone || !address) {
    alert("Fill all details")
    return
  }

  if (!window.Razorpay) {
    alert("Razorpay SDK not loaded")
    return
  }

  const res = await fetch("/api/razorpay/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: Math.round(total * 100),
    }),
  })

  const order = await res.json()

  if (!order?.id) {
    alert("Failed to create order")
    return
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    amount: order.amount,
    currency: "INR",
    name: "BookMyNest",
    description: book.title,
    order_id: order.id,

    prefill: {
      name,
      contact: phone,
    },

    handler: async (response: any) => {
      // ✅ SAVE ORDER
      await addDoc(collection(db, "orders"), {
        bookId: book.id,
        days,
        total,
        user: { name, phone, address },
        couponId: couponId || null,
        paymentId: response.razorpay_payment_id,
        status: "paid",
        createdAt: serverTimestamp(),
      })

      if (couponId) {
        await updateDoc(doc(db, "coupons", couponId), {
          usedCount: increment(1),
        })
      }

      alert("Payment Successful 🎉")
    },

    modal: {
      ondismiss: () => {
        alert("Payment cancelled")
      },
    },

    theme: { color: "#4f46e5" },
  }

  const rzp = new window.Razorpay(options)
  rzp.open()
}


  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Payment Details</h2>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* USER */}
              <div className="grid gap-3">
                <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              {/* SUMMARY */}
              <div className="border rounded-lg p-4 space-y-2 bg-background text-sm">
                <div className="flex justify-between">
                  <span>Book</span>
                  <span>{book.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Days</span>
                  <span>{days}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={handlePayment}>
                Pay ₹{total.toFixed(2)}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
