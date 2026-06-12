"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  description: string;
  material: string;
  dimensions?: string;
  careInstructions?: string;
}

const TABS = ["Description", "Specifications", "Care & Maintenance", "Shipping"];

export function InfoTabs({ description, material, dimensions, careInstructions }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  const tabContent = [
    // Description
    <div key="desc" className="prose prose-sm max-w-none text-muted">
      <p>{description}</p>
    </div>,

    // Specifications
    <div key="specs" className="space-y-3">
      <SpecRow label="Material" value={material} />
      {dimensions && <SpecRow label="Dimensions" value={dimensions} />}
      <SpecRow label="Assembly" value="Minimal assembly required" />
      <SpecRow label="Warranty" value="5-year structural warranty" />
    </div>,

    // Care
    <div key="care" className="prose prose-sm max-w-none text-muted">
      {careInstructions ? (
        <p>{careInstructions}</p>
      ) : (
        <ul>
          <li>Dust regularly with a soft, dry cloth</li>
          <li>Clean spills immediately with a damp cloth</li>
          <li>Avoid placing in direct sunlight to prevent fading</li>
          <li>Use coasters and placemats to protect the surface</li>
          <li>Apply furniture oil every 6-12 months for wood pieces</li>
        </ul>
      )}
    </div>,

    // Shipping
    <div key="shipping" className="space-y-4 text-sm text-muted">
      <p>
        We offer free standard shipping on orders over NPR 50,000 within the
        Kathmandu Valley. Express delivery and assembly services available.
      </p>
      <ul className="space-y-2">
        <li>• <strong>Standard Delivery:</strong> 3-5 business days</li>
        <li>• <strong>Express Delivery:</strong> 1-2 business days</li>
        <li>• <strong>Store Pickup:</strong> Same day available</li>
      </ul>
      <p>
        Large items may require white-glove delivery service. Our team will
        contact you to schedule delivery at your convenience.
      </p>
    </div>,
  ];

  return (
    <div className="border-t border-walnut/10 pt-10">
      {/* Tab buttons */}
      <div className="flex gap-8 border-b border-walnut/10">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`relative pb-4 text-sm transition-colors ${
              activeTab === i ? "text-charcoal font-medium" : "text-muted hover:text-charcoal"
            }`}
          >
            {tab}
            {activeTab === i && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-walnut"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="pt-6"
        >
          {tabContent[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-walnut/5 pb-3 text-sm">
      <span className="text-muted">{label}</span>
      <span>{value}</span>
    </div>
  );
}
