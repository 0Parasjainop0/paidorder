"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./use-auth"

export interface CartProduct {
    id: string
    title: string
    price: number
    thumbnail_url: string | null
    creator: string
    creator_id: string
}

export interface CartItemWithProduct {
    id: string
    product: CartProduct
    quantity: number
}

interface CartContextType {
    items: CartItemWithProduct[]
    itemCount: number
    subtotal: number
    addToCart: (product: CartProduct) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    isInCart: (productId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    const [items, setItems] = useState<CartItemWithProduct[]>([])

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("digitera_cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart:", e)
            }
        }
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("digitera_cart", JSON.stringify(items))
    }, [items])

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    const addToCart = (product: CartProduct) => {
        setItems((prev) => {
            const existingItem = prev.find((item) => item.product.id === product.id)
            if (existingItem) {
                return prev.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    product,
                    quantity: 1,
                },
            ]
        })
    }

    const removeFromCart = (productId: string) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId)
            return
        }
        setItems((prev) =>
            prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const isInCart = (productId: string) => {
        return items.some((item) => item.product.id === productId)
    }

    return (
        <CartContext.Provider
            value={{
                items,
                itemCount,
                subtotal,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                isInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
