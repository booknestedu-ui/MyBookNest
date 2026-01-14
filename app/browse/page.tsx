"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Search, Filter, MapPin, Star } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Book } from "@/lib/types"

export default function BrowsePage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [priceRange, setPriceRange] = useState([0, 10])
  const [selectedGenre, setSelectedGenre] = useState("all")

  /* ================= FETCH BOOKS FROM FIREBASE ================= */
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, "books"),
          where("isActive", "==", true)
        )

        const snap = await getDocs(q)
        const list = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Book, "id">),
        }))

        setBooks(list)
      } catch (err) {
        console.error("Failed to fetch books", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  /* ================= FILTER + SEARCH + SORT ================= */
  const filteredBooks = useMemo(() => {
    let data = [...books]

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      data = data.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      )
    }

    // Genre
    if (selectedGenre !== "all") {
      data = data.filter(
        (b) => b.category?.toLowerCase() === selectedGenre
      )
    }

    // Price range (per day assumption)
    data = data.filter(
      (b) =>
        b.pricePerMonth / 30 >= priceRange[0] &&
        b.pricePerMonth / 30 <= priceRange[1]
    )

    // Sort
    if (sortBy === "price-low") {
      data.sort((a, b) => a.pricePerMonth - b.pricePerMonth)
    }
    if (sortBy === "price-high") {
      data.sort((a, b) => b.pricePerMonth - a.pricePerMonth)
    }

    return data
  }, [books, searchQuery, selectedGenre, priceRange, sortBy])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HEADER */}
        <section className="bg-muted py-8 md:py-12 border-b">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-serif text-4xl font-bold mb-3">
              Browse Books
            </h1>
            <p className="text-muted-foreground">
              Discover books available for rent near you
            </p>
          </div>
        </section>

        {/* SEARCH & FILTER BAR */}
        <section className="bg-background py-6 border-b sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px] h-11">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Genre</Label>
                    <Select
                      value={selectedGenre}
                      onValueChange={setSelectedGenre}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Genres" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="fiction">Fiction</SelectItem>
                        <SelectItem value="non-fiction">
                          Non-Fiction
                        </SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                        <SelectItem value="romance">Romance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>
                      Price per day: ₹{priceRange[0]} – ₹{priceRange[1]}
                    </Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={10}
                      step={0.5}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </section>

        {/* BOOK GRID */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredBooks.length} results
            </p>

            {loading ? (
              <p>Loading books...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <Link key={book.id} href={`/book/${book.id}`}>
                    <Card className="h-140 w-70 hover:shadow-md transition-shadow text-sm">
  <div className="aspect-[2/3] overflow-hidden">
    <img
      src={book.imageUrl}
      alt={book.title}
      className="h-90 w-full object-cover"
    />
  </div>

  <CardHeader className="pb-1">
    <h3 className="font-semibold text-base line-clamp-1">
      {book.title}
    </h3>
    <p className="text-xs text-muted-foreground">
      {book.author}
    </p>
  </CardHeader>

  <CardContent className="space-y-1">
    <Badge variant="secondary" className="text-xs">
      {book.category}
    </Badge>
  </CardContent>

  <CardFooter>
    <div className="flex justify-between w-full">
      <div>
        <p className="text-lg font-bold text-primary">
          ₹{(book.pricePerMonth / 30).toFixed(1)}
        </p>
        <p className="text-[10px] text-muted-foreground">
          per day
        </p>
      </div>
    <Link href={`/book/${book.id}`}>
  <Button size="sm" className="h-8 px-3">
    Rent
  </Button>
</Link>

    </div>
  </CardFooter>
</Card>

                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
