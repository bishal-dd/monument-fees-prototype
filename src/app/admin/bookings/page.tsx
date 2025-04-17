"use client";

import { useState } from "react";
import {
  Calendar,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data for bookings
const bookingsData = [
  {
    id: "BHT12345",
    customer: "Tshering Dorji",
    email: "t.dorji@example.com",
    date: "2023-10-15",
    visitDate: "2023-10-20",
    monuments: ["Paro Taktsang", "Punakha Dzong"],
    amount: 2500,
    status: "Completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "BHT67890",
    customer: "Karma Wangchuk",
    email: "k.wangchuk@example.com",
    date: "2023-10-14",
    visitDate: "2023-10-19",
    monuments: ["Buddha Dordenma", "Memorial Chorten"],
    amount: 1800,
    status: "Completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "BHT54321",
    customer: "Deki Yangzom",
    email: "d.yangzom@example.com",
    date: "2023-10-14",
    visitDate: "2023-10-18",
    monuments: ["Tashichho Dzong"],
    amount: 1200,
    status: "Completed",
    paymentMethod: "Mobile Payment",
  },
  {
    id: "BHT98765",
    customer: "Pema Tshering",
    email: "p.tshering@example.com",
    date: "2023-10-13",
    visitDate: "2023-10-17",
    monuments: ["Rinpung Dzong", "National Museum"],
    amount: 2000,
    status: "Completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "BHT24680",
    customer: "Sonam Dorji",
    email: "s.dorji@example.com",
    date: "2023-10-13",
    visitDate: "2023-10-16",
    monuments: ["Chimi Lhakhang"],
    amount: 800,
    status: "Completed",
    paymentMethod: "Mobile Payment",
  },
  {
    id: "BHT13579",
    customer: "Tashi Wangmo",
    email: "t.wangmo@example.com",
    date: "2023-10-15",
    visitDate: "2023-10-21",
    monuments: ["Kurje Lhakhang", "Jambay Lhakhang"],
    amount: 1500,
    status: "Upcoming",
    paymentMethod: "Credit Card",
  },
  {
    id: "BHT86420",
    customer: "Dorji Tshering",
    email: "d.tshering@example.com",
    date: "2023-10-14",
    visitDate: "2023-10-22",
    monuments: ["Paro Taktsang"],
    amount: 1000,
    status: "Upcoming",
    paymentMethod: "Mobile Payment",
  },
  {
    id: "BHT97531",
    customer: "Kinley Yangden",
    email: "k.yangden@example.com",
    date: "2023-10-12",
    visitDate: "2023-10-15",
    monuments: ["Buddha Dordenma", "Memorial Chorten", "Tashichho Dzong"],
    amount: 2200,
    status: "Cancelled",
    paymentMethod: "Credit Card",
  },
  {
    id: "BHT75319",
    customer: "Ugyen Tenzin",
    email: "u.tenzin@example.com",
    date: "2023-10-11",
    visitDate: "2023-10-14",
    monuments: ["Punakha Dzong"],
    amount: 1200,
    status: "Cancelled",
    paymentMethod: "Mobile Payment",
  },
  {
    id: "BHT31975",
    customer: "Chimi Dema",
    email: "c.dema@example.com",
    date: "2023-10-15",
    visitDate: "2023-10-23",
    monuments: ["Wangdue Phodrang Dzong"],
    amount: 900,
    status: "Upcoming",
    paymentMethod: "Credit Card",
  },
];

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter bookings based on search query and status filter
  const filteredBookings = bookingsData.filter((booking) => {
    // Filter by status
    if (
      statusFilter !== "all" &&
      booking.status.toLowerCase() !== statusFilter
    ) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        booking.id.toLowerCase().includes(query) ||
        booking.customer.toLowerCase().includes(query) ||
        booking.email.toLowerCase().includes(query) ||
        booking.monuments.some((monument) =>
          monument.toLowerCase().includes(query)
        )
      );
    }

    return true;
  });

  // Calculate summary metrics
  const totalBookings = bookingsData.length;
  const totalRevenue = bookingsData.reduce(
    (sum, booking) => sum + booking.amount,
    0
  );
  const completedBookings = bookingsData.filter(
    (booking) => booking.status === "Completed"
  ).length;
  const upcomingBookings = bookingsData.filter(
    (booking) => booking.status === "Upcoming"
  ).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Completed
          </Badge>
        );
      case "Upcoming":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Upcoming
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">
            View and manage all monument bookings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Nu. {totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedBookings}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((completedBookings / totalBookings) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingBookings}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((upcomingBookings / totalBookings) * 100)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Booking List</CardTitle>
          <CardDescription>
            View and manage all monument bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-[250px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Visit Date</TableHead>
                  <TableHead>Monuments</TableHead>
                  <TableHead className="text-right">Amount (Nu.)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div>{booking.customer}</div>
                      <div className="text-xs text-muted-foreground">
                        {booking.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(booking.visitDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div
                        className="max-w-[200px] truncate"
                        title={booking.monuments.join(", ")}
                      >
                        {booking.monuments.join(", ")}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {booking.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>{booking.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download Receipt
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {booking.status === "Upcoming" && (
                            <DropdownMenuItem className="text-red-600">
                              Cancel Booking
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredBookings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
