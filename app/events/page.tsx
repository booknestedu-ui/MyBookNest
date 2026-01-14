"use client"
import { Calendar, MapPin, Users, Clock, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const events = [
  {
    id: "1",
    title: "Classic Literature Book Club",
    date: "Jan 15, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Central Library, NYC",
    attendees: 24,
    capacity: 30,
    image: "/book-club-meeting.png",
    description: "Join us for a discussion of The Great Gatsby",
    category: "Book Club",
  },
  {
    id: "2",
    title: "Author Meet & Greet: Jane Doe",
    date: "Jan 20, 2024",
    time: "3:00 PM - 5:00 PM",
    location: "BookMyNest HQ, Brooklyn",
    attendees: 45,
    capacity: 50,
    image: "/author-signing-event.jpg",
    description: "Meet bestselling author Jane Doe and get your books signed",
    category: "Author Event",
  },
  {
    id: "3",
    title: "Community Book Swap",
    date: "Jan 25, 2024",
    time: "10:00 AM - 2:00 PM",
    location: "Washington Park, Manhattan",
    attendees: 67,
    capacity: 100,
    image: "/book-event-.jpg",
    description: "Bring your books and swap with other readers",
    category: "Community",
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-muted py-16 md:py-24 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Book Events & Meetups
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Connect with fellow book lovers at our community events, author meetups, and book clubs
              </p>
              <Button size="lg">Create Your Event</Button>
            </div>
          </div>
        </section>

        {/* Events Listing */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="all" className="space-y-8">
              <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:inline-grid">
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="clubs">Book Clubs</TabsTrigger>
                <TabsTrigger value="authors">Author Events</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="aspect-video relative overflow-hidden bg-muted">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 left-3 bg-background/90 backdrop-blur">{event.category}</Badge>
                      </div>
                      <CardHeader>
                        <h3 className="font-semibold text-xl line-clamp-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>
                            {event.attendees}/{event.capacity} attending
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 pt-2">{event.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full group">
                          View Details
                          <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="clubs">
                <p className="text-center text-muted-foreground py-12">Book club events coming soon...</p>
              </TabsContent>

              <TabsContent value="authors">
                <p className="text-center text-muted-foreground py-12">Author events coming soon...</p>
              </TabsContent>

              <TabsContent value="community">
                <p className="text-center text-muted-foreground py-12">Community events coming soon...</p>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
