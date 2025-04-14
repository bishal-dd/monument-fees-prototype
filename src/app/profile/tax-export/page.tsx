"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Sample bookings data (in a real app, this would be fetched from an API)
const bookingsData = [
  {
    bookingId: "BHT12345",
    purchaseDate: "2023-04-15",
    visitDate: "2023-04-20",
    totalAmount: 1550,
    status: "Completed",
    monuments: ["Tashichho Dzong", "Memorial Chorten"],
    tickets: [
      {
        monument: "Tashichho Dzong",
        adultQuantity: 2,
        kidQuantity: 1,
        adultPrice: 500,
        kidPrice: 250,
      },
      {
        monument: "Memorial Chorten",
        adultQuantity: 1,
        kidQuantity: 0,
        adultPrice: 300,
        kidPrice: 150,
      },
    ],
  },
  {
    bookingId: "BHT67890",
    purchaseDate: "2023-05-10",
    visitDate: "2023-05-15",
    totalAmount: 1200,
    status: "Completed",
    monuments: ["Paro Taktsang (Tiger's Nest)"],
    tickets: [
      {
        monument: "Paro Taktsang (Tiger's Nest)",
        adultQuantity: 1,
        kidQuantity: 1,
        adultPrice: 1000,
        kidPrice: 500,
      },
    ],
  },
  {
    bookingId: "BHT54321",
    purchaseDate: "2023-06-05",
    visitDate: "2023-06-10",
    totalAmount: 1800,
    status: "Completed",
    monuments: ["Punakha Dzong", "Chimi Lhakhang"],
    tickets: [
      {
        monument: "Punakha Dzong",
        adultQuantity: 2,
        kidQuantity: 2,
        adultPrice: 600,
        kidPrice: 300,
      },
      {
        monument: "Chimi Lhakhang",
        adultQuantity: 2,
        kidQuantity: 0,
        adultPrice: 250,
        kidPrice: 125,
      },
    ],
  },
  {
    bookingId: "BHT98765",
    purchaseDate: "2023-07-20",
    visitDate: "2023-07-25",
    totalAmount: 900,
    status: "Completed",
    monuments: ["Buddha Dordenma", "National Museum of Bhutan"],
    tickets: [
      {
        monument: "Buddha Dordenma",
        adultQuantity: 2,
        kidQuantity: 0,
        adultPrice: 200,
        kidPrice: 100,
      },
      {
        monument: "National Museum of Bhutan",
        adultQuantity: 1,
        kidQuantity: 1,
        adultPrice: 350,
        kidPrice: 175,
      },
    ],
  },
  {
    bookingId: "BHT24680",
    purchaseDate: "2022-08-15",
    visitDate: "2022-08-20",
    totalAmount: 700,
    status: "Completed",
    monuments: ["Rinpung Dzong"],
    tickets: [
      {
        monument: "Rinpung Dzong",
        adultQuantity: 1,
        kidQuantity: 1,
        adultPrice: 500,
        kidPrice: 250,
      },
    ],
  },
  {
    bookingId: "BHT13579",
    purchaseDate: "2022-09-10",
    visitDate: "2022-09-15",
    totalAmount: 1100,
    status: "Completed",
    monuments: ["Kurje Lhakhang", "Jambay Lhakhang"],
    tickets: [
      {
        monument: "Kurje Lhakhang",
        adultQuantity: 2,
        kidQuantity: 0,
        adultPrice: 300,
        kidPrice: 150,
      },
      {
        monument: "Jambay Lhakhang",
        adultQuantity: 1,
        kidQuantity: 1,
        adultPrice: 300,
        kidPrice: 150,
      },
    ],
  },
];

export default function TaxExportPage() {
  // Get available years from bookings data
  const availableYears = [
    ...new Set(
      bookingsData.map((booking) =>
        new Date(booking.purchaseDate).getFullYear()
      )
    ),
  ]
    .sort()
    .reverse();
  const [selectedYear, setSelectedYear] = useState(
    availableYears[0]?.toString() || new Date().getFullYear().toString()
  );
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter bookings by year for tax purposes
  const bookingsByYear = bookingsData.filter((booking) => {
    const bookingYear = new Date(booking.purchaseDate).getFullYear().toString();
    return bookingYear === selectedYear && booking.status !== "Cancelled";
  });

  // Calculate total amount spent in the selected year
  const yearlyTotalAmount = bookingsByYear.reduce(
    (total, booking) => total + booking.totalAmount,
    0
  );

  // Handle export for tax purposes
  const handleExportForTax = () => {
    setIsGenerating(true);

    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);

      // In a real app, this would generate and download a PDF
      alert(`Tax summary for ${selectedYear} has been downloaded.`);
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-200"
          >
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 border-gray-200"
          >
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/profile"
            className="text-red-800 hover:underline flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Profile
          </Link>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-red-800" />
                <div>
                  <CardTitle>Tax Summary Export</CardTitle>
                  <CardDescription>
                    Generate tax reports for your monument ticket purchases
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="tax-year">Select Year</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger id="tax-year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableYears.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleExportForTax}
                  className="bg-red-800 hover:bg-red-700"
                  disabled={bookingsByYear.length === 0 || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Export Tax Summary
                    </>
                  )}
                </Button>
              </div>

              {bookingsByYear.length > 0 ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          Annual Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">
                              Total Bookings:
                            </span>
                            <span className="font-medium">
                              {bookingsByYear.length}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Total Amount:</span>
                            <span className="font-medium">
                              Nu. {yearlyTotalAmount}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Tax Year:</span>
                            <span className="font-medium">{selectedYear}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="mb-3 font-medium">Detailed Transactions</h3>
                    <div className="rounded-md border border-gray-200">
                      <div className="grid grid-cols-12 gap-2 border-b border-gray-200 bg-gray-50 p-3 text-xs font-medium">
                        <div className="col-span-3">Booking ID</div>
                        <div className="col-span-2">Date</div>
                        <div className="col-span-4">Monuments</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-1 text-right">Amount</div>
                      </div>

                      <div className="divide-y divide-gray-100">
                        {bookingsByYear.map((booking) => (
                          <div
                            key={booking.bookingId}
                            className="grid grid-cols-12 gap-2 p-3 text-sm"
                          >
                            <div className="col-span-3 font-medium">
                              {booking.bookingId}
                            </div>
                            <div className="col-span-2">
                              {new Date(
                                booking.purchaseDate
                              ).toLocaleDateString()}
                            </div>
                            <div
                              className="col-span-4 truncate"
                              title={booking.monuments.join(", ")}
                            >
                              {booking.monuments.join(", ")}
                            </div>
                            <div className="col-span-2">
                              {getStatusBadge(booking.status)}
                            </div>
                            <div className="col-span-1 text-right font-medium">
                              Nu. {booking.totalAmount}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-12 gap-2 border-t border-gray-200 bg-gray-50 p-3 text-sm font-medium">
                        <div className="col-span-11 text-right">Total:</div>
                        <div className="col-span-1 text-right">
                          Nu. {yearlyTotalAmount}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md bg-amber-50 p-4 text-sm">
                    <h3 className="font-semibold text-amber-800">
                      Tax Information
                    </h3>
                    <p className="mt-1 text-amber-700">
                      This summary can be used for tax filing purposes. The
                      document includes all eligible monument ticket purchases
                      for the selected year. Please consult with your tax
                      advisor for specific deduction eligibility.
                    </p>
                  </div>
                </>
              ) : (
                <div className="rounded-md border border-gray-200 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Calendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">
                    No bookings found for {selectedYear}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select a different year or make new bookings
                  </p>
                  <Button className="mt-4" variant="outline" asChild>
                    <Link href="/">Book New Tickets</Link>
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t bg-gray-50 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/profile">Back to Profile</Link>
              </Button>
              {bookingsByYear.length > 0 && (
                <Button
                  onClick={handleExportForTax}
                  className="bg-red-800 hover:bg-red-700"
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Export as PDF"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
