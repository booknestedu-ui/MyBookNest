import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { HowItWorks } from "@/components/how-it-works"
import { FeaturedBooks } from "@/components/featured-books"
import { UpcomingEvents } from "@/components/upcoming-events"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <HowItWorks />
      <FeaturedBooks />
      <UpcomingEvents />
      <Testimonials />
      <Footer />
    </div>
  )
}
