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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { deleteProduct } from '@/app/products/products.api';
import { useRouter } from 'next/navigation';

export function ProductCard({ product }: any) {
  const router = useRouter();

  async function handleRemoveProduct(id: number) {
    await deleteProduct(id);
    router.refresh();
  }
  return (
    <Card
      className='w-full max-w-sm overflow-hidden'
      onClick={() => router.push(`/products/${product.id}`)}
    >
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
        <Button
          className='w-full'
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/products/${product.id}/edit`);
          }}
        >
          <ShoppingCart className='size-4' /> Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className='ml-5' variant='outline'>
              <Trash2 className='size-4' />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente
                el producto de tu lista.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleRemoveProduct(product.id)}
              >
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
