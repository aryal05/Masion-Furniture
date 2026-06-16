'use client';

import { m, useReducedMotion } from 'framer-motion';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

const CATEGORY_LABELS: Record<string, string> = {
  'interior-design': 'Interior Design',
  'sustainability': 'Sustainability',
  'trends': 'Trends',
  'care-tips': 'Care Tips',
};

export function BlogCard({ post }: BlogCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="group bg-card rounded-2xl border border-line overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden bg-surface">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category badge */}
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
          {CATEGORY_LABELS[post.category] || post.category}
        </span>

        <h3 className="text-lg font-bold text-ink leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-body mt-2 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full object-cover"
              loading="lazy"
            />
            <span className="text-xs text-muted font-medium">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>
    </article>
  );
}
