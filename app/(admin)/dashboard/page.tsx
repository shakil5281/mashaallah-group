"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BarChart, ShoppingBag, Users, Package } from "lucide-react";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    revenue: 0,
    recentOrders: [],
  });

  useEffect(() => {
    async function fetchData() {
      const [usersRes, ordersRes, productsRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/orders"),
        fetch("/api/products"),
      ]);

      const users = await usersRes.json();
      const orders = await ordersRes.json();
      const products = await productsRes.json();

      const revenue = orders.reduce((acc: number, order: any) => acc + order.total, 0);

      setDashboardData({
        totalUsers: users.length,
        totalOrders: orders.length,
        totalProducts: products.length,
        revenue,
        recentOrders: orders.slice(0, 5),
      });
    }

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Revenue" value={`৳${dashboardData.revenue}`} Icon={BarChart} />
        <StatsCard title="Total Orders" value={dashboardData.totalOrders} Icon={ShoppingBag} />
        <StatsCard title="Total Users" value={dashboardData.totalUsers} Icon={Users} />
        <StatsCard title="Total Products" value={dashboardData.totalProducts} Icon={Package} />
      </div>

      {/* Recent Orders Table */}
      <Card className="shadow">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboardData.recentOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No recent orders
                  </TableCell>
                </TableRow>
              ) : (
                dashboardData.recentOrders.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>৳{order.total}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StatsCard({ title, value, Icon }: { title: string; value: string | number; Icon: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="flex items-center p-4 shadow h-28">
        <Icon className="w-8 h-8 text-primary mr-8" />
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </Card>
    </motion.div>
  );
}
