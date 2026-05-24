import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturedProductsSection from '../components/home/FeaturedProductsSection';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />
      <HeroSection />
      <FeaturedProductsSection />
      <Footer />
    </main>
  );
}
