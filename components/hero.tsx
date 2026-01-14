import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 to-background py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-4 sm:mb-6 text-balance">
              Rent Books. Build Knowledge. Save Money.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 text-pretty">
              Access thousands of books at affordable rental prices. Build your knowledge library without breaking the
              bank.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="text-base h-12 sm:h-14 px-6 sm:px-8">
                <Link href="/browse">
                  Start Renting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-base h-12 sm:h-14 px-6 sm:px-8 bg-transparent"
              >
                <Link href="/browse">Browse Collection</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-primary">5000+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Books</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-primary">2000+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Readers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-primary">4.8★</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img src="/cozy-reading-nook-with-books-and-warm-lighting.jpg" alt="Cozy reading space" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
              <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-lg">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-card-foreground">New Arrivals</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">50+ books added this week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
