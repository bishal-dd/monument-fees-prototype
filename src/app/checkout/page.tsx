"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export default function CheckoutPage() {
  const cartItems = [
    {
      monumentId: 1,
      monumentName: "Tashichho Dzong",
      price: 50,
      kidQuantity: 2,
      kidTotal: 100,
      adultQuantity: 1,
      adultTotal: 50,
    },
    {
      monumentId: 2,
      monumentName: "Buddha Dordenma",
      price: 50,
      kidQuantity: 2,
      kidTotal: 100,
      adultQuantity: 1,
      adultTotal: 50,
    },
  ];
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.kidQuantity + item.adultQuantity),
    0
  );

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-red-800 md:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-gray-600">
            Complete your booking for Bhutan monument tickets
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">No items in cart</p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.monumentId} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">
                            {item.monumentName}
                          </span>
                          <span>
                            <span>
                              Adult: Nu. {item.price} × {item.adultQuantity}
                            </span>
                            <br />
                            <span>
                              Child: Nu. {item.price * 0.5} × {item.kidQuantity}
                            </span>
                          </span>
                        </div>
                        <Separator />
                      </div>
                    ))}
                    <div className="mt-4 flex justify-between font-bold">
                      <span>Total:</span>
                      <span>Nu. {totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>
                  Please enter your payment details to complete the purchase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tour Agency</Label>
                  <Input id="name" placeholder="Enter your Tour Agency" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Tour Duration</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Tour Duration</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card">Select Bank</Label>
                  <Select>
                    <SelectTrigger id="monument" className="w-full">
                      <SelectValue placeholder={"Select bank"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank of Bhutan">
                        Bank of Bhutan
                      </SelectItem>
                      <SelectItem value="Bhutan National Bank">
                        {" "}
                        Bhutan National Bank
                      </SelectItem>
                      <SelectItem value="Druk PNB Bank">
                        {" "}
                        Druk PNB Bank
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Account Number</Label>
                  <Input
                    id="address"
                    type="number"
                    placeholder="Enter Account Number"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full bg-red-800 hover:bg-red-700" asChild>
                  <Link href={"/verify-otp"}>Complete Payment</Link>
                </Button>
                <Link
                  href="/"
                  className="text-center text-sm text-gray-500 hover:text-gray-700"
                >
                  Return to ticket selection
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
