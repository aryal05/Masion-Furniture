import HeroSection from '@/components/sections/HeroSection';
import FeaturesAndCategories from '@/components/sections/FeaturesAndCategories';
import { DynamicProductsCollection } from '@/components/sections/DynamicProductsCollection';
import { FlashSale } from '@/components/sections/FlashSale';
import { DealsOfDay } from '@/components/sections/DealsOfDay';
import { NewsBlog } from '@/components/sections/NewsBlog';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesAndCategories />
      <DynamicProductsCollection />
      <FlashSale />
      <DealsOfDay />
      <NewsBlog />
    </div>
  );
}
