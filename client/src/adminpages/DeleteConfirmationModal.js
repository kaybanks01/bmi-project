import React from 'react'
import './deleteconfirmation.css'
import { BASE_URL } from '../util/util';

const DeleteConfirmationModal = ({ product, onClose, onDelete }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to delete this product?</h3>
        <div className="modal-product-info">
          <img
            src={`${BASE_URL}/file/${product.image}`}
            alt={product.productName}
            className="modal-product-image"
          />
          <h4>{product.productName}</h4>
          <p>Price: ${product.price}</p>
        </div>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-btn" onClick={() => onDelete(product._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
