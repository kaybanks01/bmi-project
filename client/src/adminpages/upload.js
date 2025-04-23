import React, { useState } from "react";
import "./upload.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/util";

const Upload = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    price: "",
    discountPrice: "",
    stock: "",
    category: "",
    image: null,
    fileData: null,
  });

  const [errors, setErrors] = useState({});

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(file),
        fileData: file,
      }));
    }
  };
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.productName)
      newErrors.productName = "Product Name is required";
    if (!formData.productDescription)
      newErrors.productDescription = "Product Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.discountPrice)
      newErrors.discountPrice = "Discount Price is required";
    if (!formData.stock) newErrors.stock = "Stock is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isError = validate();
    if (!isError) {
      return;
    }

    const formDataobject = new FormData();
    formDataobject.append("file", formData.fileData);
    formDataobject.append("productName", formData.productName);
    formDataobject.append("productDescription", formData.productDescription);
    formDataobject.append("price", formData.price);
    formDataobject.append("discountPrice", formData.discountPrice);
    formDataobject.append("stock", formData.stock);
    formDataobject.append("category", formData.category);
    formDataobject.append("image", formData.image);

    const response = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      // headers: {
      //   "Content-Type": 'multipart/form-data',
      // },
      body: formDataobject,
    });
    if (response.ok) {
      navigate("/admin/products");
    }
  };
  return (
    <div className="upload-page">
      <div className="upload-content">
        <h1 className="header">Welcome back, Admin</h1>
        <div className="card">
          <form className="form-input" onSubmit={handleSubmit}>
            <div className="form-layout">
              <div className="upload-box">
                {formData.image ? (
                  <img src={formData.image} alt="Uploaded" />
                ) : (
                  <label className="cursor-pointer">
                    <input type="file" onChange={handleImageChange} />
                    <p>Upload product image</p>
                    <span>
                      <CloudUploadIcon 
                      />
                    </span>
                  </label>
                )}
                {errors.image && <span className="error">{errors.image}</span>}
              </div>
  
              <div className="input-group">
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="input-field"
                />
                {errors.productName && (
                  <span className="error">{errors.productName}</span>
                )}
  
                <textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  placeholder="Product Description"
                  className="input-field"
                ></textarea>
                {errors.productDescription && (
                  <span className="error">{errors.productDescription}</span>
                )}
  
                <div className="row">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="input-field"
                  />
                  <input
                    type="number"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    placeholder="Discount Price"
                    className="input-field"
                  />
                </div>
                {errors.price && <span className="error">{errors.price}</span>}
                {errors.discountPrice && (
                  <span className="error">{errors.discountPrice}</span>
                )}
  
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  className="input-field"
                />
                {errors.stock && <span className="error">{errors.stock}</span>}
  
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select-field"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Footwear">Footwear</option>
                  <option value="stockings">stockings</option>
                  <option value="device">devices</option>
                </select>
                {errors.category && (
                  <span className="error">{errors.category}</span>
                )}
  
                <button type="submit" className="submit-btn">
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
