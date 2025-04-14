"use client";

import type React from "react";

import { useState } from "react";
import {
  Search,
  User,
  Users,
  Ticket,
  CheckCircle2,
  XCircle,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Define types for our data
interface TicketItem {
  id: string;
  monument: string;
  adultQuantity: number;
  kidQuantity: number;
  adultPrice: number;
  kidPrice: number;
  isUsed: boolean;
  usedDate?: string;
}

interface BookingData {
  bookingId: string;
  customerName: string;
  email: string;
  purchaseDate: string;
  totalAmount: number;
  tickets: TicketItem[];
  status: "Active" | "Partially Used" | "Used" | "Expired";
  securityHash: string;
}

// Sample ticket database (in a real app, this would be fetched from a database)
const sampleTickets: BookingData[] = [
  {
    bookingId: "12345",
    customerName: "Tshering Dorji",
    email: "t.dorji@example.com",
    purchaseDate: "2023-04-15",
    totalAmount: 1550,
    tickets: [
      {
        id: "T1",
        monument: "Tashichho Dzong",
        adultQuantity: 2,
        kidQuantity: 1,
        adultPrice: 500,
        kidPrice: 250,
        isUsed: false,
      },
      {
        id: "T2",
        monument: "Memorial Chorten",
        adultQuantity: 1,
        kidQuantity: 0,
        adultPrice: 300,
        kidPrice: 150,
        isUsed: false,
      },
    ],
    status: "Active",
    securityHash: "A7B9C2D4",
  },
  {
    bookingId: "67890",
    customerName: "Karma Wangchuk",
    email: "k.wangchuk@example.com",
    purchaseDate: "2023-04-16",
    totalAmount: 1200,
    tickets: [
      {
        id: "T3",
        monument: "Paro Taktsang (Tiger's Nest)",
        adultQuantity: 1,
        kidQuantity: 1,
        adultPrice: 1000,
        kidPrice: 500,
        isUsed: false,
      },
    ],
    status: "Active",
    securityHash: "E5F3G1H8",
  },
  {
    bookingId: "54321",
    customerName: "Deki Yangzom",
    email: "d.yangzom@example.com",
    purchaseDate: "2023-04-14",
    totalAmount: 1800,
    tickets: [
      {
        id: "T4",
        monument: "Punakha Dzong",
        adultQuantity: 2,
        kidQuantity: 2,
        adultPrice: 600,
        kidPrice: 300,
        isUsed: true,
        usedDate: "2023-04-18",
      },
      {
        id: "T5",
        monument: "Chimi Lhakhang",
        adultQuantity: 2,
        kidQuantity: 0,
        adultPrice: 250,
        kidPrice: 125,
        isUsed: false,
      },
    ],
    status: "Partially Used",
    securityHash: "F2G7H9J1",
  },
];

export default function StaffPage() {
  const [ticketCode, setTicketCode] = useState("");
  const [ticketDetails, setTicketDetails] = useState<BookingData | null>(null);
  const [notFound, setNotFound] = useState(false);

  const findTicket = (bookingId: string) => {
    // Reset states
    setNotFound(false);

    // Find ticket in our sample database
    const ticket = sampleTickets.find(
      (t) => t.bookingId.toLowerCase() === bookingId.toLowerCase()
    );

    if (ticket) {
      setTicketDetails({ ...ticket });
    } else {
      setNotFound(true);
      setTicketDetails(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketCode) {
      findTicket(ticketCode);
    }
  };

  const markMonumentAsUsed = (ticketId: string) => {
    if (!ticketDetails) return;

    // Confirm with the user if they are sure
    const confirm = window.confirm(
      "Are you sure you want to mark this monument as used?"
    );

    if (!confirm) return;

    // Create a deep copy of the ticket details
    const updatedTicketDetails = { ...ticketDetails };

    // Find and update the specific monument ticket
    const updatedTickets = updatedTicketDetails.tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          isUsed: true,
          usedDate: new Date().toISOString(),
        };
      }
      return ticket;
    });

    updatedTicketDetails.tickets = updatedTickets;

    // Check if all monuments are used
    const allUsed = updatedTickets.every((ticket) => ticket.isUsed);
    const anyUsed = updatedTickets.some((ticket) => ticket.isUsed);

    // Update the overall ticket status
    if (allUsed) {
      updatedTicketDetails.status = "Used";
    } else if (anyUsed) {
      updatedTicketDetails.status = "Partially Used";
    }

    // Update the state
    setTicketDetails(updatedTicketDetails);

    // In a real app, this would make an API call to update the database
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Partially Used":
        return "bg-amber-100 text-amber-800";
      case "Used":
        return "bg-gray-100 text-gray-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-red-800 md:text-4xl">
            Staff Portal
          </h1>
          <p className="mt-2 text-gray-600">
            Verify and manage Bhutan monument tickets
          </p>
        </header>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            {/* Search Panel */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ticket Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="bookingId"
                        className="text-sm font-medium"
                      >
                        Booking ID
                      </label>
                      <Input
                        id="bookingId"
                        value={ticketCode}
                        onChange={(e) => setTicketCode(e.target.value)}
                        placeholder="e.g., BHT12345"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-red-800 hover:bg-red-700"
                      disabled={!ticketCode}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </form>

                  <div className="mt-6 text-sm text-gray-600">
                    <p className="font-medium">Sample Booking IDs:</p>
                    <ul className="mt-1 space-y-1 list-disc list-inside">
                      <li>12345 (Active)</li>
                      <li>67890 (Active)</li>
                      <li>54321 (Partially Used)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div>
              {ticketDetails ? (
                <Card>
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                        <CardTitle className="text-lg">
                          Booking Details
                        </CardTitle>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          ticketDetails.status
                        )}`}
                      >
                        {ticketDetails.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Booking Information
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Booking ID:</span>
                            <span className="text-sm font-medium">
                              {ticketDetails.bookingId}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Purchase Date:</span>
                            <span className="text-sm">
                              {new Date(
                                ticketDetails.purchaseDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Expiry Date:</span>
                            <span className="text-sm">
                              {new Date(
                                ticketDetails.purchaseDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Tour Duration:</span>
                            <span className="text-sm">
                              {new Date(
                                ticketDetails.purchaseDate
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {new Date(
                                ticketDetails.purchaseDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Customer Information
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Name:</span>
                            <span className="text-sm font-medium">
                              {ticketDetails.customerName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Email:</span>
                            <span className="text-sm">
                              {ticketDetails.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Monument Tickets
                    </h3>

                    {ticketDetails.tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className={`mb-4 rounded-md border ${
                          ticket.isUsed
                            ? "border-gray-200 bg-gray-50"
                            : "border-green-200"
                        }`}
                      >
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{ticket.monument}</h4>
                            <div className="flex items-center mt-1">
                              {ticket.isUsed ? (
                                <Badge
                                  variant="outline"
                                  className="bg-gray-100 text-gray-800"
                                >
                                  <CheckCheck className="h-3 w-3 mr-1" />
                                  Used on{" "}
                                  {new Date(
                                    ticket.usedDate || ""
                                  ).toLocaleDateString()}
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="bg-green-100 text-green-800"
                                >
                                  Valid for Entry
                                </Badge>
                              )}
                            </div>
                          </div>

                          {!ticket.isUsed && (
                            <Button
                              size="sm"
                              onClick={() => markMonumentAsUsed(ticket.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Ticket className="h-4 w-4 mr-1" />
                              Mark as Used
                            </Button>
                          )}
                        </div>

                        <div className="p-4">
                          <div className="grid grid-cols-12 gap-2 text-sm">
                            <div className="col-span-4">Type</div>
                            <div className="col-span-2 text-center">Qty</div>
                            <div className="col-span-3 text-right">Price</div>
                            <div className="col-span-3 text-right">Total</div>
                          </div>

                          {ticket.adultQuantity > 0 && (
                            <div className="grid grid-cols-12 gap-2 text-sm mt-2">
                              <div className="col-span-4 flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                <span>Adult</span>
                              </div>
                              <div className="col-span-2 text-center">
                                {ticket.adultQuantity}
                              </div>
                              <div className="col-span-3 text-right">
                                Nu. {ticket.adultPrice}
                              </div>
                              <div className="col-span-3 text-right">
                                Nu. {ticket.adultQuantity * ticket.adultPrice}
                              </div>
                            </div>
                          )}

                          {ticket.kidQuantity > 0 && (
                            <div className="grid grid-cols-12 gap-2 text-sm mt-2">
                              <div className="col-span-4 flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                <span>Child</span>
                              </div>
                              <div className="col-span-2 text-center">
                                {ticket.kidQuantity}
                              </div>
                              <div className="col-span-3 text-right">
                                Nu. {ticket.kidPrice}
                                <span className="text-xs text-green-600 ml-1">
                                  (-50%)
                                </span>
                              </div>
                              <div className="col-span-3 text-right">
                                Nu. {ticket.kidQuantity * ticket.kidPrice}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-12 gap-2 text-sm mt-2 pt-2 border-t border-gray-100">
                            <div className="col-span-9 text-right font-medium">
                              Subtotal:
                            </div>
                            <div className="col-span-3 text-right font-medium">
                              Nu.{" "}
                              {ticket.adultQuantity * ticket.adultPrice +
                                ticket.kidQuantity * ticket.kidPrice}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-4 p-4 rounded-md bg-gray-50 border border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Amount:</span>
                        <span className="font-bold text-lg">
                          Nu. {ticketDetails.totalAmount}
                        </span>
                      </div>
                    </div>

                    {ticketDetails.status === "Used" && (
                      <div className="mt-6 p-4 rounded-md bg-green-50 border border-green-200 text-green-800">
                        <div className="flex items-center">
                          <CheckCheck className="h-5 w-5 mr-2" />
                          <span className="font-medium">
                            All monuments in this booking have been marked as
                            used.
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : notFound ? (
                <Card>
                  <CardHeader className="bg-red-50 border-b border-red-100">
                    <div className="flex items-center">
                      <XCircle className="h-5 w-5 text-red-600 mr-2" />
                      <CardTitle className="text-lg">
                        Booking Not Found
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p>
                      No booking found with ID:{" "}
                      <span className="font-medium">{ticketCode}</span>
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      Please check the booking ID and try again. If the problem
                      persists, the ticket may not exist or may have been
                      deleted.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
                  <div>
                    <Search className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">
                      No booking selected
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Enter a booking ID to view ticket details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-8" />

      <footer className="text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} Bhutan Monument Tickets - Staff Portal
        </p>
        <p className="mt-1">
          For authorized personnel only. All actions are logged.
        </p>
      </footer>
    </div>
  );
}
