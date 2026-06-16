'use client';

import { m } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        <circle cx="12" cy="12" r="2" fill="#D4A017" />
      </svg>
    ),
    title: 'Free Shipping',
    description: 'Free shipping for order above $180'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        <circle cx="12" cy="12" r="2" fill="#D4A017" />
      </svg>
    ),
    title: 'Flexible Payment',
    description: 'Multiple secure payment options'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        <circle cx="12" cy="12" r="2" fill="#D4A017" />
      </svg>
    ),
    title: '24×7 Support',
    description: 'We support online all days.'
  }
];

export default function FeaturesAndCategories() {
  const router = useRouter();
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [categoriesRef, categoriesInView] = useInView({ triggerOnce: true, rootMargin: '-80px' });

  return (
    <>
      {/* Features Bar */}
      <div className="bg-white border-b border-[#E8E8E8] px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 py-6 md:py-8">
        <m.div
          ref={featuresRef}
          className="max-w-[1400px] 3xl:max-w-[1600px] mx-auto flex md:grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto scrollbar-hide"
          variants={staggerContainer}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <m.div
              key={feature.title}
              className="flex items-center gap-4 flex-shrink-0 md:flex-shrink w-[200px] md:w-auto"
              variants={fadeUp}
            >
              <div className="w-12 h-12 rounded-xl border border-[#E0E0E0] flex items-center justify-center text-[#2D4A2D]">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1A1A1A]">{feature.title}</h3>
                <p className="text-sm text-[#8A8A8A]">{feature.description}</p>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>

      {/* Category Showcase */}
      <div className="bg-[#F5F5F0] px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 py-8 md:py-12">
        <m.div
          ref={categoriesRef}
          className="max-w-[1400px] 3xl:max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 md:gap-5"
          initial="hidden"
          animate={categoriesInView ? "visible" : "hidden"}
        >
          {/* Left - Chairs Card (Large) */}
          <m.div
            className="relative bg-white rounded-2xl p-4 md:p-8 overflow-hidden min-h-[320px] md:min-h-[580px] border border-[#F0F0F0] shadow-sm cursor-pointer"
            initial={{ x: -50, opacity: 0 }}
            animate={categoriesInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{
              duration: 0.55,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{
              y: -4,
              boxShadow: '0 16px 48px rgba(0,0,0,0.09)',
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 25
              }
            }}
            onClick={() => router.push('/categories/chairs')}
          >
            {/* Text Content */}
            <div className="relative z-20 max-w-[55%] md:max-w-[220px]">
              {/* Badge */}
              <m.div
                className="inline-flex items-center gap-1 bg-white rounded-full px-3 py-1 md:px-4 md:py-1.5 shadow-sm border border-[#F0F0F0]"
                initial={{ scale: 0 }}
                animate={categoriesInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 20,
                  delay: 0.25
                }}
              >
                <span className="text-[#D4A017] font-bold text-sm md:text-base">1500+</span>
                <span className="text-[#1A1A1A] font-medium text-xs md:text-sm">Items</span>
              </m.div>

              {/* Heading */}
              <h2 className="font-black text-3xl md:text-5xl text-[#1A1A1A] mt-3 md:mt-5">Chairs</h2>

              {/* Description */}
              <p className="text-[#6A6A6A] text-xs md:text-sm mt-2 mb-3 md:mb-4 hidden md:block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>

              {/* Subcategory List - Horizontal chips on mobile, vertical on desktop */}
              <div className="md:space-y-2.5">
                <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide md:hidden">
                  {['Gaming', 'Lounge', 'Folding', 'Dining', 'Office', 'Armchair'].map((item, index) => (
                    <m.span
                      key={item}
                      className="bg-[#F5F5F0] rounded-full px-3 py-1.5 text-xs flex-shrink-0 text-[#3A3A3A] font-medium cursor-pointer"
                      whileHover={{ scale: 1.05, backgroundColor: '#E8E8E8' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={categoriesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.2, delay: 0.05 * index }}
                    >
                      {item}
                    </m.span>
                  ))}
                </div>
                {['Gaming Chair', 'Lounge Chair', 'Folding Chair', 'Dining Chair', 'Office Chair', 'Armchair', 'Bar Stool', 'Club Chair'].map((item, index) => (
                  <m.div
                    key={item}
                    className="text-[#3A3A3A] text-sm font-medium cursor-pointer hidden md:block"
                    whileHover={{ x: 6, color: '#2D4A2D' }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={categoriesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, delay: 0.05 * index }}
                  >
                    {item}
                  </m.div>
                ))}
              </div>
            </div>

            {/* Product Image */}
            <m.img
              src="https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80"
              alt="Chair"
              className="absolute right-0 bottom-0 h-[260px] md:h-[460px] object-contain z-10 pointer-events-none"
              style={{ filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.12))' }}
              initial={{ y: 20, opacity: 0 }}
              animate={categoriesInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -6, transition: { duration: 0.35 } }}
            />
          </m.div>

          {/* Right Column - Stacked Cards */}
          <div className="flex flex-col gap-4 md:gap-5 grid grid-cols-2 lg:grid-cols-1">
            {/* Sofa Card */}
            <m.div
              className="relative bg-white rounded-2xl p-4 md:p-6 overflow-hidden flex-1 border border-[#F0F0F0] shadow-sm cursor-pointer min-h-[200px] md:min-h-auto"
              initial={{ x: 50, opacity: 0 }}
              animate={categoriesInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.55, delay: 0 }}
              whileHover={{
                y: -4,
                boxShadow: '0 16px 48px rgba(0,0,0,0.09)',
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 25
                }
              }}
              onClick={() => router.push('/categories/sofa')}
            >
              {/* Text Content */}
              <div className="relative z-20 max-w-[180px]">
                {/* Badge */}
                <m.div
                  className="inline-flex items-center gap-1 bg-white rounded-full px-3 py-1 md:px-4 md:py-1.5 shadow-sm border border-[#F0F0F0]"
                  initial={{ scale: 0 }}
                  animate={categoriesInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 20,
                    delay: 0.25
                  }}
                >
                  <span className="text-[#D4A017] font-bold text-sm md:text-base">750+</span>
                  <span className="text-[#1A1A1A] font-medium text-xs md:text-sm">Items</span>
                </m.div>

                {/* Heading */}
                <h2 className="font-black text-2xl md:text-3xl text-[#1A1A1A] mt-2 md:mt-3">Sofa</h2>

                {/* Subcategory List - Show only 2 on mobile */}
                <div className="space-y-2 mt-2 md:mt-3">
                  {['Reception Sofa', 'Sectional Sofa'].map((item, index) => (
                    <m.div
                      key={item}
                      className="text-[#3A3A3A] text-xs md:text-sm font-medium cursor-pointer"
                      whileHover={{ x: 6, color: '#2D4A2D' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={categoriesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.2, delay: 0.05 * index }}
                    >
                      {item}
                    </m.div>
                  ))}
                  <span className="text-[#8A8A8A] text-xs md:text-sm cursor-pointer hover:text-[#2D4A2D]">+ more</span>
                </div>
              </div>

              {/* Product Image */}
              <m.img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80&fit=crop&crop=right"
                alt="Sofa"
                className="absolute right-2 bottom-0 h-[140px] md:h-[185px] object-contain z-10 pointer-events-none"
                style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.10))' }}
                initial={{ y: 20, opacity: 0 }}
                animate={categoriesInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -6, transition: { duration: 0.35 } }}
              />
            </m.div>

            {/* Lighting Card */}
            <m.div
              className="relative bg-white rounded-2xl p-4 md:p-6 overflow-hidden flex-1 border border-[#F0F0F0] shadow-sm cursor-pointer min-h-[200px] md:min-h-auto"
              initial={{ x: 50, opacity: 0 }}
              animate={categoriesInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              whileHover={{
                y: -4,
                boxShadow: '0 16px 48px rgba(0,0,0,0.09)',
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 25
                }
              }}
              onClick={() => router.push('/categories/lighting')}
            >
              {/* Text Content */}
              <div className="relative z-20 max-w-[180px]">
                {/* Badge */}
                <m.div
                  className="inline-flex items-center gap-1 bg-white rounded-full px-3 py-1 md:px-4 md:py-1.5 shadow-sm border border-[#F0F0F0]"
                  initial={{ scale: 0 }}
                  animate={categoriesInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 20,
                    delay: 0.25
                  }}
                >
                  <span className="text-[#D4A017] font-bold text-sm md:text-base">450+</span>
                  <span className="text-[#1A1A1A] font-medium text-xs md:text-sm">Items</span>
                </m.div>

                {/* Heading */}
                <h2 className="font-black text-2xl md:text-3xl text-[#1A1A1A] mt-2 md:mt-3">Lighting</h2>

                {/* Subcategory List - Show only 2 on mobile */}
                <div className="space-y-2 mt-2 md:mt-3">
                  {['Table Lights', 'Floor Lights'].map((item, index) => (
                    <m.div
                      key={item}
                      className="text-[#3A3A3A] text-xs md:text-sm font-medium cursor-pointer"
                      whileHover={{ x: 6, color: '#2D4A2D' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={categoriesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.2, delay: 0.05 * index }}
                    >
                      {item}
                    </m.div>
                  ))}
                  <span className="text-[#8A8A8A] text-xs md:text-sm cursor-pointer hover:text-[#2D4A2D]">+ more</span>
                </div>
              </div>

              {/* Product Image */}
              <m.img
                src="https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&q=80"
                alt="Lighting"
                className="absolute right-2 bottom-0 h-[140px] md:h-[185px] object-contain z-10 pointer-events-none"
                style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.10))' }}
                initial={{ y: 20, opacity: 0 }}
                animate={categoriesInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -6, transition: { duration: 0.35 } }}
              />
            </m.div>
          </div>
        </m.div>
      </div>
    </>
  );
}
