import React from 'react';
import Link from 'next/link';
import { getProducts } from './products/products.api';
import { buttonVariants } from '@/components/ui/button';
import ProductCard from '@/components/product-card';

export const dynamic = 'force-dynamic';

async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <div className='flex justify-between'>
        <h1 className='text-4xl font-bold text-center '>NextNestApp</h1>
        <Link href='/products/new' className={buttonVariants()}>
          Create Product
        </Link>
      </div>
      <div
        className='grid
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        grid-cols-4 gap-4 mt-20'
      >
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
