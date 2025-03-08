import React, { useState, useMemo ,useEffect} from 'react';
import { Trash2, Edit, Eye, Search, Filter } from 'lucide-react';
import { apiAdminGetproduct, apiDeleteProduct } from '../service';
import { ProductDetailModal } from '../container/admin';
import {ProductForm, ProductUpdate} from '../components/index'
import Swal from 'sweetalert2'

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selecteCreate, setSelecteCreate] = useState(null)
  const [edit,setedit] = useState(null)
    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await apiAdminGetproduct();
            if(response?.data?.response){
              setProducts(response.data.response);
            }
        } catch (err) {
          setError('Không thể tải dữ liệu thanh toán.');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);

  // Lọc và tìm kiếm sản phẩm
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.id.toString().includes(searchTerm);
      
      const matchesCategory = filterCategory 
        ? product.category.header === filterCategory 
        : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, filterCategory]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(filteredProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleDelete = async() => {
    const remainingProducts = products.filter(
      product => !selectedProducts.includes(product.id)
    );
    const productsDelete =  products.filter(
      product => selectedProducts.includes(product.id)
    );
    try {
      const response = await apiDeleteProduct(productsDelete)
      if(response?.data?.err === '0'){
        Swal.fire({
          icon: 'success',
          title: 'OK!',
          text: `Xóa sản phẩm thành công` ,
      })
        setProducts(remainingProducts);
        setSelectedProducts([]);
      }
      
    } catch (error) {
      setError('Không thể xóa sản phẩm.' + error);
    }
    
  };
  const handldeleteOne = async(id) =>{
    try {
      const response  = await apiDeleteProduct(id)
      if(response?.data?.err === '0'){
          Swal.fire({
              icon: 'success',
              title: 'OK!',
              text: `Xóa sản phẩm thành công` ,
          })
          setProducts(products.filter(p => p.id !== id.id))
      }
    } catch (error) {
      setError('Không thể xóa sản phẩm.' + error);
    }
  }
  const handleCreateProduct = () =>{
    setSelecteCreate(true)
  }
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
    };
  // Lấy các danh mục duy nhất
  const uniqueCategories = [...new Set(products.map(p => p.category.header))];
  if (isLoading) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Thanh tìm kiếm và lọc */}
      <div className="mb-4 flex space-x-4">
        {/* Ô tìm kiếm */}
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm (Tên hoặc ID)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={20} 
          />
        </div>

        {/* Bộ lọc danh mục */}
        <div className="relative">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả danh mục</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Filter 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={20} 
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-gray-600 mr-2">
            Tổng: {filteredProducts.length} sản phẩm
          </span>
          {selectedProducts.length > 0 && (
            <span className="text-blue-600">
              Đã chọn: {selectedProducts.length} sản phẩm
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          <button 
            onClick={() => {handleCreateProduct()}} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Thêm Sản Phẩm
          </button>
          {selectedProducts.length > 0 && (
            <button 
              onClick={handleDelete} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Xóa {selectedProducts.length} sản phẩm
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left">
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll}
                  checked={filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length}
                  className="form-checkbox"
                />
              </th>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Hình Ảnh</th>
              <th className="p-3 text-left">Tên Sản Phẩm</th>
              <th className="p-3 text-left">Danh Mục</th>
              <th className="p-3 text-left">Giá</th>
              <th className="p-3 text-left">Màu Sắc</th>
              <th className="p-3 text-left">Trạng Thái</th>
              <th className="p-3 text-center">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr 
                key={product.id} 
                className={`border-b hover:bg-gray-50 ${
                  selectedProducts.includes(product.id) ? 'bg-blue-50' : ''
                }`}
              >
                <td className="p-3">
                  <input 
                    type="checkbox" 
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                    className="form-checkbox"
                  />
                </td>
                <td className="p-3">{product.id}</td>
                <td className="p-3">
                  <img 
                    src={product.images.imageUrl} 
                    alt={product.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-semibold">{product.name}</td>
                <td className="p-3">{product.category.header}</td>
                <td className="p-3 text-green-600">{formatCurrency(product.price)}</td>
                <td className="p-3">
                  <div className="flex items-center">
                    <span 
                      className="w-4 h-4 rounded-full mr-2" 
                    />
                    <img 
                    src={product.images.color} 
                    alt={product.name} 
                    className="w-4 h-4 object-cover rounded" />
                    {product.info.color}
                  </div>
                </td>
                <td className="p-3">
                  <span className={`
                    px-2 py-1 rounded text-xs
                    ${'Còn hàng'=== 'Còn hàng' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  `}>
                    Còn hàng
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex justify-center space-x-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700"
                      title="Xem chi tiết"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Eye size={20} />
                    </button>
                    <button 
                      className="text-yellow-500 hover:text-yellow-700"
                      title="Chỉnh sửa"
                      onClick={() => setedit(product)}
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      title="Xóa"
                      onClick={() => {
                        handldeleteOne(products.filter(p=> p.id === product.id))
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Thông báo khi không có sản phẩm */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            Không tìm thấy sản phẩm nào phù hợp
          </div>
        )}
      </div>
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {selecteCreate && (
        <ProductForm
           onClose={() => setSelecteCreate(null)}
        />
      )}
      {edit && (
        <ProductUpdate
           onClose={() => setedit(null)}
           productData = {edit}
        />
      )}
    </div>
  );
};

export default ListProduct;