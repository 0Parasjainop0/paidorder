"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Printer } from "lucide-react"

export interface InvoiceItem {
    description: string
    quantity: number
    unitPrice: number
    amount: number
}

export interface InvoiceData {
    orderNumber: string
    dateIssued: string
    dateDue: string
    billTo: string
    items: InvoiceItem[]
    subtotal: number
    total: number
    amountDue: number
}

interface InvoicePageProps {
    invoiceData?: InvoiceData
    onNavigate: (page: string) => void
}

export function InvoicePage({ invoiceData, onNavigate }: InvoicePageProps) {
    if (!invoiceData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Invoice Not Found</h1>
                    <Button onClick={() => onNavigate("landing")}>Return Home</Button>
                </div>
            </div>
        )
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 py-12 print:py-0 print:bg-white">
            {/* Non-printable controls */}
            <div className="max-w-4xl mx-auto px-8 mb-8 flex justify-between print:hidden">
                <Button variant="outline" onClick={() => onNavigate("landing")}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Button>
                <Button onClick={handlePrint} className="bg-black text-white hover:bg-zinc-800">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Invoice
                </Button>
            </div>

            {/* Invoice Content */}
            <div className="max-w-4xl mx-auto bg-white p-12 shadow-sm print:shadow-none print:p-0">
                {/* Header */}
                <div className="flex justify-between items-start mb-16">
                    <h1 className="text-4xl font-bold tracking-tight">Invoice</h1>
                    <div className="text-right">
                        <h2 className="text-2xl font-bold text-zinc-400">SparkWorke</h2>
                    </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-12 mb-16">
                    <div>
                        <div className="grid grid-cols-[120px_1fr] gap-y-1 text-sm">
                            <span className="font-semibold text-zinc-900">Invoice number</span>
                            <span className="text-zinc-600">{invoiceData.orderNumber}</span>

                            <span className="font-semibold text-zinc-900">Date of issue</span>
                            <span className="text-zinc-600">{invoiceData.dateIssued}</span>

                            <span className="font-semibold text-zinc-900">Date due</span>
                            <span className="text-zinc-600">{invoiceData.dateDue}</span>
                        </div>
                    </div>
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-2 gap-12 mb-16">
                    <div>
                        <h3 className="font-bold text-zinc-900 mb-2">SparkWorke</h3>
                        <p className="text-zinc-600">United States</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-900 mb-2">Bill to</h3>
                        <p className="text-zinc-600">{invoiceData.billTo || "Guest Customer"}</p>
                    </div>
                </div>

                {/* Amount Due Big Display */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold">
                        ₹{invoiceData.amountDue.toFixed(2)} due {invoiceData.dateDue}
                    </h2>
                </div>

                {/* Table */}
                <div className="mb-12">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-zinc-900">
                                <th className="text-left font-medium text-zinc-500 py-2 pb-4">Description</th>
                                <th className="text-right font-medium text-zinc-500 py-2 pb-4">Qty</th>
                                <th className="text-right font-medium text-zinc-500 py-2 pb-4">Unit price</th>
                                <th className="text-right font-medium text-zinc-500 py-2 pb-4">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200">
                            {invoiceData.items.map((item, i) => (
                                <tr key={i}>
                                    <td className="py-4 text-zinc-900">{item.description}</td>
                                    <td className="py-4 text-right text-zinc-600">{item.quantity}</td>
                                    <td className="py-4 text-right text-zinc-600">₹{item.unitPrice.toFixed(2)}</td>
                                    <td className="py-4 text-right text-zinc-900">₹{item.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end">
                    <div className="w-64 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-600">Subtotal</span>
                            <span className="text-zinc-900">₹{invoiceData.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-600">Total</span>
                            <span className="text-zinc-900">₹{invoiceData.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold border-t border-zinc-200 pt-3">
                            <span>Amount due</span>
                            <span>₹{invoiceData.amountDue.toFixed(2)} INR</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
