"use client";

import { useState } from "react";
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash } from "lucide-react";

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

// Sample data for monuments
const monumentsData = [
  {
    id: 1,
    name: "Paro Taktsang (Tiger's Nest)",
    location: "Paro",
    price: 1000,
    totalRevenue: 250000,
    totalBookings: 1250,
    status: "Active",
    featured: true,
  },
  {
    id: 2,
    name: "Punakha Dzong",
    location: "Punakha",
    price: 600,
    totalRevenue: 180000,
    totalBookings: 900,
    status: "Active",
    featured: true,
  },
  {
    id: 3,
    name: "Tashichho Dzong",
    location: "Thimphu",
    price: 500,
    totalRevenue: 150000,
    totalBookings: 750,
    status: "Active",
    featured: true,
  },
  {
    id: 4,
    name: "Buddha Dordenma",
    location: "Thimphu",
    price: 200,
    totalRevenue: 120000,
    totalBookings: 600,
    status: "Active",
    featured: true,
  },
  {
    id: 5,
    name: "Memorial Chorten",
    location: "Thimphu",
    price: 300,
    totalRevenue: 100000,
    totalBookings: 500,
    status: "Active",
    featured: false,
  },
  {
    id: 6,
    name: "Rinpung Dzong",
    location: "Paro",
    price: 500,
    totalRevenue: 90000,
    totalBookings: 450,
    status: "Active",
    featured: false,
  },
  {
    id: 7,
    name: "National Museum of Bhutan",
    location: "Paro",
    price: 350,
    totalRevenue: 80000,
    totalBookings: 400,
    status: "Active",
    featured: false,
  },
  {
    id: 8,
    name: "Chimi Lhakhang",
    location: "Punakha",
    price: 250,
    totalRevenue: 70000,
    totalBookings: 350,
    status: "Active",
    featured: false,
  },
  {
    id: 9,
    name: "Kurje Lhakhang",
    location: "Bumthang",
    price: 300,
    totalRevenue: 60000,
    totalBookings: 300,
    status: "Active",
    featured: false,
  },
  {
    id: 10,
    name: "Jambay Lhakhang",
    location: "Bumthang",
    price: 300,
    totalRevenue: 50000,
    totalBookings: 250,
    status: "Active",
    featured: false,
  },
  {
    id: 11,
    name: "Wangdue Phodrang Dzong",
    location: "Wangdue Phodrang",
    price: 400,
    totalRevenue: 40000,
    totalBookings: 200,
    status: "Maintenance",
    featured: false,
  },
];

export default function MonumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter monuments based on search query
  const filteredMonuments = monumentsData.filter((monument) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      monument.name.toLowerCase().includes(query) ||
      monument.location.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monuments</h1>
          <p className="text-muted-foreground">
            Manage your monuments and view their performance.
          </p>
        </div>
        <Button className="bg-red-800 hover:bg-red-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Monument
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Monuments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monumentsData.length}</div>
            <p className="text-xs text-muted-foreground">
              {monumentsData.filter((m) => m.status === "Active").length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Nu.{" "}
              {monumentsData
                .reduce((sum, m) => sum + m.totalRevenue, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From all monument bookings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monumentsData
                .reduce((sum, m) => sum + m.totalBookings, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all monuments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monuments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monument List</CardTitle>
          <CardDescription>
            View and manage all monuments in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search monuments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-[250px]"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Price (Nu.)</TableHead>
                  <TableHead className="text-right">Revenue (Nu.)</TableHead>
                  <TableHead className="text-right">Bookings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMonuments.map((monument) => (
                  <TableRow key={monument.id}>
                    <TableCell className="font-medium">
                      {monument.name}
                      {monument.featured && (
                        <Badge
                          variant="outline"
                          className="ml-2 bg-amber-100 text-amber-800 border-amber-200"
                        >
                          Featured
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{monument.location}</TableCell>
                    <TableCell className="text-right">
                      {monument.price.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {monument.totalRevenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {monument.totalBookings.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          monument.status === "Active"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        }
                      >
                        {monument.status}
                      </Badge>
                    </TableCell>
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
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Monument
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Monument
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredMonuments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No monuments found.
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
