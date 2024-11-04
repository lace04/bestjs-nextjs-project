import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProductForm from './product-form';
import { getProductById } from '../products.api';

interface Props {
  params: {
    id: number;
  };
}

async function ProductsNewPage({ params }: Props) {
  const product = await getProductById(params.id);

  return (
    <div className='flex items-center justify-center h-screen'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>{params.id ? 'Edit Product' : 'Create Product'}</CardTitle>
          <CardDescription>
            {params.id ? 'Edit the product details' : 'Fill in the product details'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm product={product} />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductsNewPage;
