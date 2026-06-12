import { products, getProductBySlug } from '@/lib/data/products';
import { notFound } from 'next/navigation';
import ProductClient from '@/components/ProductClient';
import TopNavBar from '@/components/TopNavBar';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <TopNavBar />
      </header>
      <ProductClient product={product} />
      <Footer />
    </>
  );
}
