"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCheckout } from "@/stores/checkout";
import { supabase } from "@/lib/supabase/client";

const METHODS = [
  { id: "cod", label: "Cash on Delivery", note: "No extra charge" },
  { id: "esewa", label: "eSewa", note: "Redirects to eSewa secure page" },
  { id: "khalti", label: "Khalti", note: "Pay via Khalti wallet or bank" },
  { id: "bank_transfer", label: "Bank Transfer", note: "Upload payment slip" },
] as const;

export function StepPayment() {
  const { setPayment, goTo } = useCheckout();
  const [selected, setSelected] = useState<string | null>(null);
  const [slipPath, setSlipPath] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "application/pdf": [] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    onDrop: async ([file]) => {
      if (!file) return;
      setUploading(true); setError(null);
      const path = `slips/${crypto.randomUUID()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("payment-slips").upload(path, file);
      setUploading(false);
      if (upErr) setError("Upload failed — please try again.");
      else setSlipPath(path);
    },
  });

  const handleContinue = () => {
    if (!selected) return setError("Please select a payment method.");
    if (selected === "bank_transfer") {
      if (!slipPath) return setError("Please upload your payment slip.");
      setPayment({ method: "bank_transfer", slipPath });
    } else {
      setPayment({ method: selected as "cod" | "esewa" | "khalti" });
    }
  };

  return (
    <section>
      <h2 className="font-display text-2xl mb-6">Payment Method</h2>
      <div className="space-y-3">
        {METHODS.map((m) => (
          <div key={m.id}>
            <button
              onClick={() => { setSelected(m.id); setError(null); }}
              aria-pressed={selected === m.id}
              className={`flex w-full items-center justify-between rounded-card border bg-white p-5 text-left transition-all ${
                selected === m.id ? "border-walnut shadow-warm" : "border-walnut/15 hover:border-walnut/40"
              }`}
            >
              <div>
                <p className="font-medium">{m.label}</p>
                <p className="mt-0.5 text-sm text-muted">{m.note}</p>
              </div>
              <span className={`h-5 w-5 rounded-full border-2 ${selected === m.id ? "border-walnut bg-walnut" : "border-walnut/30"}`} />
            </button>

            {/* Bank transfer details + slip upload */}
            {m.id === "bank_transfer" && selected === "bank_transfer" && (
              <div className="mt-3 rounded-card border border-walnut/10 bg-ivory p-5 text-sm">
                <p className="font-medium mb-2">Transfer to:</p>
                <table className="text-muted">
                  <tbody>
                    <tr><td className="pr-4 py-0.5">Bank</td><td>NIC Asia Bank</td></tr>
                    <tr><td className="pr-4 py-0.5">Account Name</td><td>Maison Furniture Pvt. Ltd.</td></tr>
                    <tr><td className="pr-4 py-0.5">Account No.</td><td>0123456789012</td></tr>
                    <tr><td className="pr-4 py-0.5">Branch</td><td>Durbar Marg, Kathmandu</td></tr>
                  </tbody>
                </table>
                <div
                  {...getRootProps()}
                  className={`mt-4 grid cursor-pointer place-items-center rounded-card border-2 border-dashed p-8 text-center transition-colors ${
                    isDragActive ? "border-walnut bg-walnut/5" : "border-walnut/20"
                  }`}
                >
                  <input {...getInputProps()} />
                  {uploading ? <p>Uploading…</p>
                    : slipPath ? <p className="text-sage">✓ Slip uploaded</p>
                    : <p className="text-muted">Drag & drop payment slip here, or click to browse<br /><span className="text-xs">JPEG, PNG or PDF — max 5MB</span></p>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {error && <p role="alert" className="mt-4 text-sm text-rose">{error}</p>}

      {/* Trust row for digital payments */}
      <p className="mt-6 flex items-center gap-2 text-xs text-muted">
        🔒 256-bit SSL encrypted · Payments verified server-side
      </p>

      <div className="mt-8 flex items-center gap-6">
        <button onClick={() => goTo(2)} className="text-sm text-muted underline underline-offset-4">← Back</button>
        <button onClick={handleContinue} className="rounded-btn bg-walnut px-12 py-4 text-sm uppercase tracking-label text-ivory transition-transform hover:-translate-y-0.5">
          Review Order
        </button>
      </div>
    </section>
  );
}