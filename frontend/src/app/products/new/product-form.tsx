'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';

import { useForm } from 'react-hook-form';
import { createProduct } from '../products.api';
import { useRouter } from 'next/navigation';

function ProductForm() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await createProduct({
      ...data,
      price: parseFloat(data.price),
    });
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

        <CardFooter className='flex justify-between'>
          <Button variant='outline'>Cancel</Button>
          <Button>Create</Button>
        </CardFooter>
      </div>
    </form>
  );
}

export default ProductForm;
