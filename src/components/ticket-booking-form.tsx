"use client";

import { useState } from "react";
import {
  MinusCircle,
  PlusCircle,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

// Sample data for Bhutan's dzongkhags and monuments
const dzongkhags = [
  { id: 1, name: "Thimphu" },
  { id: 2, name: "Paro" },
  { id: 3, name: "Punakha" },
  { id: 4, name: "Wangdue Phodrang" },
  { id: 5, name: "Bumthang" },
];

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
];

interface CartItem {
  monumentId: number;
  monumentName: string;
  price: number;
  adultQuantity: number;
  kidQuantity: number;
  adultTotal: number;
  kidTotal: number;
}

export default function TicketBookingForm() {
  const router = useRouter();
  const [selectedDzongkhag, setSelectedDzongkhag] = useState<string>("");
  const [selectedMonument, setSelectedMonument] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [adultQuantity, setAdultQuantity] = useState(1);
  const [kidQuantity, setKidQuantity] = useState(0);

  // Filter monuments based on selected dzongkhag
  const filteredMonuments = selectedDzongkhag
    ? monuments.filter(
        (monument) =>
          monument.dzongkhagId === Number.parseInt(selectedDzongkhag)
      )
    : [];

  // Handle adding tickets to cart
  const addToCart = () => {
    if (!selectedMonument || (adultQuantity === 0 && kidQuantity === 0)) return;

    const monument = monuments.find(
      (m) => m.id === Number.parseInt(selectedMonument)
    );
    if (!monument) return;

    // Calculate totals
    const adultTotal = adultQuantity * monument.price;
    const kidTotal = kidQuantity * (monument.price * 0.5); // 50% discount for kids

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.monumentId === monument.id
    );

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        adultQuantity,
        kidQuantity,
        adultTotal,
        kidTotal,
      };

      setCartItems(updatedCart);
    } else {
      // Add new item
      setCartItems([
        ...cartItems,
        {
          monumentId: monument.id,
          monumentName: monument.name,
          price: monument.price,
          adultQuantity,
          kidQuantity,
          adultTotal,
          kidTotal,
        },
      ]);
    }

    // Reset monument selection
    setSelectedMonument("");
  };

  // Handle removing items from cart
  const removeFromCart = (monumentId: number) => {
    setCartItems(cartItems.filter((item) => item.monumentId !== monumentId));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.adultTotal + item.kidTotal,
    0
  );

  // Proceed to checkout
  const proceedToCheckout = () => {
    if (cartItems.length === 0) return;

    // In a real app, you would store the cart in context, localStorage, or a state management solution
    // For this demo, we'll just navigate to the checkout page
    router.push("/checkout");
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Select Monument and Tickets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Group size selection at the top */}
            <div className="rounded-md border border-gray-200 p-4 space-y-4 mb-6">
              <h3 className="font-medium">Number of Visitors</h3>
              <p className="text-sm text-gray-500">
                Select the number of people in your group. This will apply to
                all monuments you select.
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium">Adults</div>
                      <div className="text-sm text-gray-500">Full price</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setAdultQuantity(Math.max(0, adultQuantity - 1))
                      }
                      disabled={adultQuantity <= 0}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{adultQuantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setAdultQuantity(adultQuantity + 1)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-600" />
                    <div>
                      <div className="font-medium">Children</div>
                      <div className="text-sm text-gray-500">
                        50% off{" "}
                        <span className="text-green-600">(half price)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setKidQuantity(Math.max(0, kidQuantity - 1))
                      }
                      disabled={kidQuantity <= 0}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{kidQuantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setKidQuantity(kidQuantity + 1)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {adultQuantity === 0 && kidQuantity === 0 && (
                <div className="text-sm text-amber-600 mt-2">
                  Please select at least one adult or child to continue.
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="dzongkhag" className="text-sm font-medium">
                Select Dzongkhag (District)
              </label>
              <Select
                value={selectedDzongkhag}
                onValueChange={(value) => {
                  setSelectedDzongkhag(value);
                  setSelectedMonument("");
                }}
              >
                <SelectTrigger id="dzongkhag" className="w-full">
                  <SelectValue placeholder="Select a dzongkhag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Dzongkhags</SelectLabel>
                    {dzongkhags.map((dzongkhag) => (
                      <SelectItem
                        key={dzongkhag.id}
                        value={dzongkhag.id.toString()}
                      >
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
              <Select
                value={selectedMonument}
                onValueChange={setSelectedMonument}
                disabled={
                  !selectedDzongkhag ||
                  (adultQuantity === 0 && kidQuantity === 0)
                }
              >
                <SelectTrigger id="monument" className="w-full">
                  <SelectValue
                    placeholder={
                      adultQuantity === 0 && kidQuantity === 0
                        ? "First select number of visitors"
                        : selectedDzongkhag
                        ? "Select a monument"
                        : "First select a dzongkhag"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Monuments</SelectLabel>
                    {filteredMonuments.map((monument) => (
                      <SelectItem
                        key={monument.id}
                        value={monument.id.toString()}
                      >
                        {monument.name} - Nu. {monument.price}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {selectedMonument && (adultQuantity > 0 || kidQuantity > 0) && (
              <div className="rounded-md border border-gray-200 p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Selected Monument</h3>
                  <div className="text-sm text-gray-500">
                    {
                      monuments.find(
                        (m) => m.id === Number.parseInt(selectedMonument)
                      )?.name
                    }
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {adultQuantity > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>
                        Adults: {adultQuantity} × Nu.{" "}
                        {
                          monuments.find(
                            (m) => m.id === Number.parseInt(selectedMonument)
                          )?.price
                        }
                      </span>
                      <span className="font-medium">
                        Nu.{" "}
                        {adultQuantity *
                          (monuments.find(
                            (m) => m.id === Number.parseInt(selectedMonument)
                          )?.price || 0)}
                      </span>
                    </div>
                  )}

                  {kidQuantity > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>
                        Children: {kidQuantity} × Nu.{" "}
                        {(monuments.find(
                          (m) => m.id === Number.parseInt(selectedMonument)
                        )?.price || 0) * 0.5}{" "}
                        <span className="text-green-600">(50% off)</span>
                      </span>
                      <span className="font-medium">
                        Nu.{" "}
                        {kidQuantity *
                          ((monuments.find(
                            (m) => m.id === Number.parseInt(selectedMonument)
                          )?.price || 0) *
                            0.5)}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-200 flex justify-between font-medium">
                    <span>Subtotal:</span>
                    <span>
                      Nu.{" "}
                      {adultQuantity *
                        (monuments.find(
                          (m) => m.id === Number.parseInt(selectedMonument)
                        )?.price || 0) +
                        kidQuantity *
                          ((monuments.find(
                            (m) => m.id === Number.parseInt(selectedMonument)
                          )?.price || 0) *
                            0.5)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={addToCart}
              disabled={
                !selectedMonument || (adultQuantity === 0 && kidQuantity === 0)
              }
              className="mt-4 bg-red-800 hover:bg-red-700"
            >
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
                  <div key={item.monumentId} className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.monumentName}</span>
                      <span>Nu. {item.price}</span>
                    </div>

                    {item.adultQuantity > 0 && (
                      <div className="flex items-center justify-between pl-2">
                        <div className="flex items-center gap-1.5">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            Adults ({item.adultQuantity})
                          </span>
                          <Badge variant="outline" className="ml-1 text-xs">
                            Nu. {item.price}
                          </Badge>
                        </div>
                        <span className="text-sm">Nu. {item.adultTotal}</span>
                      </div>
                    )}

                    {item.kidQuantity > 0 && (
                      <div className="flex items-center justify-between pl-2">
                        <div className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            Children ({item.kidQuantity})
                          </span>
                          <Badge variant="outline" className="ml-1 text-xs">
                            Nu. {item.price * 0.5}
                            <span className="ml-1 text-green-600">(-50%)</span>
                          </Badge>
                        </div>
                        <span className="text-sm">Nu. {item.kidTotal}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm pl-2">
                      <span>Subtotal:</span>
                      <span>Nu. {item.adultTotal + item.kidTotal}</span>
                    </div>

                    <div className="flex justify-end">
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
              onClick={proceedToCheckout}
            >
              Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
