import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Book Club: Classic Literature",
    date: "March 15, 2024",
    location: "Online",
    attendees: 24,
  },
  {
    id: 2,
    title: "Author Meet & Greet",
    date: "March 20, 2024",
    location: "Mumbai Central",
    attendees: 50,
  },
  {
    id: 3,
    title: "Reading Workshop",
    date: "March 25, 2024",
    location: "Bangalore",
    attendees: 30,
  },
]

export function UpcomingEvents() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
            Upcoming Events
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join our community events and connect with fellow readers
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <div className="h-40 sm:h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                  <img
                    src={`/book-event-.jpg?height=200&width=400&query=book event ${event.title}`}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-3 sm:gap-4 p-4 sm:p-6">
                <h3 className="font-serif text-lg sm:text-xl font-bold line-clamp-2">{event.title}</h3>
                <div className="space-y-2 w-full text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline" size="sm">
                  Register Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
