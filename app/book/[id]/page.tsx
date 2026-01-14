"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Calendar,
  Shield,
  ChevronLeft,
} from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/use-auth"
import type { Book } from "@/lib/types"

export default function BookDetailsPage() {
  const { id } = useParams()
  const { user } = useAuth()

  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<Date>()
  const [subscriptionActive, setSubscriptionActive] = useState(false)

  /* ================= FETCH BOOK ================= */
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const snap = await getDoc(doc(db, "books", id as string))
        if (snap.exists()) {
          setBook({ id: snap.id, ...(snap.data() as any) })
        }
      } catch (err) {
        console.error("Failed to fetch book", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchBook()
  }, [id])

  /* ================= CHECK SUBSCRIPTION ================= */
  useEffect(() => {
    if (!user) return

    const checkSubscription = async () => {
      const subSnap = await getDoc(doc(db, "subscriptions", user.uid))
      if (subSnap.exists() && subSnap.data().status === "active") {
        setSubscriptionActive(true)
      }
    }

    checkSubscription()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading book...
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Book not found
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* BACK */}
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Browse
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              <div className="aspect-[3/2] rounded-lg overflow-hidden bg-muted">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="object-contain w-full h-full"
                />
              </div>

              <Tabs defaultValue="description">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <p className="text-muted-foreground">
                    {book.description || "No description available"}
                  </p>
                </TabsContent>

                <TabsContent value="details" className="mt-6 space-y-3">
                  <div className="flex justify-between">
                    <span>Author</span>
                    <span className="text-muted-foreground">{book.author}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Category</span>
                    <span className="text-muted-foreground">{book.category}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Stock</span>
                    <span className="text-muted-foreground">{book.stock}</span>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <p className="text-muted-foreground text-sm">
                    Reviews coming soon
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <Card>
                  <CardHeader>
                    <h1 className="text-2xl font-bold">{book.title}</h1>
                    <p className="text-muted-foreground">by {book.author}</p>

                    <div className="flex gap-2 mt-3">
                      <Badge>{book.category}</Badge>
                      <Badge variant={book.isActive ? "default" : "outline"}>
                        {book.isActive ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="text-center bg-muted rounded-lg p-4">
                      <p className="text-4xl font-bold text-primary">
                        ₹{(book.pricePerMonth / 30).toFixed(1)}
                      </p>
                      <p className="text-sm text-muted-foreground">per day</p>
                    </div>

                    <div className="space-y-3">
                      <Label>Select Rental Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start bg-transparent"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* CTA LOGIC */}
                    {!user ? (
                      <Link href="/login">
                        <Button className="w-full" size="lg">
                          Login to Rent
                        </Button>
                      </Link>
                    ) : subscriptionActive ? (
                      <Link href={`/order/${book.id}`}>
                        <Button className="w-full" size="lg">
                          Rent This Book
                        </Button>
                      </Link>
                    ) : (
                      <div className="space-y-2">
                        <Button className="w-full" size="lg" disabled>
                          No Active Subscription
                        </Button>
                        <Link href="/subscribe">
                          <Button className="w-full" variant="outline">
                            Subscribe Now
                          </Button>
                        </Link>
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      Protected by BookMyNest Guarantee
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
