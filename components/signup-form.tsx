"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db, googleProvider } from "@/lib/firebase"

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

import { Mail, Lock, User, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SignupForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  /* ================= EMAIL / PASSWORD SIGNUP ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      )

      const user = userCred.user

      // 🔥 Store user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name.trim(),
        email: user.email,
        provider: "password",
        createdAt: serverTimestamp(),
      })

      toast({
        title: "Account created 🎉",
        description: "Welcome to BookMyNest!",
      })

      router.push("/") // or /login or /dashboard
    } catch (error: any) {
      let message = "Signup failed. Please try again."

      if (error.code === "auth/email-already-in-use") {
        message = "Email already exists. Please login."
      } else if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters."
      }

      toast({
        title: "Signup Error",
        description: message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  /* ================= GOOGLE SIGNUP ================= */
  const handleGoogleSignup = async () => {
    if (loading) return
    setLoading(true)

    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      const userRef = doc(db, "users", user.uid)
      const snap = await getDoc(userRef)

      // 🔥 Create user doc only if not exists
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          provider: "google",
          createdAt: serverTimestamp(),
        })
      }

      toast({
        title: "Login successful 🎉",
        description: "Welcome to BookMyNest!",
      })

      router.push("/")
    } catch (error: any) {
      toast({
        title: "Google Signup Failed",
        description: error.message || "Authentication error",
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
          Create Account
        </CardTitle>
        <CardDescription>
          Start your reading journey today
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div className="space-y-2">
            <Label>Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* EMAIL */}
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

          {/* PASSWORD */}
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
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        {/* DIVIDER */}
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

        {/* GOOGLE */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignup}
          disabled={loading}
        >
          Continue with Google
        </Button>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
