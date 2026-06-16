import { FAQ } from '@/types';

export const faqs: FAQ[] = [
  {
    id: 'faq-001',
    question: 'What is your shipping policy?',
    answer: 'We offer free shipping on all orders over $180. Standard shipping takes 5-7 business days, while express shipping (2-3 business days) is available for an additional fee. All furniture is carefully packaged and insured during transit.',
    category: 'shipping'
  },
  {
    id: 'faq-002',
    question: 'Do you ship internationally?',
    answer: 'Currently, we ship within the continental United States. We are working on expanding our shipping capabilities to Canada and Europe in the near future. Sign up for our newsletter to be notified when international shipping becomes available.',
    category: 'shipping'
  },
  {
    id: 'faq-003',
    question: 'How is furniture delivered?',
    answer: 'Most items are delivered via curbside delivery. For larger furniture pieces, we offer white-glove delivery service which includes in-home placement and assembly. You can select your preferred delivery method at checkout.',
    category: 'shipping'
  },
  {
    id: 'faq-004',
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of delivery for most items. Furniture must be in original condition and packaging. Return shipping costs are the responsibility of the customer unless the item arrived damaged or defective. Custom orders are final sale.',
    category: 'returns'
  },
  {
    id: 'faq-005',
    question: 'How do I initiate a return?',
    answer: 'To initiate a return, log into your account and select the order you wish to return. Follow the prompts to print a return label and schedule pickup. Our customer service team is also available 24/7 to assist with returns.',
    category: 'returns'
  },
  {
    id: 'faq-006',
    question: 'Can I exchange an item for a different color or size?',
    answer: 'Yes, exchanges are allowed within 30 days if the desired item is in stock. You will be responsible for any price difference and return shipping costs. Contact our customer service team to process an exchange.',
    category: 'returns'
  },
  {
    id: 'faq-007',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. For larger purchases, we also offer financing through Affirm with 0% APR for qualified buyers.',
    category: 'payment'
  },
  {
    id: 'faq-008',
    question: 'Is my payment information secure?',
    answer: 'Absolutely. We use industry-standard SSL encryption to protect your payment information. We never store your full credit card number on our servers. All transactions are processed through PCI-compliant payment gateways.',
    category: 'payment'
  },
  {
    id: 'faq-009',
    question: 'Do you charge sales tax?',
    answer: 'Sales tax is collected in states where we have a physical presence or are required by law. The exact tax amount will be calculated at checkout based on your shipping address.',
    category: 'payment'
  },
  {
    id: 'faq-010',
    question: 'How do I track my order?',
    answer: 'Once your order ships, you will receive an email with tracking information. You can also track your order by logging into your account and viewing your order history. Our customer service team can provide updates at any time.',
    category: 'general'
  },
  {
    id: 'faq-011',
    question: 'Do you offer assembly services?',
    answer: 'Yes, we offer assembly services in select metropolitan areas. During checkout, you can add assembly service to your order. Our professional assemblers will deliver, assemble, and place your furniture, then remove all packaging materials.',
    category: 'general'
  },
  {
    id: 'faq-012',
    question: 'Are your products sustainable?',
    answer: 'Sustainability is at the core of our business. We source wood from FSC-certified forests, use water-based finishes, and partner with manufacturers who meet strict environmental standards. Learn more about our sustainability initiatives on our About page.',
    category: 'general'
  },
  {
    id: 'faq-013',
    question: 'Do you offer warranties on your furniture?',
    answer: 'Yes, all our furniture comes with a manufacturer warranty ranging from 1-5 years depending on the product. Structural defects are covered for the full warranty period. Extended warranty options are available at checkout.',
    category: 'general'
  },
  {
    id: 'faq-014',
    question: 'Can I cancel my order after placing it?',
    answer: 'Orders can be cancelled within 24 hours of placement if the item has not yet shipped. After 24 hours or once the order has shipped, our return policy applies. Contact customer service immediately if you need to cancel an order.',
    category: 'general'
  },
  {
    id: 'faq-015',
    question: 'Do you offer price matching?',
    answer: 'We offer price matching on identical items from authorized retailers within 7 days of purchase. The competitor must be an authorized dealer and the item must be in stock. Contact our customer service team with proof of the lower price.',
    category: 'general'
  }
];

// Helper function to get FAQs by category
export function getFAQsByCategory(category: FAQ['category']): FAQ[] {
  return faqs.filter(f => f.category === category);
}

// Helper function to get all FAQs
export function getAllFAQs(): FAQ[] {
  return faqs;
}
