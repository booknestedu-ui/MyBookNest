import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: "₹49/week",
    rating: 4.8,
    available: true,
  },
  {
    id: 2,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: "₹59/week",
    rating: 4.9,
    available: true,
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: "₹69/week",
    rating: 4.7,
    available: false,
  },
  {
    id: 4,
    title: "Deep Work",
    author: "Cal Newport",
    price: "₹45/week",
    rating: 4.6,
    available: true,
  },
]

export function FeaturedBooks() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
            Featured Books
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Popular picks from our collection
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-xl transition-all group">
              <CardContent className="p-0">
                <div className="relative h-64 sm:h-72 bg-muted">
                  <img
                    src={`/.jpg?height=300&width=200&query=${book.title} book cover`}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!book.available && (
                    <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">Rented</Badge>
                  )}
                  {book.available && (
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">Available</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-3 p-4 sm:p-6">
                <div className="w-full">
                  <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">{book.author}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-lg sm:text-xl font-bold text-primary">{book.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs sm:text-sm font-medium">{book.rating}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full" disabled={!book.available} size="sm">
                  {book.available ? "Rent Now" : "Currently Rented"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button size="lg" variant="outline">
            View All Books
          </Button>
        </div>
      </div>
    </section>
  )
}
