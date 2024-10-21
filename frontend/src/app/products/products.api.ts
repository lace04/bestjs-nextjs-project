export async function createProduct(productData: any) {
  const res = await fetch('http://localhost:4000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  const data = await res.json();
  console.log(data);
}

export async function getProducts() {
  const data = await fetch('http://localhost:4000/api/products',{
    cache: 'no-store',
  });
  return await data.json();
}
