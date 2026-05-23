"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, ChevronDown, HelpCircle, LayoutDashboard, LogOut, Menu, Paperclip, Search, Settings, Timer, UserCircle, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
    badge?: number;
    subItems?: NavItem[];
}

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users,
    },
    {
        title: "Absensi",
        href: "/admin/absensi",
        icon: Timer
    },
    {
        title: "Report",
        href: "/admin/report",
        icon: Paperclip,
    }
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return a skeleton or null during SSR
        return (
            <div className="min-h-screen bg-gray-50/ dark:bg-gray-900">
                <div className="lg:pl-72">
                    <div className="h-16 border-b bg-white dark:bg-gray-950" />
                    <main className="p-6">{children}</main>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/ dark:bg-gray-900">
            {/* Mobile Sidebar - Only render on client */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="fixed left-4 top-4 z-50 lg:hidden"
                    >
                        <Menu className="h-5 w-5"/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                    <SidebarContent pathname={pathname} setSidebarOpen={setSidebarOpen}/>
                </SheetContent>
            </Sheet>
            
            {/* Desktop Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r bg-white shadow-sm lg:block dark:bg-gray-950">
                <SidebarContent pathname={pathname}/>
            </aside>

            <div className="lg:pl-72">
                <TopNavbar/>
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}

function SidebarContent({
    pathname,
    setSidebarOpen,
}: {
    pathname: string,
    setSidebarOpen?: (open: boolean) => void;
}) {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleExpand = (title: string) => {
        setExpandedItems((prev) =>
            prev.includes(title)
                ? prev.filter((item) => item !== title)
                : [...prev, title]
        );
    };

    const isActive = (href: string) => {
        return pathname === href || pathname?.startsWith(href + "/");
    };

    const handleLinkClick = () => {
        if (setSidebarOpen) {
            setSidebarOpen(false);
        }
    };

    if (!mounted) {
        return (
            <div className="flex h-full flex-col">
                <div className="flex h-16 items-center justify-between border-b px-6">
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-lg bg-primary/50" />
                        <div className="h-6 w-32 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b px-6">
                <Link href="/admin/dashboard" className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <span className="font-bold text-xl">AdminPanel</span>
                </Link>
                {setSidebarOpen && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 px-4 py-6">
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <div key={item.href}>
                            {item.subItems ? (
                                <div>
                                    <button
                                        onClick={() => toggleExpand(item.title)}
                                        className={cn(
                                            "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                                            isActive(item.href) && "bg-gray-100 dark:bg-gray-800"
                                        )}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.title}</span>
                                        </div>
                                        <ChevronDown
                                            className={cn(
                                                "h-4 w-4 transition-transform",
                                                expandedItems.includes(item.title) && "rotate-180"
                                            )}
                                        />
                                    </button>
                                    {expandedItems.includes(item.title) && (
                                        <div className="ml-9 mt-1 space-y-1">
                                            {item.subItems.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    onClick={handleLinkClick}
                                                    className={cn(
                                                        "block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                                                        isActive(subItem.href)
                                                            ? "bg-gray-100 text-primary dark:bg-gray-800"
                                                            : "text-gray-600 dark:text-gray-400"
                                                    )}
                                                >
                                                    {subItem.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className={cn(
                                        "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                                        isActive(item.href)
                                            ? "bg-primary/10 text-primary dark:bg-primary/20"
                                            : "text-gray-700 dark:text-gray-300"
                                    )}
                                >
                                    <div className="flex items-center space-x-3">
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.title}</span>
                                    </div>
                                    {item.badge && (
                                        <Badge variant="secondary" className="ml-auto">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
            </ScrollArea>

            {/* Footer Menu */}
            <div className="border-t p-4">
                <Link
                    href="/admin/help"
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                    <HelpCircle className="h-5 w-5" />
                    <span>Help & Support</span>
                </Link>
                <button
                    onClick={() => {
                        console.log("Logout");
                    }}
                    className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

function TopNavbar() {
    const [mounted, setMounted] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <header className="sticky top-0 z-20 border-b bg-white shadow-sm dark:bg-gray-950">
                <div className="flex h-16 items-center justify-between px-6">
                    <div className="hidden max-w-md flex-1 md:block">
                        <div className="h-10 w-64 bg-gray-200 rounded" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 bg-gray-200 rounded-full" />
                        <div className="h-8 w-8 bg-gray-200 rounded-full" />
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-20 border-b bg-white shadow-sm dark:bg-gray-950">
            <div className="flex h-16 items-center justify-between px-6">
                {/* Search Bar */}
                <div className="hidden max-w-md flex-1 md:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-9"
                            suppressHydrationWarning
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                {notificationCount > 0 && (
                                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                                        {notificationCount}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="max-h-96 space-y-2 overflow-y-auto p-2">
                                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                                    <p className="text-sm font-medium">New order received</p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                                <div className="rounded-lg p-3">
                                    <p className="text-sm font-medium">User registered</p>
                                    <p className="text-xs text-gray-500">1 hour ago</p>
                                </div>
                                <div className="rounded-lg p-3">
                                    <p className="text-sm font-medium">System update</p>
                                    <p className="text-xs text-gray-500">3 hours ago</p>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="justify-center">
                                View all notifications
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage 
                                        src="https://github.com/shadcn.png" 
                                        onError={(e) => {
                                            // Handle image load error
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                                <div className="hidden text-left md:block">
                                    <p className="text-sm font-medium">Admin User</p>
                                    <p className="text-xs text-gray-500">admin@example.com</p>
                                </div>
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <UserCircle className="mr-2 h-4 w-4" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}