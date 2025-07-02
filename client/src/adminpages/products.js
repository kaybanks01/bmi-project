import React, { useState, useEffect } from 'react';
import EditProductModal from './EditProductModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import './product.css';
import { BASE_URL } from '../util/util';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`, {
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${productId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.success) {
        setProducts(products.filter((product) => product._id !== productId));
        setShowDeleteModal(false);
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product); 
  };

  const handleSaveEdit = async (updatedProduct) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${updatedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const result = await response.json();
      if (result.success) {
        setProducts(products.map((prod) => (prod._id === updatedProduct._id ? updatedProduct : prod)));
        setEditingProduct(null); 
        alert("Product updated successfully!");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };

  return (
    <div className="products-container">
      <h1>Products</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <img
                src={`${BASE_URL}/file/${product.image}`}
                alt={product.productName}
              />
              <h3>{product.productName}</h3>
              <p>${product.price}</p>
              <div className="product-actions">
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => { setProductToDelete(product); setShowDeleteModal(true); }}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)} 
          onSave={handleSaveEdit} 
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          product={productToDelete}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Products;
