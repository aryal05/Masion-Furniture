import { Hero } from "@/components/home/Hero";
import { CollectionsGrid } from "@/components/home/CollectionsGrid";
import { BestSellersCarousel } from "@/components/home/BestSellersCarousel";
import { PhilosophySplit } from "@/components/home/PhilosophySplit";
import { StatsCounter } from "@/components/home/StatsCounter";
import { UgcGallery } from "@/components/home/UgcGallery";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export const revalidate = 300; // ISR: revalidate every 5 minutes

export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionsGrid />
      <BestSellersCarousel />
      <PhilosophySplit />
      <StatsCounter />
      <UgcGallery />
      <NewsletterSection />
    </>
  );
}
