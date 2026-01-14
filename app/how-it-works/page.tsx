import Link from "next/link"
import { Search, BookOpen, Handshake, Star, Shield, DollarSign, Users, Heart } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: "Browse & Discover",
      description:
        "Search our extensive collection of books available for rent in your area. Filter by genre, price, and location to find exactly what you're looking for.",
    },
    {
      icon: BookOpen,
      title: "Choose Your Book",
      description:
        "Select the book you want to read, check availability, and review the rental terms. View book condition, photos, and reviews from other readers.",
    },
    {
      icon: Handshake,
      title: "Connect & Rent",
      description:
        "Book your rental period and arrange pickup with the owner. Our secure messaging keeps communication simple and safe.",
    },
    {
      icon: Star,
      title: "Enjoy & Review",
      description:
        "Read and enjoy your book! Return it by the agreed date and leave a review to help the community grow.",
    },
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Secure & Protected",
      description: "All transactions are protected by our guarantee. Book rentals are insured against damage or loss.",
    },
    {
      icon: DollarSign,
      title: "Save Money",
      description: "Rent books for a fraction of the cost of buying. Perfect for students and avid readers.",
    },
    {
      icon: Users,
      title: "Build Community",
      description: "Connect with fellow book lovers in your area. Share recommendations and discover new favorites.",
    },
    {
      icon: Heart,
      title: "Sustainable Reading",
      description: "Reduce waste and environmental impact by sharing books instead of buying new ones.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted py-16 md:py-24 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              How BookMyNest Works
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Sharing books has never been easier. Join thousands of readers saving money and building community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/browse">Start Browsing</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/upload">List Your Books</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Steps */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Four Simple Steps</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start renting and lending books in minutes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <Card key={index} className="relative">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Why Choose BookMyNest?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">More than just a book rental platform</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">Join our community of book lovers today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/signup">Sign Up Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/browse">Explore Books</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
