"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Order } from "@/types";

export function useOrderRealtime(orderNumber: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial fetch
    const fetchOrder = async () => {
      const { data, error: fetchError } = await supabase
        .from("orders")
        .select(`
          *,
          items:order_items(*)
        `)
        .eq("order_number", orderNumber)
        .single();

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setOrder(data as Order);
      }
      setLoading(false);
    };

    fetchOrder();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`order-${orderNumber}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `order_number=eq.${orderNumber}`,
        },
        (payload) => {
          setOrder((prev) =>
            prev ? { ...prev, ...payload.new } : (payload.new as Order)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderNumber]);

  return { order, loading, error };
}
