import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTelegramPlane,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen mt-14">
      {/* Header qismi */}
      <div className="bg-gradient-to-r from-blue-500/80 to-indigo-500/80 shadow-sm">
        <div className="max-w-7xl mx-auto py-8 sm:py-10 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white italic tracking-wide">
            Biz bilan bog'lanish
            <div className="h-0.5 w-16 sm:w-24 bg-white/80 mx-auto mt-3 sm:mt-4 rounded-full"></div>
          </h1>
        </div>
      </div>

      {/* Asosiy content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Chap panel - Aloqa ma'lumotlari */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Biz bilan bog'lanish
              </h2>
              <p className="text-sm text-gray-600 mb-8">
                O'z bilim va tajribangizni o'quvchilar bilan baham ko'rishni
                istaysizmi? Bizning platformamizda o'z faningizni yuritish uchun
                reseptionlarimiz bilan bog'laning
              </p>

              <div className="space-y-6">
                {/* Telefon */}
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Telefon raqam
                    </p>
                    <a
                      href="tel:+998997654321"
                      className="text-sm sm:text-base text-gray-800 hover:text-blue-600"
                    >
                      +998 99 765 43 21
                    </a>
                  </div>
                </div>

                {/* Reseption */}
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FaTelegramPlane className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Reseption bilan bog'lanish
                    </p>
                    <a
                      href="https://t.me/registon_admin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-gray-800 hover:text-blue-600"
                    >
                      @registon_admin
                    </a>
                  </div>
                </div>

                {/* Manzil */}
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Bizning manzil
                    </p>
                    <p className="text-sm sm:text-base text-gray-800">
                      Urganch shahri, Al-Xorazmiy ko'chasi, 15-uy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ish vaqti */}
            <div className="bg-white rounded-xl p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <h3 className="ml-3 sm:ml-4 text-base sm:text-lg font-semibold text-gray-800">
                  Ish vaqtlari
                </h3>
              </div>

              <div className="ml-11 sm:ml-14 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">
                    Dushanba - Juma
                  </span>
                  <span className="text-sm sm:text-base text-gray-800">
                    8:00 - 18:00
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">
                    Shanba
                  </span>
                  <span className="text-sm sm:text-base text-gray-800">
                    9:00 - 15:00
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">
                    Yakshanba
                  </span>
                  <span className="text-sm sm:text-base text-gray-800">
                    Yopiq
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* O'ng panel - Xarita */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Xarita */}
            <div className="bg-white rounded-xl p-2 h-[300px] sm:h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2986.7975041673584!2d60.629753!3d41.550987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDMzJzAzLjYiTiA2MMKwMzcnNDcuMSJF!5e0!3m2!1suz!2s!4v1625136425784!5m2!1suz!2s"
                className="w-full h-full rounded-lg"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Ijtimoiy tarmoqlar */}
            <div className="bg-white rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800">
                Bizni ijtimoiy tarmoqlarda kuzating
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <a
                  href="https://t.me/registonuz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 sm:p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <FaTelegramPlane className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-800">
                    Telegram
                  </span>
                </a>

                <a
                  href="https://instagram.com/registon.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 sm:p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors"
                >
                  <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
                  <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-800">
                    Instagram
                  </span>
                </a>

                <a
                  href="https://facebook.com/registon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 sm:p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
                >
                  <FaFacebookF className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                  <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-800">
                    Facebook
                  </span>
                </a>

                <a
                  href="https://youtube.com/registonuz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 sm:p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <FaYoutube className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-800">
                    YouTube
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
