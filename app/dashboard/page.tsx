"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MessageSquare, MapPin, Phone, User } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/use-auth"

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()

  const [orders, setOrders] = useState<any[]>([])
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      // 🔹 subscription
      const subSnap = await getDoc(doc(db, "subscriptions", user.uid))
      if (subSnap.exists()) setSubscription(subSnap.data())

      // 🔹 orders
      const ordersQ = query(
        collection(db, "orders"),
        where("userId", "==", user.uid)
      )
      const ordersSnap = await getDocs(ordersQ)

      const ordersWithBooks = await Promise.all(
        ordersSnap.docs.map(async (o) => {
          const data = o.data()
          const bookSnap = await getDoc(doc(db, "books", data.bookId))
          return {
            id: o.id,
            ...data,
            book: bookSnap.exists() ? bookSnap.data() : null,
          }
        })
      )

      setOrders(ordersWithBooks)
      setLoading(false)
    }

    fetchData()
  }, [user])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please login first
      </div>
    )
  }

  const hasActivePlan = subscription?.status === "active"

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-muted/30">
        {/* HEADER */}
        <section className="bg-background border-b py-6">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">My Dashboard</h1>
              <p className="text-muted-foreground">
                {hasActivePlan
                  ? `Active Plan: ${subscription.plan}`
                  : "No active subscription"}
              </p>
            </div>

            {!hasActivePlan && (
              <Button asChild>
                <Link href="/subscribe">Subscribe Today</Link>
              </Button>
            )}
          </div>
        </section>

        {/* ORDERS */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6">
              My Rentals
            </h2>

            {orders.length === 0 && (
              <p className="text-muted-foreground">
                You haven’t rented any books yet.
              </p>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-6 space-y-4">

                    {/* BOOK INFO */}
                    <div className="flex gap-4">
                      <img
                        src={order.book?.imageUrl}
                        className="h-32 w-24 object-cover rounded-md border"
                      />

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {order.bookTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {order.book?.author}
                        </p>

                        <div className="flex gap-2 mt-2">
                          <Badge>{order.status}</Badge>
                          <Badge variant="secondary">
                            {order.days} days
                          </Badge>
                        </div>

                        <p className="mt-2 font-semibold">
                          ₹{order.total}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* USER DETAILS */}
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {order.userDetails?.name}
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {order.userDetails?.phone}
                      </div>

                      {order.userDetails?.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {order.userDetails.location}
                        </div>
                      )}
                    </div>

                    <Button variant="outline" className="w-full mt-2">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
