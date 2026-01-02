"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"
import { Save, User, Lock, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function AccountSettingsPage() {
    const { profile, updateProfile, user } = useAuth()
    const [loading, setLoading] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        full_name: profile?.full_name || "",
        username: profile?.username || "",
        bio: profile?.bio || "",
        company: profile?.company || "",
        location: profile?.location || "",
        website: profile?.website || "",
        github_url: profile?.github_url || "",
        twitter_url: profile?.twitter_url || "",
        linkedin_url: profile?.linkedin_url || "",
    })

    const handleSave = async () => {
        setLoading(true)
        const { error } = await updateProfile(formData)

        if (!error) {
            toast.success("Profile updated successfully")
        }
        setLoading(false)
    }

    if (!profile) return null

    return (
        <div className="min-h-screen py-8 bg-background relative overflow-hidden">
            {/* Ambient Background (Matching Dashboard) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.05),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.03),transparent_50%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link href="/dashboard/profile">
                    <Button
                        variant="ghost"
                        className="mb-6 text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Profile
                    </Button>
                </Link>

                <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

                <div className="grid gap-8">
                    {/* Profile Information */}
                    <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Profile Information
                            </CardTitle>
                            <CardDescription>
                                Update your public profile details.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input
                                        id="full_name"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="Tell us about yourself..."
                                    className="rounded-xl"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                        id="company"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    placeholder="https://yourwebsite.com"
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="github_url">GitHub URL</Label>
                                    <Input
                                        id="github_url"
                                        value={formData.github_url}
                                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                        placeholder="https://github.com/username"
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="twitter_url">Twitter URL</Label>
                                    <Input
                                        id="twitter_url"
                                        value={formData.twitter_url}
                                        onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                                        placeholder="https://twitter.com/username"
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                                    <Input
                                        id="linkedin_url"
                                        value={formData.linkedin_url}
                                        onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                        placeholder="https://linkedin.com/in/username"
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="bg-gradient-to-r from-ambient-500 to-ambient-600 text-white rounded-xl"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Security */}
                    <Card className="border-ambient-200/50 dark:border-ambient-800/30 bg-card/50 backdrop-blur-sm rounded-2xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="w-5 h-5" />
                                Account Security
                            </CardTitle>
                            <CardDescription>
                                Manage your account credentials and security settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-ambient-200/50 dark:border-ambient-800/30 rounded-xl">
                                <div>
                                    <h4 className="font-medium">Email Address</h4>
                                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-xl" disabled>
                                    Managed by Auth
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-ambient-200/50 dark:border-ambient-800/30 rounded-xl">
                                <div>
                                    <h4 className="font-medium">Password</h4>
                                    <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-xl">
                                    Change
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-red-200/50 dark:border-red-800/30 rounded-xl">
                                <div>
                                    <h4 className="font-medium text-red-600">Delete Account</h4>
                                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                                </div>
                                <Button variant="destructive" size="sm" className="rounded-xl">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
