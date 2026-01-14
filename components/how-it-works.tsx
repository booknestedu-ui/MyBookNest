import { Search, CreditCard, BookMarked } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Browse & Select",
    description: "Search our vast collection and find the perfect book for you",
  },
  {
    icon: CreditCard,
    title: "Choose Duration",
    description: "Pick your rental period - weekly, bi-weekly, or monthly",
  },
  {
    icon: BookMarked,
    title: "Read & Return",
    description: "Enjoy your book and return it when done. It's that simple!",
  },
]

export function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
            How BookMyNest Works
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Start your reading journey in three simple steps
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary text-primary-foreground p-4 sm:p-5 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 bg-secondary text-secondary-foreground w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-md">
                    {index + 1}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground text-pretty">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
