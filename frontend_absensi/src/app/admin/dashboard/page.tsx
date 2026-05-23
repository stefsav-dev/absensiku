"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const stats = [
  {
    title: "Total Revenue",
    value: "$54,239",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Total Users",
    value: "2,345",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "-3.1%",
    trend: "down",
    icon: ShoppingCart,
    color: "text-orange-600",
  },
  {
    title: "Products",
    value: "456",
    change: "+2.4%",
    trend: "up",
    icon: Package,
    color: "text-purple-600",
  },
];

const recentOrders = [
  {
    id: "#12345",
    customer: "John Doe",
    email: "john@example.com",
    amount: "$234.50",
    status: "Completed",
    date: "2024-01-15",
  },
  {
    id: "#12346",
    customer: "Jane Smith",
    email: "jane@example.com",
    amount: "$567.00",
    status: "Processing",
    date: "2024-01-15",
  },
  {
    id: "#12347",
    customer: "Bob Johnson",
    email: "bob@example.com",
    amount: "$89.99",
    status: "Pending",
    date: "2024-01-14",
  },
  {
    id: "#12348",
    customer: "Alice Brown",
    email: "alice@example.com",
    amount: "$432.00",
    status: "Completed",
    date: "2024-01-14",
  },
  {
    id: "#12349",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    amount: "$178.50",
    status: "Shipped",
    date: "2024-01-13",
  },
];

const topProducts = [
  { name: "Product A", sales: 1234, revenue: "$12,345", growth: 15 },
  { name: "Product B", sales: 987, revenue: "$9,870", growth: 8 },
  { name: "Product C", sales: 756, revenue: "$7,560", growth: -3 },
  { name: "Product D", sales: 654, revenue: "$6,540", growth: 12 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
          <Button>
            <Eye className="mr-2 h-4 w-4" />
            View Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }
                >
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {/* Add your chart component here (e.g., Recharts, Chart.js) */}
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Chart Component Here
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Distribution of sales across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Pie Chart Component Here
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest transactions from customers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Completed"
                            ? "default"
                            : order.status === "Processing"
                            ? "secondary"
                            : order.status === "Shipped"
                            ? "outline"
                            : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="ghost" className="mt-4 w-full">
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{product.sales} sales</span>
                        <span>{product.revenue}</span>
                      </div>
                    </div>
                    <Badge
                      variant={product.growth > 0 ? "default" : "destructive"}
                    >
                      {product.growth > 0 ? "+" : ""}
                      {product.growth}%
                    </Badge>
                  </div>
                  <Progress value={(product.sales / 1500) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>User actions and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${i}`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        User {i} performed an action
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}