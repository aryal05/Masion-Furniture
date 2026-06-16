'use client';

import { m } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
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
    transition: { staggerChildren: 0.15 }
  }
};

export function CategoryShowcase() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <m.section
      ref={ref}
      className="bg-bg-main px-4 md:px-16 py-12"
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[60%_40%] gap-5">
        {/* Large Card - Chairs */}
        <m.div
          className="bg-white rounded-2xl p-8 relative overflow-hidden min-h-[580px]"
          variants={slideLeft}
          whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
          transition={{ duration: 0.3 }}
        >
          {/* Badge */}
          <m.div
            className="absolute top-4 left-4 bg-white rounded-full px-4 py-1.5 shadow-sm"
            variants={scaleIn}
            transition={{ delay: 0.2 }}
          >
            <span className="text-accent font-bold">1500+</span>
            <span className="text-text-dark"> Items</span>
          </m.div>

          {/* Heading */}
          <h2 className="font-black text-5xl text-text-dark mt-6">Chairs</h2>

          {/* Description */}
          <p className="text-text-body text-sm mt-2 mb-6 max-w-[180px]">
            Discover our premium collection of chairs for every room
          </p>

          {/* Subcategory List */}
          <div className="space-y-2">
            {['Gaming Chair', 'Lounge Chair', 'Folding Chair', 'Dining Chair', 'Office Chair', 'Armchair', 'Bar Stool', 'Club Chair'].map((item, index) => (
              <m.div
                key={item}
                className="text-text-body text-sm font-medium cursor-pointer"
                whileHover={{ x: 6, color: '#2D4A2D' }}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: 0.3 + index * 0.06 }}
              >
                {item}
              </m.div>
            ))}
          </div>

          {/* Product Image */}
          <m.img
            src="https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80"
            alt="Chair"
            className="absolute right-0 bottom-0 h-[420px] object-contain"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.04, y: -8 }}
          />
        </m.div>

        {/* Right Column - Stacked Cards */}
        <div className="flex flex-col gap-5">
          {/* Small Card - Sofa */}
          <m.div
            className="bg-white rounded-2xl p-6 relative overflow-hidden h-[260px]"
            variants={slideRight}
            whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
            transition={{ duration: 0.3 }}
          >
            {/* Badge */}
            <m.div
              className="absolute top-4 left-4 bg-white rounded-full px-4 py-1.5 shadow-sm"
              variants={scaleIn}
              transition={{ delay: 0.2 }}
            >
              <span className="text-accent font-bold">750+</span>
              <span className="text-text-dark"> Items</span>
            </m.div>

            {/* Heading */}
            <h2 className="font-black text-3xl text-text-dark">Sofa</h2>

            {/* Subcategory List */}
            <div className="space-y-1.5 mt-2">
              {['Reception Sofa', 'Sectional Sofa', 'Armless Sofa', 'Curved Sofa'].map((item, index) => (
                <m.div
                  key={item}
                  className="text-text-body text-sm font-medium cursor-pointer"
                  whileHover={{ x: 6, color: '#2D4A2D' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, delay: 0.3 + index * 0.06 }}
                >
                  {item}
                </m.div>
              ))}
            </div>

            {/* Product Image */}
            <m.img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"
              alt="Sofa"
              className="absolute right-4 bottom-0 h-[180px] object-contain"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ scale: 1.04, y: -8 }}
            />
          </m.div>

          {/* Small Card - Lighting */}
          <m.div
            className="bg-white rounded-2xl p-6 relative overflow-hidden h-[260px]"
            variants={slideRight}
            whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
            transition={{ duration: 0.3 }}
          >
            {/* Badge */}
            <m.div
              className="absolute top-4 left-4 bg-white rounded-full px-4 py-1.5 shadow-sm"
              variants={scaleIn}
              transition={{ delay: 0.35 }}
            >
              <span className="text-accent font-bold">450+</span>
              <span className="text-text-dark"> Items</span>
            </m.div>

            {/* Heading */}
            <h2 className="font-black text-3xl text-text-dark">Lighting</h2>

            {/* Subcategory List */}
            <div className="space-y-1.5 mt-2">
              {['Table Lights', 'Floor Lights', 'Ceiling Lights', 'Wall Lights'].map((item, index) => (
                <m.div
                  key={item}
                  className="text-text-body text-sm font-medium cursor-pointer"
                  whileHover={{ x: 6, color: '#2D4A2D' }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, delay: 0.45 + index * 0.06 }}
                >
                  {item}
                </m.div>
              ))}
            </div>

            {/* Product Image */}
            <m.img
              src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&q=80"
              alt="Lighting"
              className="absolute right-4 bottom-0 h-[180px] object-contain"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              whileHover={{ scale: 1.04, y: -8 }}
            />
          </m.div>
        </div>
      </div>
    </m.section>
  );
}
