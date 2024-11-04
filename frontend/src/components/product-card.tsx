'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ProductCard({ product }: any) {
  function handleRemoveProduct(id: number) {
    console.log('Removing product with id:', id);
  }
  return (
    <Card className='w-full max-w-sm overflow-hidden'>
      <div className='relative'>
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
        <Badge className='absolute top-2 right-2' variant='secondary'>
          New
        </Badge>
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
        <Button
          className='ml-5'
          variant='outline'
          onClick={() => handleRemoveProduct(product.id)}
        >
          <Trash2 className='size-4' />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
