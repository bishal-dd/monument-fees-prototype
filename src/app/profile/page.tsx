"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  FileDown,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  FileText,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Sample user data
const userData = {
  id: "user123",
  name: "Tshering Dorji",
  email: "t.dorji@example.com",
  phone: "+975 17123456",
  joinedDate: "2023-01-15",
  profileImage: "/profile-avatar.jpg",
};

// Sample bookings data
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
    status: "Upcoming",
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
    purchaseDate: "2023-08-15",
    visitDate: "2023-08-20",
    totalAmount: 700,
    status: "Cancelled",
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
];

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

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
    // In a real app, this would generate a tax summary PDF or CSV
    alert(
      `Exporting tax summary for year ${selectedYear} with total amount: Nu. ${yearlyTotalAmount}`
    );

    // Here you would generate a PDF with all the tickets for the year
    // For demo purposes, we'll just show an alert
  };

  // Filter bookings based on active tab and search query
  const filteredBookings = bookingsData.filter((booking) => {
    // Filter by tab
    if (activeTab !== "all" && booking.status.toLowerCase() !== activeTab) {
      return false;
    }

    return true;
  });

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
  };

  const handleExportTicket = (bookingId: string) => {
    // In a real app, this would generate and download the PDF
    alert(`Exporting ticket for booking ${bookingId}`);

    // Simulate redirect to receipt page
    router.push(`/receipt?bookingId=${bookingId}`);
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
      case "upcoming":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-200"
          >
            <Calendar className="h-3 w-3 mr-1" />
            Upcoming
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
            <AlertCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-red-800 hover:underline">
            &larr; Back to Home
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Profile Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                {/* <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt={userData.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div> */}
                <CardTitle>{userData.name}</CardTitle>
                <CardDescription>{userData.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span>{userData.phone}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {/* <Button variant="outline" className="w-full">
                  Edit Profile
                </Button> */}
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
            </div>

            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Bookings</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                {filteredBookings.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-gray-100 p-3">
                        <Calendar className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium">
                        No bookings found
                      </h3>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <Card key={booking.bookingId} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="flex-1 p-4 sm:p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">
                                    Booking #{booking.bookingId}
                                  </h3>
                                  {getStatusBadge(booking.status)}
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {booking.monuments.join(", ")}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold">
                                  Nu. {booking.totalAmount}
                                </div>
                                <div className="text-xs text-gray-500">
                                  10/03/2025
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                                Visit Date: 20/04/2025
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4 text-gray-500" />
                                {booking.tickets.reduce(
                                  (total, ticket) =>
                                    total +
                                    ticket.adultQuantity +
                                    ticket.kidQuantity,
                                  0
                                )}{" "}
                                tickets
                              </div>
                            </div>
                          </div>

                          <div className="flex border-t sm:border-l sm:border-t-0 border-gray-100">
                            <Button
                              variant="ghost"
                              className="flex-1 rounded-none text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                              onClick={() => handleViewBooking(booking)}
                            >
                              View Details
                            </Button>
                            <Separator orientation="vertical" />
                            <Button
                              variant="ghost"
                              className="flex-1 rounded-none text-green-600 hover:bg-green-50 hover:text-green-700"
                              onClick={() =>
                                handleExportTicket(booking.bookingId)
                              }
                            >
                              <FileDown className="mr-1 h-4 w-4" />
                              Export
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Booking Details Modal */}
            {selectedBooking && (
              <Card className="mt-6 border-t-4 border-t-red-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Booking Details</CardTitle>
                    <CardDescription>
                      Booking ID: {selectedBooking.bookingId}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedBooking(null)}
                    className="h-8 w-8 p-0"
                  >
                    &times;
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-md border border-gray-200 p-3">
                      <div className="text-sm text-gray-500">Purchase Date</div>
                      <div className="font-medium">
                        {new Date(
                          selectedBooking.purchaseDate
                        ).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="rounded-md border border-gray-200 p-3">
                      <div className="text-sm text-gray-500">Visit Date</div>
                      <div className="font-medium">
                        {new Date(
                          selectedBooking.visitDate
                        ).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="rounded-md border border-gray-200 p-3">
                      <div className="text-sm text-gray-500">Status</div>
                      <div>{getStatusBadge(selectedBooking.status)}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 font-medium">Ticket Details</h3>
                    <div className="rounded-md border border-gray-200">
                      <div className="grid grid-cols-12 gap-2 border-b border-gray-200 bg-gray-50 p-3 text-xs font-medium">
                        <div className="col-span-4">Monument</div>
                        <div className="col-span-3">Type</div>
                        <div className="col-span-2 text-center">Qty</div>
                        <div className="col-span-3 text-right">Price</div>
                      </div>

                      {selectedBooking.tickets.map(
                        (ticket: any, index: number) => (
                          <div key={index}>
                            {ticket.adultQuantity > 0 && (
                              <div className="grid grid-cols-12 gap-2 p-3 text-sm border-b border-gray-100">
                                <div className="col-span-4">
                                  {ticket.monument}
                                </div>
                                <div className="col-span-3 flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  <span>Adult</span>
                                </div>
                                <div className="col-span-2 text-center">
                                  {ticket.adultQuantity}
                                </div>
                                <div className="col-span-3 text-right">
                                  Nu. {ticket.adultPrice} ×{" "}
                                  {ticket.adultQuantity} ={" "}
                                  {ticket.adultPrice * ticket.adultQuantity}
                                </div>
                              </div>
                            )}

                            {ticket.kidQuantity > 0 && (
                              <div className="grid grid-cols-12 gap-2 p-3 text-sm border-b border-gray-100 bg-gray-50">
                                <div className="col-span-4">
                                  {ticket.monument}
                                </div>
                                <div className="col-span-3 flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  <span>Child</span>
                                </div>
                                <div className="col-span-2 text-center">
                                  {ticket.kidQuantity}
                                </div>
                                <div className="col-span-3 text-right">
                                  Nu. {ticket.kidPrice} × {ticket.kidQuantity} ={" "}
                                  {ticket.kidPrice * ticket.kidQuantity}
                                  <span className="text-xs text-green-600 ml-1">
                                    (-50%)
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}

                      <div className="grid grid-cols-12 gap-2 border-t border-gray-200 bg-gray-50 p-3 text-sm font-medium">
                        <div className="col-span-9 text-right">
                          Total Amount:
                        </div>
                        <div className="col-span-3 text-right">
                          Nu. {selectedBooking.totalAmount}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-gray-50 p-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedBooking(null)}
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-red-800 hover:bg-red-700"
                    onClick={() =>
                      handleExportTicket(selectedBooking.bookingId)
                    }
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    Export Ticket
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Tax Export Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Tax Summary
                </CardTitle>
                <CardDescription>
                  Export your ticket purchases for tax purposes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="tax-year">Select Year</Label>
                      <Select
                        value={selectedYear}
                        onValueChange={setSelectedYear}
                      >
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
                      disabled={bookingsByYear.length === 0}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export Tax Summary
                    </Button>
                  </div>

                  {bookingsByYear.length > 0 ? (
                    <div className="rounded-md border border-gray-200">
                      <div className="border-b border-gray-200 bg-gray-50 p-4">
                        <h3 className="font-medium">
                          Summary for {selectedYear}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {bookingsByYear.length}{" "}
                          {bookingsByYear.length === 1 ? "booking" : "bookings"}{" "}
                          found
                        </p>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {bookingsByYear.map((booking) => (
                          <div
                            key={booking.bookingId}
                            className="flex items-center justify-between p-4"
                          >
                            <div>
                              <div className="font-medium">
                                {booking.bookingId}
                              </div>
                              <div className="text-sm text-gray-500">
                                <Calendar className="inline h-3 w-3 mr-1" />
                                20/05/2025
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {booking.monuments.join(", ")}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                Nu. {booking.totalAmount}
                              </div>
                              <div className="text-xs text-gray-500">
                                {booking.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-between items-center">
                        <span className="font-medium">
                          Total Amount for {selectedYear}
                        </span>
                        <span className="text-lg font-bold">
                          Nu. {yearlyTotalAmount}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-md border border-gray-200 p-6 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <Calendar className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium">
                        No bookings found for {selectedYear}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Select a different year or make new bookings
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
