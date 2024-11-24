import React, { useState, useEffect } from 'react';
import { InputFormV2 } from './index';
import { useSelector } from 'react-redux';
import { apiUpdateUser } from '../service';
import Swal from 'sweetalert2'
const AccountInfoForm = () => {
    const {currentData} = useSelector(state => state.user)
    const [formData, setFormData] = useState({
        name: currentData?.name || '',
        email: currentData?.email ||'',
        address: currentData?.address || '',
        gender: currentData?.gender || '',
        dateOfBirth:currentData?.dateOfBirth || '',
    });
    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiUpdateUser(formData);
            
            if (response?.data?.err === 0) {
                // Thông báo thành công
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật thành công',
                    text: 'Thông tin tài khoản đã được cập nhật.',
                });
            } else {
                // Thông báo lỗi nghiệp vụ
                Swal.fire({
                    icon: 'error',
                    title: 'Cập nhật thất bại',
                    text: response.msg || 'Không thể cập nhật thông tin. Vui lòng thử lại!',
                });
            }
        } catch (error) {
            // Thông báo lỗi hệ thống
            Swal.fire({
                icon: 'error',
                title: 'Lỗi hệ thống',
                text: error.message || 'Đã xảy ra lỗi không xác định. Vui lòng thử lại sau!',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Cập nhật thông tin tài khoản</h2>
            
            <InputFormV2
                label="Họ tên"
                value={formData.name}
                onChange={(value) => handleChange('name', value)}
            />
            
            <InputFormV2
                label="Email"
                value={formData.email}
                onChange={(value) => handleChange('email', value)}
                type="email"
            />

            <InputFormV2
                label="Địa chỉ"
                value={formData.address}
                onChange={(value) => handleChange('address', value)}
                type="tel"
            />

            <InputFormV2
                label="Giới tính"
                value={formData.gender}
                onChange={(value) => handleChange('gender', value)}
            />

            <InputFormV2
                label="Ngày sinh"
                value={formData.dateOfBirth}
                onChange={(value) => handleChange('dateOfBirth', value)}
                type="date"
            />
            <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700"
            >
                Cập nhật thông tin
            </button>
        </form>
    );
};

export default AccountInfoForm;