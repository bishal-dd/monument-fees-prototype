"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, User, X, UserPlus } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-red-800"></div>
              <span className="ml-2 text-xl font-bold text-red-800">
                Bhutan Tickets
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-800"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-800"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-800"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Button variant="outline" asChild>
                  <Link href="/sign-in">
                    Sign In
                    <User className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button className="bg-red-800 hover:bg-red-700" asChild>
                  <Link href="/sign-up">
                    Sign Up
                    <UserPlus className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </SignedOut>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-red-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:text-red-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/monuments"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:text-red-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Monuments
            </Link>
            <Link
              href="/about"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:text-red-800"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:text-red-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="mt-4 flex flex-col space-y-2 px-3">
              <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-center bg-red-800 hover:bg-red-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
