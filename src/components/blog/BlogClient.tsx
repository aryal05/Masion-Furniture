'use client';

import { useState, useMemo } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer, scaleIn, durations, easeOut } from '@/lib/motion';
import { BlogCard } from './BlogCard';
import { FeaturedBlogPost } from './FeaturedBlogPost';
import type { BlogPost } from '@/types';

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Interior Design', value: 'interior-design' },
  { label: 'Sustainability', value: 'sustainability' },
  { label: 'Trends', value: 'trends' },
  { label: 'Care Tips', value: 'care-tips' },
] as const;

interface BlogClientProps {
  featuredPost: BlogPost;
  posts: BlogPost[];
}

export function BlogClient({ featuredPost, posts }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const shouldReduceMotion = useReducedMotion();

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return posts;
    return posts.filter(p => p.category === activeCategory);
  }, [posts, activeCategory]);

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
              Our Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Design <span className="text-gold">Inspiration</span>
              <br />& Expert Tips
            </h1>
            <p className="mt-4 text-white/70 text-lg max-w-lg leading-relaxed">
              Furniture trends, interior design guides, sustainability stories, and care tips from our team.
            </p>
          </m.div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gold/10 rounded-full translate-y-1/2" />
        </div>
      </section>

      {/* Featured Post */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-12 lg:py-16">
        <h2 className="text-xs uppercase tracking-widest text-gold font-medium mb-6">Featured Article</h2>
        <FeaturedBlogPost post={featuredPost} />
      </section>

      {/* Category Tabs + Grid */}
      <section aria-labelledby="recent-posts" className="bg-card py-12 lg:py-16 border-t border-line">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 id="recent-posts" className="text-2xl lg:text-3xl font-black text-ink tracking-tight">
              Recent Articles
            </h2>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2" role="tablist">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  role="tab"
                  aria-selected={activeCategory === cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    activeCategory === cat.value
                      ? 'bg-primary text-white border-primary'
                      : 'bg-card text-body border-line hover:border-primary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Posts grid */}
          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-muted">No articles in this category yet.</p>
            </div>
          ) : (
            <m.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={shouldReduceMotion ? undefined : staggerContainer(0.08)}
              initial={shouldReduceMotion ? undefined : 'hidden'}
              animate={shouldReduceMotion ? undefined : 'visible'}
              key={activeCategory}
            >
              {filteredPosts.map((post) => (
                <m.div key={post.id} variants={shouldReduceMotion ? undefined : scaleIn}>
                  <BlogCard post={post} />
                </m.div>
              ))}
            </m.div>
          )}
        </div>
      </section>
    </>
  );
}
