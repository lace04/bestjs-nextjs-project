import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import ProductForm from './product-form';

function ProductsNewPage() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
          <CardDescription>
            Fill in the form below to create a new product
          </CardDescription>
        </CardHeader>
        <CardContent>
          < ProductForm />          
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductsNewPage;
