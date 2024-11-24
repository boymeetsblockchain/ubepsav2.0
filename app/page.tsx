import { AboutSection } from "@/components/homepage/about";
import { HeroSection } from "@/components/homepage/hero";
import { Lecturers } from "@/components/homepage/lecturer";
import { PostPreview } from "@/components/homepage/post";

function HomePage() {
  return (
    <div>
      <HeroSection />
      <PostPreview />
      <AboutSection />
      <Lecturers />
    </div>
  );
}
export default HomePage;
