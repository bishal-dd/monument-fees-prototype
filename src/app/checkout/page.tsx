"use client";

import { useEffect, useState } from "react";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/store/cartStore";

interface CartItem {
  monumentId: number;
  monumentName: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
                            Nu. {item.price} × {item.quantity}
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
