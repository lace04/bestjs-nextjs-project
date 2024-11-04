import React from 'react';
import { getProductById } from '../products.api';
{
  getProductById;
}
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: {
    id: number;
  };
}

async function ProductDetailPage({ params }: Props) {
  const product = await getProductById(params.id);

  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className='w-full max-w-sm overflow-hidden'>
        <div className='relative'>
          <div className='flex justify-between items-center m-4'>
            Product Detail
            <Link className={buttonVariants()} href='/'>
              Go back
            </Link>
          </div>
          <img
            alt={product.name}
            className='w-full h-48 object-cover'
            height='200'
            src={product.image}
            style={{
              aspectRatio: '300/200',
              objectFit: 'contain',
            }}
            width='300'
          />
        </div>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex justify-between items-center'>
            <span className='text-2xl font-bold'>${product.price}</span>
            <div className='flex items-center'>
              <span className='text-yellow-400 mr-1'>★★★★☆</span>
              <span className='text-sm text-muted-foreground'>(4.2)</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full'>
            <ShoppingCart className='size-4' /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProductDetailPage;
