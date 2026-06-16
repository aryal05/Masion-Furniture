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
    transition: { staggerChildren: 0.12 }
  }
};

const blogs = [
  {
    id: 1,
    title: 'Furniture Trends 2024: What\'s Hot and What\'s Not',
    date: '15 April 2024',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Choosing the Perfect Sofa',
    date: '14 April 2024',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
  },
  {
    id: 3,
    title: 'Choosing the Right Dining Table for Your Lifestyle',
    date: '12 April 2024',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'
  }
];

export function NewsBlog() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '-80px' });

  return (
    <section className="px-4 md:px-16 pt-14 pb-16">
      {/* Section Header */}
      <div className="flex justify-between items-end flex-col md:flex-row gap-4">
        <m.div
          variants={slideLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-2">
            <m.div
              className="w-8 h-0.5 bg-accent"
              initial={{ width: 0 }}
              animate={inView ? { width: 32 } : { width: 0 }}
              transition={{ delay: 0.1 }}
            />
            <span className="text-text-muted text-sm">News & Blogs</span>
          </div>

          {/* Heading */}
          <h2 className="font-black text-4xl text-text-dark">
            Our Latest
          </h2>
          <h2 className="font-black text-4xl text-primary">
            News & Blogs
          </h2>
        </m.div>

        <m.button
          className="bg-primary text-white rounded-full px-6 py-3 font-semibold text-sm self-center md:self-end mb-2"
          variants={slideRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.15 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Blogs
        </m.button>
      </div>

      {/* Blog Cards Grid */}
      <m.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {blogs.map((blog, index) => (
          <m.div
            key={blog.id}
            className="bg-white cursor-pointer group"
            variants={fadeUp}
            transition={{ delay: 0.2 + index * 0.12 }}
          >
            {/* Image Area */}
            <div className="relative rounded-2xl overflow-hidden h-[260px]">
              <m.img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover rounded-2xl"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />

              {/* Date Badge */}
              <m.div
                className="absolute bottom-4 left-4 bg-accent text-white font-semibold text-sm px-4 py-1.5 rounded-full"
                variants={scaleIn}
                transition={{ delay: 0.2 }}
              >
                {blog.date}
              </m.div>
            </div>

            {/* Content */}
            <div className="pt-4">
              <h3 className="font-bold text-lg text-text-dark leading-snug group-hover:text-primary transition-colors">
                {blog.title}
              </h3>
              <p className="text-text-body text-sm leading-relaxed mt-2 line-clamp-2">
                {blog.description}
              </p>
              <m.button
                className="text-text-dark font-semibold text-sm underline underline-offset-4 mt-3 inline-flex items-center gap-1 hover:text-primary transition"
                whileHover={{ gap: 2 }}
              >
                Read More
                <m.span whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                  →
                </m.span>
              </m.button>
            </div>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
