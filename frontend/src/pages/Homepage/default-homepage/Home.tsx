import HeroSection from "./heroSection-homepage-without-login";
import EsportsTestimonials from "./ad-homepage-without-login"
import PromoSection from "./advertisement-without-login"
export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden">
      <HeroSection />
      <EsportsTestimonials />
      <PromoSection />
    </div>
  );
}
