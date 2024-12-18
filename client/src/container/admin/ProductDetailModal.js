import React from 'react'
import {X } from 'lucide-react';
const ProductDetailModal = ({product, onClose}) => {
  return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">Chi Tiết Sản Phẩm</h2>
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Hình ảnh */}
              <div>
                <img 
                  src={product.images.imageUrl} 
                  alt={product.name} 
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              
              {/* Thông tin chi tiết */}
              <div>
                <h3 className="text-xl font-bold mb-4">{product.name}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Mã Sản Phẩm:</span>
                    <span>{product.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Danh Mục:</span>
                    <span>{product.category.header}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Giá:</span>
                    <span className="text-green-600 font-bold">{product.price} VNĐ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Màu Sắc:</span>
                    <div className="flex items-center">
                        <img 
                        src={product.images.color} 
                        alt={product.name} 
                        className="w-4 h-4 object-cover rounded" />
                        {product.info.color}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Trạng Thái:</span>
                    <span className={`
                      px-2 py-1 rounded text-xs
                      ${'Còn hànghàng' === 'Còn hàng' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    `}>
                      Còn Hàng
                    </span>
                  </div>
                </div>
    
                <div className="mt-6 flex space-x-4">
                  <button 
                    className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    onClick={() => {/* Chỉnh sửa */}}
                  >
                    Chỉnh Sửa
                  </button>
                  <button 
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    onClick={() => {/* Xóa */}}
                  >
                    Xóa Sản Phẩm
                  </button>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetailModal
