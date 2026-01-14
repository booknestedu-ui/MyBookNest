"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"

type PlanKey = "monthly" | "halfyearly" | "yearly"

export default function SubscribePage() {
  const router = useRouter()

  const [selectedPlan, setSelectedPlan] = useState<PlanKey | null>(null)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const plans = {
    monthly: {
      label: "Monthly",
      price: 199,
      duration: "1 Month",
    },
    halfyearly: {
      label: "6 Months",
      price: 999,
      duration: "6 Months",
      highlight: true,
    },
    yearly: {
      label: "1 Year",
      price: 1799,
      duration: "12 Months",
    },
  }

  const handleContinue = () => {
    if (!selectedPlan) return alert("Please select a plan")
    if (!name || !phone || !address)
      return alert("Please fill all details")

    const plan = plans[selectedPlan]

    router.push(
      `/subscribe/payment?plan=${selectedPlan}&amount=${plan.price}&name=${name}&phone=${phone}&address=${address}`
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-muted/30 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">
            Choose Your Subscription
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            Flexible plans that fit your reading habit.
          </p>

          {/* PLANS */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {Object.entries(plans).map(([key, plan]) => (
              <Card
                key={key}
                className={`cursor-pointer transition ${
                  selectedPlan === key
                    ? "border-primary ring-2 ring-primary"
                    : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedPlan(key as PlanKey)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plan.label}
                    {plan.highlight && (
                      <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                        Best Value
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-3xl font-bold">₹{plan.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {plan.duration}
                  </p>

                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> Rent books anytime
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> Home delivery
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> Cancel anytime
                    </li>
                  </ul>

                  <Button
                    variant={selectedPlan === key ? "default" : "outline"}
                    className="w-full mt-4"
                  >
                    {selectedPlan === key ? "Selected" : "Choose Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FORM (OPENS AFTER PLAN SELECT) */}
          {selectedPlan && (
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Enter Your Details</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Address</Label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                {/* SUMMARY */}
                <div className="border rounded-lg p-4 bg-background">
                  <div className="flex justify-between">
                    <span>Selected Plan</span>
                    <span className="font-medium">
                      {plans[selectedPlan].label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount</span>
                    <span className="font-semibold">
                      ₹{plans[selectedPlan].price}
                    </span>
                  </div>
                </div>

                <Button size="lg" className="w-full" onClick={handleContinue}>
                  Proceed to Pay ₹{plans[selectedPlan].price}
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="text-center mt-10">
            <a
              href="/browse"
              className="text-sm text-muted-foreground hover:underline"
            >
              Continue without subscription
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
