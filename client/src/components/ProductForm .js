import React, { useState } from 'react';
import {apiPostCreateProduct} from '../service'
import {X } from 'lucide-react';
import Swal from 'sweetalert2'

const ProductForm = ({onClose}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productCategoryId: '',
    productimageUrl: '',
    productColorUrl: '',
    productInformation: '',
    productColor: '',
    productVersion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiPostCreateProduct(formData);
      if (response?.data?.err === '0') {
        setFormData({
          productName: '',
          productDescription: '',
          productPrice: '',
          productCategoryId: '',
          productimageUrl: '',
          productColorUrl: '',
          productInformation: '',
          productColor: '',
          productVersion: ''
        });
       Swal.fire({
                icon: 'success',
                title: 'OK!',
                text: `Thêm sản phẩm thành công` ,
            })
      } else {
        setError(response?.data?.msg);
      }
    } catch (err) {
      setError(err.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="flex justify-between text-2xl font-bold mb-6">Create New Product
        <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-800"
            >
            <X size={24} />
            </button>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Category ID</label>
            <input
              type="text"
              name="productCategoryId"
              value={formData.productCategoryId}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="text"
              name="productimageUrl"
              value={formData.productimageUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Color URL</label>
            <input
              type="text"
              name="productColorUrl"
              value={formData.productColorUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Product Information</label>
          <textarea
            name="productInformation"
            value={formData.productInformation}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Color</label>
            <input
              type="text"
              name="productColor"
              value={formData.productColor}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Version</label>
            <input
              type="text"
              name="productVersion"
              value={formData.productVersion}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default ProductForm;