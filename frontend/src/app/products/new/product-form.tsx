'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';

import { useForm } from 'react-hook-form';
import { createProduct, updateProduct } from '../products.api';
import { useParams, useRouter } from 'next/navigation';

function ProductForm({ product }: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      image: product?.image,
    },
  });
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const onSubmit = handleSubmit(async (data) => {
    if (params?.id) {
      await updateProduct(Number(params.id), {
        ...data,
        price: parseFloat(data.price),
      });
    } else {
      await createProduct({
        ...data,
        price: parseFloat(data.price),
      });
    }
    router.push('/');
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <div className='grid w-full items-center gap-4'>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Name</Label>
          <Input {...register('name')} placeholder='Name of product' />
        </div>

        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='description'>Description</Label>
          <Input {...register('description')} placeholder='Description' />
        </div>

        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='price'>Price</Label>
          <Input {...register('price')} placeholder='Price' />
        </div>

        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='image'>Image</Label>
          <Input {...register('image')} placeholder='Image URL' />
        </div>

        <CardFooter className='w-full p-0'>
          <div className='flex w-full space-x-2'>
            <Button variant='outline' className='flex-1'>
              Cancel
            </Button>
            <Button className='flex-1'>
              {params.id ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </CardFooter>
      </div>
    </form>
  );
}

export default ProductForm;
