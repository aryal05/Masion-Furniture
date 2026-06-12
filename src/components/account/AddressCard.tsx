"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import type { Address } from "@/types";

interface Props {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
}

export function AddressCard({ address, onEdit, onDelete }: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleSetDefault = async () => {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", address.user_id);

    await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", address.id);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    setDeleting(true);
    await supabase.from("addresses").delete().eq("id", address.id);
    onDelete();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{address.name}</h3>
            {address.is_default && (
              <span className="rounded bg-brass/15 px-2 py-0.5 text-[10px] uppercase tracking-label text-brass">
                Default
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-muted">{address.phone}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-sm text-walnut hover:underline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm text-rose hover:underline disabled:opacity-50"
          >
            {deleting ? "..." : "Delete"}
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-muted">
        <p>{address.line1}</p>
        {address.line2 && <p>{address.line2}</p>}
        <p>
          {address.city}, {address.district}
        </p>
        <p>
          {address.province} {address.pincode}
        </p>
      </div>

      {!address.is_default && (
        <button
          onClick={handleSetDefault}
          className="mt-4 text-sm text-walnut hover:underline"
        >
          Set as default
        </button>
      )}
    </motion.div>
  );
}
