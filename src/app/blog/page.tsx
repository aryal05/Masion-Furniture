import type { Metadata } from 'next';
import { blogPosts, getFeaturedPost } from '@/lib/data/blogs';
import { BlogClient } from '@/components/blog/BlogClient';

export const metadata: Metadata = {
  title: 'Blog — Design Inspiration & Tips',
  description: 'Explore furniture trends, interior design tips, sustainability stories, and care guides from our team of experts.',
  openGraph: {
    title: 'Blog | Furniture',
    description: 'Explore furniture trends, interior design tips, and care guides.',
  },
};

export default function BlogPage() {
  const featured = getFeaturedPost();
  const posts = blogPosts.filter(p => !p.isFeatured);

  return <BlogClient featuredPost={featured || blogPosts[0]} posts={posts} />;
}
