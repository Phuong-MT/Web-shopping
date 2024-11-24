import React, { useState } from 'react'
import { apigetContact } from '../service'
import { InputFormV2 , InputText} from './index'
import Swal from 'sweetalert2'
const ContactForm = () => {
  const [formData, setFormData] = useState({
    Subject:'',
    Message:''
  })
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
        ...prevData,
        [field]: value,
    }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apigetContact(formData)
      if (response?.data?.err === 0) {
          // Thông báo thành công
          Swal.fire({
              icon: 'success',
              title: 'Cập nhật thành công',
              text: 'Thông tin tài khoản đã được cập nhật.',
          })
      } else {
          // Thông báo lỗi 
          Swal.fire({
              icon: 'error',
              title: 'Cập nhật thất bại',
              text: response.msg || 'Không thể cập nhật thông tin. Vui lòng thử lại!',
          })
      }
      setFormData({
        Message: '',
        Subject: '',
      })

  } catch (error) {
      // Thông báo lỗi hệ thống
      Swal.fire({
          icon: 'error',
          title: 'Lỗi hệ thống',
          text: error.message || 'Đã xảy ra lỗi không xác định. Vui lòng thử lại sau!',
      })
  }
  }

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md w-full"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Email to Lucky Start</h2>
      <p className="text-gray-600 mb-6">
        We are here to help and answer any question you might have. Tell us about your issue so we can help you more quickly. We look forward to hearing from you.
      </p>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Chủ đề</label>
        <InputFormV2
          type="text"
          value={formData.Subject}
          onChange={(value) => handleChange('Subject',value)}
          placeholder="Chủ đề"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nội dung</label>
        <InputText
          value={formData.Message}
          onChange={(value) => handleChange('Message',value)}
          rows= "5"
          placeholder="Nội dung"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800"
      >
        Gửi
      </button>
    </form>
  )
}

export default ContactForm;
