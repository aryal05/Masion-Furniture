'use client';

import { m, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { durations, easeOut } from '@/lib/motion';
import { ContactForm } from './ContactForm';
import { StoreHours } from './StoreHours';
import { MapBlock } from './MapBlock';
import { FaqAccordion } from './FaqAccordion';
import { supabase } from '@/lib/supabase/client';
import type { DbFaq } from '@/types/database';

export function ContactClient() {
  const shouldReduceMotion = useReducedMotion();
  const [faqs, setFaqs] = useState<DbFaq[]>([]);

  useEffect(() => {
    async function fetchFaqs() {
      const { data } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (data) {
        setFaqs(data as DbFaq[]);
      }
    }
    fetchFaqs();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-16 lg:py-24">
          <m.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: durations.slow, ease: easeOut }}
            className="relative z-10 max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-xs text-white/80 uppercase tracking-widest font-medium mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Contact <span className="text-gold">Us</span>
            </h1>
            <p className="mt-4 text-white/70 text-lg max-w-lg leading-relaxed">
              Have a question about a product, need design advice, or want to visit our showroom? We&apos;d love to hear from you.
            </p>
          </m.div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
        </div>
      </section>

      {/* Contact Form + Info */}
      <section aria-labelledby="contact-form-heading" className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 id="contact-form-heading" className="text-2xl font-bold text-ink mb-8">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2 space-y-8">
              <MapBlock />
              <StoreHours />
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section aria-labelledby="faq-heading" id="faq" className="bg-card py-16 lg:py-24 border-t border-line">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-gold font-medium">Need Help?</span>
              <h2 id="faq-heading" className="text-3xl lg:text-4xl font-black text-ink tracking-tight mt-2">
                Frequently Asked Questions
              </h2>
            </div>
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
