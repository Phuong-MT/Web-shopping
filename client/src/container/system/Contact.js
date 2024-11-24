import React, { useState } from 'react';
import {ContactCard, ContactForm} from '../../components'
import icons from '../../ultils/icons'

const {FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaHeadphones } = icons
const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 ">
      <div className='text-2xl font-bold mb-4 py-[20px] '>
          Hỗ trợ và chăm sóc khác hàng
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Phần thông tin liên hệ */}
        <div className="space-y-6">
          <ContactCard
            icon={<FaMapMarkerAlt className="text-xl text-gray-700" />}
            title="Địa chỉ"
            content="Tầng 14, Toà nhà Hapulico Complex, 85 Vũ Trọng Phụng, Quận Thanh Xuân, HN"
          />
          <ContactCard
            icon={<FaEnvelope className="text-xl text-gray-700" />}
            title="Email"
            content="saleadmin@abc.com.vn"
          />
          <ContactCard
            icon={<FaPhoneAlt className="text-xl text-gray-700" />}
            title="Mua hàng online"
            content="+84abcxyz"
          />
          <ContactCard
            icon={<FaHeadphones className="text-xl text-gray-700" />}
            title="Chăm sóc khách hàng"
            content="Email: cskh@luckystar.com.vn
             || - Hotline: +84abcxyzys
            || - Thứ Hai - Thứ Bảy: 8:00 - 17:30"
          />
        </div>

        {/* Phần form liên hệ */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
