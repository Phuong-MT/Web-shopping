import React, { useState } from 'react';

function TabComponent() {
  // Tạo state để theo dõi tab nào đang được chọn
  const [activeTab, setActiveTab] = useState('tabA');

  // Hàm thay đổi tab khi người dùng click vào tab khác
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4">
        <button
          className={`p-2 ${activeTab === 'tabA' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleTabClick('tabA')}
        >
          Tab A
        </button>
        <button
          className={`p-2 ${activeTab === 'tabB' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleTabClick('tabB')}
        >
          Tab B
        </button>
        <button
          className={`p-2 ${activeTab === 'tabC' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => handleTabClick('tabC')}
        >
          Tab C
        </button>
      </div>

      {/* Nội dung các tab */}
      <div className="mt-4">
        {activeTab === 'tabA' && (
          <div>
            <h2>Nội dung của Tab A</h2>
            <p>Đây là nội dung của Tab A.</p>
          </div>
        )}
        {activeTab === 'tabB' && (
          <div>
            <h2>Nội dung của Tab B</h2>
            <p>Đây là nội dung của Tab B.</p>
          </div>
        )}
        {activeTab === 'tabC' && (
          <div>
            <h2>Nội dung của Tab C</h2>
            <p>Đây là nội dung của Tab C.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabComponent;