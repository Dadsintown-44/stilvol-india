import AboutSection from '../../components/about/AboutSection';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export const metadata = {
  title: 'About Us | Stilvoll India',
  description:
    'Learn about Stilvoll India — premium aluminium wardrobe systems, partition profiles, and modern interior hardware for elegant, efficient spaces.',
};

export default function AboutPage() {
  return (
    <>
      <Header alwaysGreen />
      <main>
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
