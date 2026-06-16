'use client';

import { m, useReducedMotion } from 'framer-motion';
import { durations, easeOut } from '@/lib/motion';
import type { BlogPost } from '@/types';

const CATEGORY_LABELS: Record<string, string> = {
  'interior-design': 'Interior Design',
  'sustainability': 'Sustainability',
  'trends': 'Trends',
  'care-tips': 'Care Tips',
};

interface FeaturedBlogPostProps {
  post: BlogPost;
}

export function FeaturedBlogPost({ post }: FeaturedBlogPostProps) {
  const shouldReduceMotion = useReducedMotion();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <m.article
      className="group relative rounded-3xl overflow-hidden bg-surface"
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: durations.slow, ease: easeOut }}
    >
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image */}
        <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <span className="inline-block w-fit px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
            {CATEGORY_LABELS[post.category] || post.category}
          </span>

          <h3 className="text-2xl lg:text-3xl font-black text-ink tracking-tight leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-body mt-4 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author + meta */}
          <div className="flex items-center gap-3 mt-6">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-line"
            />
            <div>
              <p className="text-sm font-semibold text-ink">{post.author.name}</p>
              <p className="text-xs text-muted">{formattedDate} · {post.readTime} min read</p>
            </div>
          </div>

          <div className="mt-8">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
              Read Article
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </m.article>
  );
}
