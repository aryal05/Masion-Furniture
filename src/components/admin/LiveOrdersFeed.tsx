"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Order } from "@/types";

export function LiveOrdersFeed() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Initial fetch
    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      setOrders((data as Order[]) ?? []);
    };

    fetchOrders();

    // Subscribe to new orders
    const channel = supabase
      .channel("live-orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          setOrders((prev) => [payload.new as Order, ...prev.slice(0, 4)]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          setOrders((prev) =>
            prev.map((o) =>
              o.id === payload.new.id ? (payload.new as Order) : o
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg">Live Orders</h3>
        <span className="flex items-center gap-2 text-xs text-sage">
          <span className="h-2 w-2 rounded-full bg-sage animate-pulse" />
          Live
        </span>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between rounded-btn border border-walnut/10 p-4"
            >
              <div>
                <p className="font-medium">{order.order_number}</p>
                <p className="text-sm text-muted">
                  NPR {order.total.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <StatusBadge status={order.status} size="sm" />
                <p className="mt-1 text-xs text-muted">
                  {new Date(order.created_at).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {orders.length === 0 && (
          <p className="text-center text-sm text-muted py-8">
            No orders yet today
          </p>
        )}
      </div>
    </div>
  );
}
