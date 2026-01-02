"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertTriangle, LogOut } from "lucide-react"

interface ConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
    variant?: "default" | "destructive"
}

export function ConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "default"
}: ConfirmDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md rounded-3xl border-ambient-200/50 dark:border-ambient-800/30 bg-background/95 backdrop-blur-xl shadow-2xl">
                <AlertDialogHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center shadow-lg shadow-amber-500/20">
                        {variant === "destructive" ? (
                            <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                        ) : (
                            <LogOut className="w-8 h-8 text-ambient-600 dark:text-ambient-400" />
                        )}
                    </div>
                    <AlertDialogTitle className="text-2xl font-bold text-center">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-muted-foreground text-base">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-3 mt-6">
                    <AlertDialogCancel className="flex-1 rounded-xl border-2 border-ambient-200 dark:border-ambient-700 hover:bg-ambient-50 dark:hover:bg-ambient-900/50 transition-all duration-300">
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className={`flex-1 rounded-xl font-semibold shadow-lg transition-all duration-300 ${variant === "destructive"
                                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/25"
                                : "bg-gradient-to-r from-ambient-500 to-ambient-600 hover:from-ambient-600 hover:to-ambient-700 text-white shadow-ambient-500/25"
                            }`}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
