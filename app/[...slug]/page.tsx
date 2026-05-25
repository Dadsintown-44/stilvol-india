import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProductsSection from '../../components/products/ProductsSection';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export const metadata = {
  title: 'Products | Stilvoll India India',
  description:
    "Browse Stilvoll India India's full catalogue.",
};

export default async function CatchAllCategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  
  // If the route doesn't start with 'category=', it should be a 404
  const decodedFirstSegment = decodeURIComponent(resolvedParams.slug?.[0] || '');
  if (!decodedFirstSegment.startsWith('category=')) {
    notFound();
  }

  return (
    <>
      <Header alwaysGreen />
      <main>
        <Suspense fallback={null}>
          <ProductsSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
