"use client"

import { useState } from "react"
import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// Sample data for Bhutan's dzongkhags and monuments
const dzongkhags = [
  { id: 1, name: "Thimphu" },
  { id: 2, name: "Paro" },
  { id: 3, name: "Punakha" },
  { id: 4, name: "Wangdue Phodrang" },
  { id: 5, name: "Bumthang" },
]

const monuments = [
  { id: 1, dzongkhagId: 1, name: "Tashichho Dzong", price: 500 },
  { id: 2, dzongkhagId: 1, name: "Memorial Chorten", price: 300 },
  { id: 3, dzongkhagId: 1, name: "Buddha Dordenma", price: 200 },
  { id: 4, dzongkhagId: 2, name: "Paro Taktsang (Tiger's Nest)", price: 1000 },
  { id: 5, dzongkhagId: 2, name: "Rinpung Dzong", price: 500 },
  { id: 6, dzongkhagId: 2, name: "National Museum of Bhutan", price: 350 },
  { id: 7, dzongkhagId: 3, name: "Punakha Dzong", price: 600 },
  { id: 8, dzongkhagId: 3, name: "Chimi Lhakhang", price: 250 },
  { id: 9, dzongkhagId: 4, name: "Wangdue Phodrang Dzong", price: 400 },
  { id: 10, dzongkhagId: 5, name: "Kurje Lhakhang", price: 300 },
  { id: 11, dzongkhagId: 5, name: "Jambay Lhakhang", price: 300 },
]

interface CartItem {
  monumentId: number
  monumentName: string
  price: number
  quantity: number
}

export default function TicketBookingForm() {
  const [selectedDzongkhag, setSelectedDzongkhag] = useState<string>("")
  const [selectedMonument, setSelectedMonument] = useState<string>("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [ticketQuantity, setTicketQuantity] = useState(1)

  // Filter monuments based on selected dzongkhag
  const filteredMonuments = selectedDzongkhag
    ? monuments.filter((monument) => monument.dzongkhagId === Number.parseInt(selectedDzongkhag))
    : []

  // Handle adding tickets to cart
  const addToCart = () => {
    if (!selectedMonument) return

    const monument = monuments.find((m) => m.id === Number.parseInt(selectedMonument))
    if (!monument) return

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex((item) => item.monumentId === monument.id)

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedCart = [...cartItems]
      updatedCart[existingItemIndex].quantity += ticketQuantity
      setCartItems(updatedCart)
    } else {
      // Add new item
      setCartItems([
        ...cartItems,
        {
          monumentId: monument.id,
          monumentName: monument.name,
          price: monument.price,
          quantity: ticketQuantity,
        },
      ])
    }

    // Reset selections
    setSelectedMonument("")
    setTicketQuantity(1)
  }

  // Handle removing items from cart
  const removeFromCart = (monumentId: number) => {
    setCartItems(cartItems.filter((item) => item.monumentId !== monumentId))
  }

  // Handle updating quantity in cart
  const updateQuantity = (monumentId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedCart = cartItems.map((item) =>
      item.monumentId === monumentId ? { ...item, quantity: newQuantity } : item,
    )
    setCartItems(updatedCart)
  }

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Select Monument and Tickets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="dzongkhag" className="text-sm font-medium">
                Select Dzongkhag (District)
              </label>
              <Select
                value={selectedDzongkhag}
                onValueChange={(value) => {
                  setSelectedDzongkhag(value)
                  setSelectedMonument("")
                }}
              >
                <SelectTrigger id="dzongkhag" className="w-full">
                  <SelectValue placeholder="Select a dzongkhag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Dzongkhags</SelectLabel>
                    {dzongkhags.map((dzongkhag) => (
                      <SelectItem key={dzongkhag.id} value={dzongkhag.id.toString()}>
                        {dzongkhag.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="monument" className="text-sm font-medium">
                Select Monument
              </label>
              <Select value={selectedMonument} onValueChange={setSelectedMonument} disabled={!selectedDzongkhag}>
                <SelectTrigger id="monument" className="w-full">
                  <SelectValue placeholder={selectedDzongkhag ? "Select a monument" : "First select a dzongkhag"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Monuments</SelectLabel>
                    {filteredMonuments.map((monument) => (
                      <SelectItem key={monument.id} value={monument.id.toString()}>
                        {monument.name} - Nu. {monument.price}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Number of Tickets
              </label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                  disabled={ticketQuantity <= 1}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{ticketQuantity}</span>
                <Button variant="outline" size="icon" onClick={() => setTicketQuantity(ticketQuantity + 1)}>
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button onClick={addToCart} disabled={!selectedMonument} className="mt-4 bg-red-800 hover:bg-red-700">
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Your Cart
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.monumentId} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.monumentName}</span>
                      <span>Nu. {item.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.monumentId, item.quantity - 1)}
                        >
                          <MinusCircle className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.monumentId, item.quantity + 1)}
                        >
                          <PlusCircle className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.monumentId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </Button>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>Nu. {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-red-800 hover:bg-red-700"
              disabled={cartItems.length === 0}
              onClick={() => alert("Proceeding to checkout...")}
            >
              Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

