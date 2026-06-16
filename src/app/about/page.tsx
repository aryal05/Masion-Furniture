import type { Metadata } from 'next';
import { getTeamMembers, getMilestones, getSiteSettings } from '@/lib/supabase/queries';
import { AboutHero } from '@/components/about/AboutHero';
import { StatsCounter } from '@/components/about/StatsCounter';
import { ValueCard } from '@/components/about/ValueCard';
import { Timeline } from '@/components/about/Timeline';
import { TeamCard } from '@/components/about/TeamCard';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our mission to craft sustainable, handmade furniture. Meet our team, explore our story, and discover our values.',
  openGraph: {
    title: 'About Us | Furniture',
    description: 'Learn about our mission to craft sustainable, handmade furniture.',
  },
};

const VALUES = [
  {
    icon: '🌿',
    title: 'Sustainability First',
    description: 'Every piece uses FSC-certified wood, water-based finishes, and eco-friendly packaging. Carbon neutral since 2023.',
  },
  {
    icon: '🪵',
    title: 'Handcrafted Quality',
    description: 'Our artisans bring 30+ years of experience to every joint, finish, and detail. No shortcuts, no compromises.',
  },
  {
    icon: '🏠',
    title: 'Designed to Last',
    description: 'Built for generations, not seasons. Our furniture comes with up to 5-year structural warranties.',
  },
  {
    icon: '🤝',
    title: 'Fair & Ethical',
    description: 'Fair wages, safe workshops, and transparent supply chains from forest to doorstep.',
  },
];

const STATS = [
  { value: 10, suffix: '+', label: 'Years in Business' },
  { value: 50, suffix: 'K+', label: 'Happy Customers' },
  { value: 200, suffix: '+', label: 'Unique Designs' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

export default async function AboutPage() {
  const [teamMembers, milestones] = await Promise.all([
    getTeamMembers(),
    getMilestones(),
  ]);

  // Transform DB types to component types
  const transformedTeam = teamMembers.map(m => ({
    id: m.id,
    name: m.name,
    role: m.role,
    bio: m.bio ?? '',
    image: m.image_url ?? '',
    linkedin: m.linkedin_url ?? undefined,
    twitter: m.twitter_url ?? undefined,
  }));

  const transformedMilestones = milestones.map(m => ({
    id: m.id,
    year: m.year,
    title: m.title,
    description: m.description ?? '',
  }));

  return (
    <>
      <AboutHero />

      {/* Stats Section */}
      <section aria-labelledby="stats-heading" className="bg-card py-12 lg:py-16 border-b border-line">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <h2 id="stats-heading" className="sr-only">Our Numbers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <StatsCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section aria-labelledby="values-heading" className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-gold font-medium">What We Stand For</span>
            <h2 id="values-heading" className="text-3xl lg:text-4xl font-black text-ink tracking-tight mt-2">
              Our Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, index) => (
              <ValueCard key={value.title} {...value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section aria-labelledby="timeline-heading" className="bg-card py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-gold font-medium">Our Journey</span>
            <h2 id="timeline-heading" className="text-3xl lg:text-4xl font-black text-ink tracking-tight mt-2">
              Milestones
            </h2>
          </div>
          <Timeline milestones={transformedMilestones} />
        </div>
      </section>

      {/* Team Section */}
      <section aria-labelledby="team-heading" className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-gold font-medium">The People Behind The Craft</span>
            <h2 id="team-heading" className="text-3xl lg:text-4xl font-black text-ink tracking-tight mt-2">
              Meet Our Team
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {transformedTeam.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
