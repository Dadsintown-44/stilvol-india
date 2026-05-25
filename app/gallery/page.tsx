import GallerySection from '../../components/gallery/GallerySection';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export const metadata = {
  title: 'Gallery | Stilvoll India India',
  description:
    "Browse the Stilvoll India India product gallery — aluminium profiles, wardrobe fittings, glass systems, door hardware and kitchen fittings, all captured in high resolution.",
};

export default function GalleryPage() {
  return (
    <>
      <Header alwaysGreen />
      <main>
        <GallerySection />
      </main>
      <Footer />
    </>
  );
}
