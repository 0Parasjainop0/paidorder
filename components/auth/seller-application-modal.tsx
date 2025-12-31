"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import { mockDb } from "@/lib/mock-db"
import { Loader2, Rocket, CheckCircle } from "lucide-react"

interface SellerApplicationModalProps {
    isOpen: boolean
    onClose: () => void
}

export function SellerApplicationModal({ isOpen, onClose }: SellerApplicationModalProps) {
    const { user, profile } = useAuth()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        businessName: "",
        category: "",
        bio: "",
    })

    // If already a creator, show different content (optional logic, but handled before opening usually)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        if (user && profile) {
            mockDb.createApplication({
                userId: user.id,
                fullName: profile.full_name || "Unknown User",
                email: user.email!,
                businessName: formData.businessName,
                category: formData.category,
                bio: formData.bio,
            })
            setSuccess(true)
        }

        setLoading(false)
    }

    const handleClose = () => {
        setSuccess(false)
        setFormData({ businessName: "", category: "", bio: "" })
        onClose()
    }

    if (success) {
        return (
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <div className="flex flex-col items-center text-center p-6 bg-green-50 dark:bg-green-950/20 rounded-xl">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
                        <p className="text-muted-foreground mb-6">
                            Your application to become a seller has been sent to our team. We'll review it shortly.
                            You will gain access to the dashboard once approved.
                        </p>
                        <Button onClick={handleClose} className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl">
                            Got it
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Rocket className="w-6 h-6 text-ambient-600" />
                        Become a Seller
                    </DialogTitle>
                    <DialogDescription>
                        Join thousands of creators earning on Digiteria. Tell us about what you plan to sell.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="businessName">Business / Brand Name</Label>
                        <Input
                            id="businessName"
                            placeholder="e.g. DesignMaster Studio"
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                            required
                            className="rounded-xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Primary Category</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                            required
                        >
                            <SelectTrigger className="rounded-xl">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ui-kits">UI Kits & Design</SelectItem>
                                <SelectItem value="templates">Templates (Web/App)</SelectItem>
                                <SelectItem value="scripts">Scripts & Plugins</SelectItem>
                                <SelectItem value="courses">Courses & Tutorials</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">About You & Your Products</Label>
                        <Textarea
                            id="bio"
                            placeholder="Tell us what you build and who it's for..."
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            required
                            className="rounded-xl min-h-[100px]"
                        />
                    </div>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
                        <Button
                            type="submit"
                            className="w-full sm:w-auto bg-gradient-to-r from-ambient-500 to-ambient-600 text-white rounded-xl"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Application"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
