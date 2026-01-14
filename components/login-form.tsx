"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Mail, Lock, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  /* ================= EMAIL LOGIN ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)

      toast({
        title: "Login successful 🎉",
        description: "Welcome back to BookMyNest!",
      })

      router.replace("/browse")
    } catch (error: any) {
      toast({
        title: "Login failed",
        description:
          error.code === "auth/invalid-credential"
            ? "Invalid email or password"
            : error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = async () => {
    if (loading) return
    setLoading(true)

    try {
      await signInWithPopup(auth, googleProvider)

      toast({
        title: "Login successful 🎉",
        description: "Welcome back to BookMyNest!",
      })

      router.replace("/browse")
    } catch (error: any) {
      toast({
        title: "Google login failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary text-primary-foreground p-3 rounded-lg">
            <BookOpen className="h-8 w-8" />
          </div>
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-serif">
          Welcome Back
        </CardTitle>
        <CardDescription>Login to access your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          Continue with Google
        </Button>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary font-medium">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
