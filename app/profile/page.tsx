"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Camera, Star, Shield } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const userStats = {
    booksListed: 12,
    successfulRentals: 48,
    rating: 4.8,
    reviews: 23,
    memberSince: "2022",
    responseRate: "98%",
    verified: true,
  }

  const reviews = [
    {
      id: "1",
      reviewer: "Mike Chen",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      date: "2 weeks ago",
      comment: "Great lender! Book was exactly as described and pickup was easy.",
    },
    {
      id: "2",
      reviewer: "Emma Wilson",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      date: "1 month ago",
      comment: "Friendly and professional. Would definitely rent from again!",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Profile Card */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  {/* Avatar */}
                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="h-6 w-6 text-white" />
                      </button>
                    </div>
                    <h2 className="font-serif text-2xl font-bold mt-4">Sarah Johnson</h2>
                    <p className="text-muted-foreground">@sarahjbooks</p>
                    {userStats.verified && (
                      <Badge className="mt-2">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <Separator />

                  {/* Stats */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Member since</span>
                      <span className="font-medium">{userStats.memberSince}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Books listed</span>
                      <span className="font-medium">{userStats.booksListed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rentals</span>
                      <span className="font-medium">{userStats.successfulRentals}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Response rate</span>
                      <span className="font-medium">{userStats.responseRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-medium">{userStats.rating}</span>
                        <span className="text-muted-foreground">({userStats.reviews})</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="about" className="space-y-6">
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="reviews">Reviews ({userStats.reviews})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="about" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Sarah Johnson" disabled={!isEditing} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="sarah.johnson@email.com" disabled={!isEditing} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" disabled={!isEditing} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="New York, NY" disabled={!isEditing} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          defaultValue="Book lover and avid reader. I enjoy sharing my collection with fellow book enthusiasts. Specializing in classic literature and contemporary fiction."
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interests">Favorite Genres</Label>
                        <Input
                          id="interests"
                          defaultValue="Classic Literature, Fantasy, Mystery"
                          disabled={!isEditing}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="reviews" className="space-y-4">
                      {reviews.map((review) => (
                        <Card key={review.id}>
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                              <Avatar>
                                <AvatarImage src={review.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{review.reviewer[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <p className="font-semibold">{review.reviewer}</p>
                                  <p className="text-xs text-muted-foreground whitespace-nowrap">{review.date}</p>
                                </div>
                                <div className="flex items-center gap-1 mb-2">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "fill-primary text-primary" : "text-muted"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
