import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import AccountInfo from '../../components/AccountInfo';


const AccountManagement = () => {
    const [selectedOption, setSelectedOption] = useState(1);
    
    const menuOptions = [
        { id: 1, text: 'Thông tin tài khoản' },
        { id: 2, text: 'Sổ địa chỉ' },
        { id: 3, text: 'Sản phẩm đã xem' },
        { id: 4, text: 'Sản phẩm yêu thích' },
    ];

    const renderContent = () => {
        switch (selectedOption) {
            case 1:
                return <AccountInfo />;
            default:
                return <p className="text-gray-500">Chức năng đang được phát triển...</p>;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar options={menuOptions} onSelect={setSelectedOption} />
            <div className="flex-1 p-6">{renderContent()}</div>
        </div>
    );
};

export default AccountManagement;
