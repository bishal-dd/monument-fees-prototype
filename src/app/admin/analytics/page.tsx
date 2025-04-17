"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Download,
  Filter,
  Landmark,
  Ticket,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data for analytics
const monthlyData = [
  { name: "Jan", revenue: 42000, bookings: 210, visitors: 420 },
  { name: "Feb", revenue: 38000, bookings: 190, visitors: 380 },
  { name: "Mar", revenue: 55000, bookings: 275, visitors: 550 },
  { name: "Apr", revenue: 78000, bookings: 390, visitors: 780 },
  { name: "May", revenue: 90000, bookings: 450, visitors: 900 },
  { name: "Jun", revenue: 110000, bookings: 550, visitors: 1100 },
  { name: "Jul", revenue: 125000, bookings: 625, visitors: 1250 },
  { name: "Aug", revenue: 135000, bookings: 675, visitors: 1350 },
  { name: "Sep", revenue: 105000, bookings: 525, visitors: 1050 },
  { name: "Oct", revenue: 85000, bookings: 425, visitors: 850 },
  { name: "Nov", revenue: 72000, bookings: 360, visitors: 720 },
  { name: "Dec", revenue: 65000, bookings: 325, visitors: 650 },
];

const monumentRevenueData = [
  { name: "Paro Taktsang", revenue: 250000, bookings: 1250, visitors: 2500 },
  { name: "Punakha Dzong", revenue: 180000, bookings: 900, visitors: 1800 },
  { name: "Tashichho Dzong", revenue: 150000, bookings: 750, visitors: 1500 },
  { name: "Buddha Dordenma", revenue: 120000, bookings: 600, visitors: 1200 },
  { name: "Memorial Chorten", revenue: 100000, bookings: 500, visitors: 1000 },
  { name: "Rinpung Dzong", revenue: 90000, bookings: 450, visitors: 900 },
  { name: "National Museum", revenue: 80000, bookings: 400, visitors: 800 },
  { name: "Chimi Lhakhang", revenue: 70000, bookings: 350, visitors: 700 },
  { name: "Kurje Lhakhang", revenue: 60000, bookings: 300, visitors: 600 },
  { name: "Jambay Lhakhang", revenue: 50000, bookings: 250, visitors: 500 },
];

const visitorDemographics = [
  { name: "Domestic", value: 30 },
  { name: "International", value: 70 },
];

const visitorAgeGroups = [
  { name: "Under 18", value: 15 },
  { name: "18-24", value: 20 },
  { name: "25-34", value: 30 },
  { name: "35-44", value: 20 },
  { name: "45-64", value: 10 },
  { name: "65+", value: 5 },
];

const COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#d946ef",
  "#ec4899",
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year");
  const [compareWith, setCompareWith] = useState("previous");

  // Calculate summary metrics
  const totalRevenue = monthlyData.reduce((sum, item) => sum + item.revenue, 0);
  const totalBookings = monthlyData.reduce(
    (sum, item) => sum + item.bookings,
    0
  );
  const totalVisitors = monthlyData.reduce(
    (sum, item) => sum + item.visitors,
    0
  );
  const averageRevenuePerBooking = Math.round(totalRevenue / totalBookings);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed analytics and insights for your monument booking system.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={compareWith} onValueChange={setCompareWith}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Compare with" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous">Previous Period</SelectItem>
              <SelectItem value="year">Previous Year</SelectItem>
              <SelectItem value="none">No Comparison</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Export Data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Nu. {totalRevenue.toLocaleString()}
            </div>
            <div className="mt-1 flex items-center text-sm">
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">12%</span>
              <span className="ml-1 text-muted-foreground">
                vs. previous {timeRange}
              </span>
            </div>
            <div className="mt-3 h-[40px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData.slice(-6)}>
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalBookings.toLocaleString()}
            </div>
            <div className="mt-1 flex items-center text-sm">
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">8%</span>
              <span className="ml-1 text-muted-foreground">
                vs. previous {timeRange}
              </span>
            </div>
            <div className="mt-3 h-[40px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData.slice(-6)}>
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalVisitors.toLocaleString()}
            </div>
            <div className="mt-1 flex items-center text-sm">
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">15%</span>
              <span className="ml-1 text-muted-foreground">
                vs. previous {timeRange}
              </span>
            </div>
            <div className="mt-3 h-[40px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData.slice(-6)}>
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Revenue per Booking
            </CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Nu. {averageRevenuePerBooking.toLocaleString()}
            </div>
            <div className="mt-1 flex items-center text-sm">
              <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
              <span className="font-medium text-red-500">3%</span>
              <span className="ml-1 text-muted-foreground">
                vs. previous {timeRange}
              </span>
            </div>
            <div className="mt-3 h-[40px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData.slice(-6).map((item) => ({
                    ...item,
                    avgRevenue: Math.round(item.revenue / item.bookings),
                  }))}
                >
                  <Line
                    type="monotone"
                    dataKey="avgRevenue"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="monuments">Monuments</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>
                Monthly revenue for {new Date().getFullYear()}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `Nu. ${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#ef4444" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Trends</CardTitle>
              <CardDescription>
                Monthly bookings for {new Date().getFullYear()}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#3b82f6"
                    name="Bookings"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="visitors" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Demographics</CardTitle>
                <CardDescription>Breakdown of visitor types</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={visitorDemographics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {visitorDemographics.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Percentage"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Visitor Age Groups</CardTitle>
                <CardDescription>Distribution by age</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={visitorAgeGroups}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {visitorAgeGroups.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Percentage"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="monuments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monument Performance</CardTitle>
              <CardDescription>Revenue by monument</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monumentRevenueData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={150} />
                  <Tooltip
                    formatter={(value) => [
                      `Nu. ${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#ef4444" name="Revenue">
                    {monumentRevenueData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Calendar View */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Booking Calendar</CardTitle>
            <CardDescription>View bookings by date</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            View Full Calendar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex h-[200px] items-center justify-center border rounded-md">
            <p className="text-muted-foreground">
              Calendar view will be displayed here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
