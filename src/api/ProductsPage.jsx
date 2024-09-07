import React, { useState } from 'react';
import { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation, useUpdateProductMutation } from './apiSlice';

const ProductsPage = () => {
  const { data: products, isLoading } = useGetCarsQuery();
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [newProduct, setNewProduct] = useState('');
  const [productId, setProductId] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  if (isLoading) return <p>Loading...</p>;

  const handleAddProduct = async () => {
    await addProduct({ name: newProduct });
    setNewProduct('');
  };

  const handleUpdateProduct = async () => {
    await updateProduct({ id: productId, name: updatedName });
    setProductId(null);
    setUpdatedName('');
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
            <button onClick={() => {
              setProductId(product.id);
              setUpdatedName(product.name);
            }}>Update</button>
          </li>
        ))}
      </ul>
      <input value={newProduct} onChange={(e) => setNewProduct(e.target.value)} placeholder="New product" />
      <button onClick={handleAddProduct}>Add product</button>

      {productId && (
        <div>
          <input value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} placeholder="Updated name" />
          <button onClick={handleUpdateProduct}>Update</button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
