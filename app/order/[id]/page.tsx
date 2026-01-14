"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"

import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/use-auth"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

import type { Book } from "@/lib/types"

export default function OrderConfirmPage() {
  const { id } = useParams()
  const params = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()

  const days = Number(params.get("days"))
  const discount = Number(params.get("discount"))
  const couponId = params.get("couponId") || null

  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [location, setLocation] = useState<string | null>(null)

  /* ================= FETCH BOOK ================= */
  useEffect(() => {
    const fetchBook = async () => {
      const snap = await getDoc(doc(db, "books", id as string))
      if (snap.exists()) {
        setBook({ id: snap.id, ...(snap.data() as any) })
      }
      setLoading(false)
    }
    fetchBook()
  }, [id])

  /* ================= LOCATION ================= */
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation(`${pos.coords.latitude}, ${pos.coords.longitude}`),
      () => alert("Location permission denied")
    )
  }

  if (loading || !book) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>
  }

  const pricePerDay = book.pricePerMonth / 30
  const subtotal = pricePerDay * days
  const total = Math.max(subtotal - discount, 0)

  /* ================= CONFIRM ================= */
  const confirmOrder = async () => {
    if (!user) return alert("Login required")
    if (!name || !phone || !address)
      return alert("Fill all details")

    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      bookId: book.id,
      bookTitle: book.title,
      days,
      subtotal,
      discount,
      total,
      couponId,
      deliveryAddress: address,
      userDetails: { name, phone, location },
      status: "confirmed",
      createdAt: serverTimestamp(),
    })

    alert("Order Confirmed 🎉")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-5xl mx-auto px-4 space-y-8">

          {/* 🔥 BOOK HERO */}
          <Card>
            <CardContent className="flex flex-col md:flex-row gap-6 p-6">
              <img
                src={book.imageUrl}
                className="h-64 w-48 object-cover rounded-lg shadow-md mx-auto md:mx-0"
              />

              <div className="flex-1 space-y-2">
                <h1 className="text-2xl font-bold">{book.title}</h1>
                <p className="text-muted-foreground">by {book.author}</p>

                <Badge className="w-fit">{book.category}</Badge>

                <p className="mt-4 text-lg font-semibold">
                  ₹{pricePerDay.toFixed(1)} / day × {days} days
                </p>

                <p className="text-xl font-bold text-primary">
                  Total: ₹{total.toFixed(2)}
                </p>

                <Badge variant="secondary">Subscription Active</Badge>
              </div>
            </CardContent>
          </Card>

          {/* 🔥 GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* ADDRESS */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">
                  Delivery Address
                </h2>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                  <Label>Mobile Number</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div>
                  <Label>Full Address</Label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <Button variant="outline" onClick={getLocation}>
                  Use Current Location
                </Button>

                {location && (
                  <p className="text-xs text-muted-foreground">
                    Location saved: {location}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* SUMMARY */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">
                  Order Summary
                </h2>
              </CardHeader>

              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between font-semibold text-base border-t pt-3">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full mt-4"
                  onClick={confirmOrder}
                >
                  Confirm Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
