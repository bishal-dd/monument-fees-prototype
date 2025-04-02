import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-red-800 md:text-4xl">Checkout</h1>
          <p className="mt-2 text-gray-600">Complete your booking for Bhutan monument tickets</p>
        </header>

        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Please enter your payment details to complete the purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email address" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card">Card Number</Label>
                <Input id="card" placeholder="1234 5678 9012 3456" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Billing Address</Label>
                <Input id="address" placeholder="Enter your billing address" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full bg-red-800 hover:bg-red-700">Complete Payment</Button>
              <Link href="/" className="text-center text-sm text-gray-500 hover:text-gray-700">
                Return to ticket selection
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

