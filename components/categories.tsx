import { BookOpen, Code, Heart, Briefcase, Lightbulb, Palette } from "lucide-react"
import { Card } from "@/components/ui/card"

const categories = [
  { icon: BookOpen, name: "Fiction", color: "bg-blue-500" },
  { icon: Code, name: "Technology", color: "bg-purple-500" },
  { icon: Heart, name: "Romance", color: "bg-pink-500" },
  { icon: Briefcase, name: "Business", color: "bg-green-500" },
  { icon: Lightbulb, name: "Self-Help", color: "bg-yellow-500" },
  { icon: Palette, name: "Arts", color: "bg-orange-500" },
]

export function Categories() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
            Explore by Category
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Find your next read from our curated collection
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Card
                key={category.name}
                className="p-4 sm:p-6 hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-1"
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div
                    className={`${category.color} text-white p-3 sm:p-4 rounded-xl group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-center">{category.name}</span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
