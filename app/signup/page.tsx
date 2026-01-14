import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4">
        <SignupForm />
      </main>
      <Footer />
    </div>
  )
}
