import React from "react";
import { useLocation, useParams } from "react-router-dom";
const DetailSearch = () => {
  const location = useLocation(); // Lấy thông tin URL
  const searchParams = new URLSearchParams(location.search); // Lấy query string từ URL
  console.log(searchParams)
  // Chuyển query string thành object
  const query = {
    category: searchParams.get("category") || "",
    price: searchParams.get("price") || "",
    size: searchParams.get("size") || "",
    color: searchParams.get("color") || "",
    upgrade: searchParams.get("upgrade") || "",
  };
  console.log(query)
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Kết quả tìm kiếm</h1>
      <ul className="space-y-2">
        a
      </ul>
    </div>
  );
};

export default DetailSearch;
