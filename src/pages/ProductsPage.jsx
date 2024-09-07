import React, { useState } from "react";
import Modal from "react-modal";
import {  useAddProductMutation,  useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from "../api/apiSlice";

const ProductPage = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [newProduct, setNewProduct] = useState("");
  const [productId, setProductId] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  const handleAddProduct = async () => {
    await addProduct({ name: newProduct });
    setNewProduct("");
  };

  const openModal = (product) => {
    setProductId(product);
    setUpdatedName(product.name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProduct = async () => {
    if (productId) {
      await updateProduct({ id: productId.id, name: updatedName });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-[#E3E9FF] h-[100vh] text-center pt-[30px]">
      <h1 className="text-white mb-[10px] text-[20px] bg-[#AF7EEB] w-[500px] py-[10px] mx-auto font-mono">
        products Todo
      </h1>
      <form className="flex flex-col border-b-[4px] justify-center mx-auto w-[500px]">
        <input
          className="outline-none w-[100%] py-[10px] border-[red] text-[20px] pl-[10px] font-mono bg-[white] font-semibold text-[green] placeholder-gray-700"
          placeholder="Enter products"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button className="hidden" onClick={handleAddProduct}>
          products qo'shish
        </button>
      </form>
      <ul className="w-[500px] mx-auto bg-[white] py-[40px]">
        {products.map((item, index) => (
          <li
            key={item.id}
            className="flex justify-between items-center px-[20px] py-[5px]"
          >
            <span className="font-medium text-[18px] font-mono">
              {index + 1}.{item.name}
            </span>
            <div className="space-x-3">
              <button
                className="bg-[red] font-medium px-[10px] py-[5px] rounded-md text-white font-mono"
                onClick={() => deleteProduct(item.id)}
              >
                Delete
              </button>
              <button
                className="bg-[green] font-medium px-[10px] py-[5px] rounded-md text-white font-mono"
                onClick={() => openModal(item)}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        className={
          "w-[600px] h-[230px] rounded-[20px] mt-[40px] pt-[40px] text-center font-mono bg-slate-600 mx-auto"
        }
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        <h2 className="text-[20px] mb-[4px] text-white">Update products</h2>
        <form>
          <input
            className="py-[6px] text-[17px] pl-[4px]"
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </form>
        <div className="mt-[30px] space-x-3">
          <button
            className="text-[20px] bg-[green] rounded-md text-white px-[10px] py-[5px]"
            onClick={handleUpdateProduct}
          >
            Save
          </button>
          <button
            className="text-[20px] bg-[red] rounded-md text-white px-[10px] py-[5px]"
            onClick={closeModal}
          >
            Cancellation
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductPage;
