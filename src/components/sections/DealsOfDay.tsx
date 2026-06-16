'use client';

import { m } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55 } }
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55 } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const deals = [
  {
    id: 1,
    name: 'Recliner Chair Wood',
    category: 'Chair',
    price: 105,
    originalPrice: 150,
    discount: '30% off',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&q=80',
    description: 'Premium wooden recliner chair with ergonomic design and comfortable cushioning.'
  },
  {
    id: 2,
    name: 'Recliner Chair Steel',
    category: 'Chair',
    price: 80,
    originalPrice: 100,
    discount: '20% off',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80',
    description: 'Modern steel frame recliner with sleek design and durable construction.'
  },
  {
    id: 3,
    name: 'Office Chair',
    category: 'Chair',
    price: 120,
    originalPrice: 240,
    discount: '50% off',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=80',
    description: 'Ergonomic office chair with lumbar support and adjustable height.'
  }
];

export function DealsOfDay() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 pt-10 md:pt-14 pb-10 md:pb-16">
      {/* Section Header */}
      <div className="flex justify-between items-start flex-col md:flex-row gap-4">
        <m.div
          variants={slideLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-0.5 bg-[#D4A017]" />
            <span className="text-[#8A8A8A] text-xs md:text-sm">Today Deals</span>
          </div>

          {/* Heading */}
          <h2 className="font-black text-2xl md:text-3xl lg:text-4xl">
            Deals <span className="text-[#2D4A2D]">of the Day</span>
          </h2>
        </m.div>

        <m.p
          className="text-[#4A4A4A] text-xs md:text-sm leading-relaxed max-w-md"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.1 }}
        >
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolemque laudantium, totam rem aperiam.
        </m.p>
      </div>

      {/* Deals Cards Row - Horizontal scroll on mobile */}
      <m.div
        ref={ref}
        className="flex gap-4 md:gap-5 mt-6 md:mt-8 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 scroll-snap-type-x mandatory"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {deals.map((deal) => (
          <m.div
            key={deal.id}
            className="bg-white rounded-2xl p-4 md:p-5 w-[260px] sm:w-[300px] md:w-[320px] flex-shrink-0 border border-[#F0F0F0] cursor-pointer scroll-snap-align-start"
            variants={fadeUp}
            whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(0,0,0,0.1)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-3 md:gap-4">
              {/* Product Image */}
              <div className="relative w-[100px] sm:w-[120px] md:w-[140px] h-[120px] sm:h-[140px] md:h-[160px] flex-shrink-0">
                <m.img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-contain"
                  whileHover={{ scale: 1.08, rotate: -2 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Discount Badge */}
                <div className="absolute top-0 left-0 bg-[#2D4A2D] text-white text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                  {deal.discount}
                </div>
              </div>

              {/* Right Side */}
              <div className="flex-1">
                <p className="text-[#8A8A8A] text-xs">{deal.category}</p>
                <h3 className="font-bold text-sm md:text-base lg:text-lg text-[#1A1A1A] mt-1">{deal.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-sm md:text-base">${deal.price.toFixed(2)}</span>
                  <span className="text-xs md:text-sm line-through text-[#8A8A8A]">${deal.originalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-[#D4A017]">★</span>
                  <span className="font-semibold text-[#1A1A1A] text-xs md:text-sm">{deal.rating}</span>
                </div>
                <p className="text-[#4A4A4A] text-xs leading-relaxed mt-2 line-clamp-2 md:line-clamp-3">
                  {deal.description}
                </p>
                <m.button
                  className="text-[#1A1A1A] font-semibold text-xs md:text-sm underline underline-offset-4 mt-2 md:mt-3 inline-flex items-center gap-1 hover:text-[#2D4A2D] transition"
                  whileHover={{ x: 4 }}
                >
                  Shop Now
                  <m.span whileHover={{ x: 3 }}>→</m.span>
                </m.button>
              </div>
            </div>
          </m.div>
        ))}
      </m.div>

      {/* Promotional Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-6">
        {/* Banner 1 */}
        <m.div
          className="bg-[#F5F5F0] rounded-2xl p-5 md:p-8 relative overflow-hidden h-[200px] md:h-[280px]"
          variants={slideLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.15 }}
        >
          <div className="relative z-10">
            <p className="text-[#4A4A4A] text-xs md:text-sm">Flat 20% Discount</p>
            <h3 className="font-black text-xl md:text-3xl text-[#1A1A1A] mt-1 md:mt-2 leading-tight">
              Latest Gaming Chairs
            </h3>
            <p className="text-[#4A4A4A] text-xs md:text-sm mt-2 md:mt-3 max-w-[150px] md:max-w-[200px]">
              Premium gaming chairs for ultimate comfort
            </p>
            <m.button
              className="bg-[#2D4A2D] text-white rounded-full px-5 md:px-6 py-2 md:py-2.5 font-semibold text-xs md:text-sm mt-4 md:mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now →
            </m.button>
          </div>
          <m.img
            src="https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&q=80"
            alt="Gaming Chair"
            className="absolute right-0 bottom-0 h-[180px] md:h-[260px] object-contain"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          />
        </m.div>

        {/* Banner 2 */}
        <m.div
          className="bg-[#D4A017] rounded-2xl p-5 md:p-8 relative overflow-hidden h-[200px] md:h-[280px]"
          variants={slideRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
        >
          <div className="relative z-10">
            <p className="text-white/80 text-xs md:text-sm">Flat 15% Discount</p>
            <h3 className="font-black text-xl md:text-3xl text-white mt-1 md:mt-2 leading-tight">
              Wood Chair Collection
            </h3>
            <p className="text-white/70 text-xs md:text-sm mt-2 md:mt-3 max-w-[150px] md:max-w-[200px]">
              Handcrafted wooden chairs for your home
            </p>
            <m.button
              className="bg-[#2D4A2D] text-white rounded-full px-5 md:px-6 py-2 md:py-2.5 font-semibold text-xs md:text-sm mt-4 md:mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now →
            </m.button>
          </div>
          <m.img
            src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80"
            alt="Wood Chair"
            className="absolute right-0 bottom-0 h-[180px] md:h-[260px] object-contain"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.3 }}
          />
        </m.div>
      </div>
    </section>
  );
}
