'use client'

import { Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Home() {
  return (
    <>
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-lg">
              YourLogo
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
              Home
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
              About
            </Link>
            <Link href="/services" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Services
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Contact
            </Link>
          </nav>

          {/* Buttons - Right Desktop */}
          <div className="hidden md:flex flex-shrink-0 space-x-2">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="mt-6 space-y-4">
                  <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                  <Link href="/" className="block py-2 text-lg font-medium transition-colors hover:text-foreground/80 text-foreground">
                    Home
                  </Link>
                  <Link href="/about" className="block py-2 text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60">
                    About
                  </Link>
                  <Link href="/services" className="block py-2 text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60">
                    Services
                  </Link>
                  <Link href="/contact" className="block py-2 text-lg font-medium transition-colors hover:text-foreground/80 text-foreground/60">
                    Contact
                  </Link>
                </div>
                <div className="mt-6 pt-6 border-t space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                  <Button className="w-full justify-start">
                    Register
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-6 px-6">
        <h2 className="text-2xl font-bold">Halaman Index</h2>
      </main>
    </>
  )
}