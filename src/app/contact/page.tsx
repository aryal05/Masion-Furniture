import type { Metadata } from 'next';
import { ContactClient } from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our team. Visit our showroom, call us, or send a message. We respond within 24 hours.',
  openGraph: {
    title: 'Contact Us | Furniture',
    description: 'Get in touch with our team.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
