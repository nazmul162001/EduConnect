import { Hero } from "@/components/home/Hero";
import {
  CallToAction,
  FeaturedColleges,
  Gallery,
  KeyFeatures,
  ResearchLinks,
  Reviews,
  Statistics,
  SuccessStories,
} from "@/components/home/Sections";
import { SlideUp } from "@/components/motion/MotionPrimitives";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: `radial-gradient(
        1200px 600px at 10% 10%,
        rgba(99, 102, 241, 0.15),
        transparent
      ),
      radial-gradient(
        1000px 600px at 90% 20%,
        rgba(6, 182, 212, 0.15),
        transparent
      ),
      var(--background)`,
      }}
    >
      <Hero />
      <div id="featured">
        <SlideUp>
          <FeaturedColleges />
        </SlideUp>
      </div>
      <Statistics />
      <KeyFeatures />
      <Gallery />
      <ResearchLinks />
      <SuccessStories />
      <Reviews />
      <CallToAction />
    </div>
  );
}
