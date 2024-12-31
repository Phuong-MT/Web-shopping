import React,{useState} from 'react'
import { Sidebar , PaymentInfo, InfoUser, ListProduct, ListOrder} from '../../components'
const AdminManagement = () => {
    const [selectedOption, setSelectedOption] = useState(1);
    
    const menuOptions = [
        { id: 1, text: 'Danh sách order' },
        { id: 3, text: 'Danh sách sản phẩm' },
        { id: 4, text: 'Thông tin khách hàng' },
        { id: 5, text: 'Lịch sử thanh toán'}
    ];

    const renderContent = () => {
        switch (selectedOption) {
          case 1:
            return <ListOrder/>
          case 3:
            return <ListProduct/>
          case 4:
            return <InfoUser/>
          case 5:
            return <PaymentInfo/>
          default:
              return <p className="text-gray-500">Chức năng đang được phát triển...</p>;
        }
    };
  return (
    <div>
      <div className="flex h-screen bg-gray-50">
            <Sidebar options={menuOptions} onSelect={setSelectedOption} />
            <div className="w-full">{renderContent()}</div>
        </div>
    </div>
  )
}

export default AdminManagement
